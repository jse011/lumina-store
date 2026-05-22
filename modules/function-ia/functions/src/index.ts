import { onCall, onRequest, HttpsError } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

// Initialize Firebase Admin SDK
initializeApp();
const db = getDatabase();

/**
 * Helper to update a hologram record in the database using admin privileges
 */
async function updateHologramStatus(env: string, userId: string, hologramId: string, updates: any) {
    const ref = db.ref(`${env}/users/${userId}/holograms/${hologramId}`);
    await ref.update(updates);
}

/**
 * Helper to poll Runway task status and trigger webhook when completed
 */
async function pollRunwayTask(env: string, userId: string, hologramId: string, taskId: string, isMock: boolean) {
    const maxAttempts = 30; // 30 attempts * 5 seconds = 150 seconds (2.5 minutes)
    const intervalMs = 5000;

    // Note: in local emulator, the functions emulator runs on http://127.0.0.1:5001/<project-id>/us-central1/runwayWebhook
    // So we can hit our own webhook handler function directly instead of making an HTTP call, to avoid networking issues!
    if (isMock) {
        console.log(`[Poller] Running in Mock Mode for task ${taskId}. Waiting 30s...`);
        await new Promise((resolve) => setTimeout(resolve, 30000));
        try {
            await updateHologramStatus(env, userId, hologramId, {
                status: "ready",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-hologram-effect-40019-large.mp4"
            });
            console.log(`[Poller] Mock task ${taskId} completed and database updated.`);
        } catch (err) {
            console.error(`[Poller] Error updating database for mock task ${taskId}:`, err);
        }
        return;
    }

    const secretSnapshot = await db.ref('config/runwaySecret').once('value');
    const runwaySecret = secretSnapshot.val() || "";

    console.log(`[Poller] Starting polling for real Runway task ${taskId}...`);
    let taskCompleted = false;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        await new Promise((resolve) => setTimeout(resolve, intervalMs));

        try {
            const response = await fetch(`https://api.dev.runwayml.com/v1/tasks/${taskId}`, {
                headers: {
                    "Authorization": `Bearer ${runwaySecret}`,
                    "X-Runway-Version": "2024-11-06"
                }
            });

            if (!response.ok) {
                console.error(`[Poller] Failed to poll Runway task ${taskId} (Attempt ${attempt}): status ${response.status}`);
                continue;
            }

            const task = await response.json();
            console.log(`[Poller] Task ${taskId} status (Attempt ${attempt}): ${task.status}`);

            if (task.status === "SUCCEEDED" || task.status === "SUCCESS") {
                const videoUrl = task.output?.[0] || task.artifacts?.[0]?.url || task.videoUrl || "";
                await updateHologramStatus(env, userId, hologramId, {
                    status: "ready",
                    videoUrl: videoUrl
                });
                console.log(`[Poller] Real task ${taskId} succeeded. Updated database with videoUrl.`);
                taskCompleted = true;
                break;
            } else if (task.status === "FAILED" || task.status === "ERROR" || task.status === "CANCELLED") {
                await updateHologramStatus(env, userId, hologramId, {
                    status: "error"
                });
                taskCompleted = true;
                console.log(`[Poller] Real task ${taskId} failed or cancelled. Updated status in database.`);
                break;
            }
        } catch (error) {
            console.error(`[Poller] Error during Runway polling attempt ${attempt} for task ${taskId}:`, error);
        }
    }

    if (!taskCompleted) {
        await updateHologramStatus(env, userId, hologramId, {
            status: "stopped",
            error: "Error de tiempo de espera de espera de ejecución del servicio de IA"
        });
        console.log(`[Poller] Real task ${taskId} failed or cancelled. Updated status in database.`);
    }


}

/**
 * Callable Function: Initiates a video generation task on Runway
 */
export const generateRunwayTask = onCall(async (request) => {
    // 1. Verify authentication
    if (!request.auth) {
        throw new HttpsError("unauthenticated", "Debe estar autenticado para generar un holograma.");
    }

    const { userId, hologramId, name, thumbnailUrl, musicName, duration, creditsUsed, type, actions, env: requestEnv } = request.data;

    // 2. Security validation: Ensure user matches authenticated UID
    if (userId !== request.auth.uid) {
        throw new HttpsError("permission-denied", "No tienes permisos para crear un holograma para este usuario.");
    }

    const env = requestEnv || "prueba";
    const secretSnapshot = await db.ref('config/runwaySecret').once('value');
    const runwaySecret = secretSnapshot.val() || "";


    const hologramRef = db.ref(`${env}/users/${userId}/holograms/${hologramId}`);
    await hologramRef.update({
        name: name,
        thumbnailUrl: thumbnailUrl,
        musicName: musicName,
        duration: "10 seg",
        creditsUsed: 1,
        type: type,
        actions: actions,
        status: "pending",
        updateAt: Date.now()
    });

    // Determine if we should run in mock mode
    const isMock = !runwaySecret ||
        runwaySecret === "your_runway_api_secret_here" ||
        runwaySecret.includes("secret") ||
        runwaySecret.includes("placeholder");

    let taskId = `mock-runway-task-${Date.now()}`;

    if (!isMock) {
        try {
            console.log(`[generateRunwayTask] Submitting task to Runway API for user ${userId}...`);

            // Determine function region / project URL dynamically for the callback.
            // Since the app is a static export on GitHub Pages, the webhook must hit the Firebase Cloud Function directly.
            const projectId = process.env.GCLOUD_PROJECT || "lumina-store-8409e197";
            const region = process.env.FUNCTION_REGION || "us-central1";
            const callbackUrl = `https://${region}-${projectId}.cloudfunctions.net/runwayWebhook?userId=${userId}&hologramId=${hologramId}&env=${env}`;
            console.log(`[generateRunwayTask] Submitting task to Runway API for url ${callbackUrl}`);

            const response = await fetch("https://api.dev.runwayml.com/v1/image_to_video", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${runwaySecret}`,
                    "X-Runway-Version": "2024-11-06",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "gen3a_turbo",
                    promptImage: thumbnailUrl,
                    promptText: "Hola! Este es un video con un saludo de una persona. Este video se replicara en bucle. este video tendra el fondo negro.",
                    ratio: "1280:768",
                    duration: 5// pass the callbackUrl parameter
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`[generateRunwayTask] Runway API returned error status ${response.status}:`, errorText);
                throw new HttpsError("internal", `Error de Runway API: ${response.status}`);
            }

            const taskResult = await response.json();
            taskId = taskResult.id || taskResult.taskId || taskId;
            console.log(`[generateRunwayTask] Runway task successfully created. taskResult: ${JSON.stringify(taskResult)}`);

            console.log(`[generateRunwayTask] Runway task successfully created. ID: ${taskId}`);
        } catch (error: any) {
            console.error("[generateRunwayTask] Error calling Runway API:", error);
            if (error instanceof HttpsError) throw error;
            throw new HttpsError("internal", "No se pudo iniciar la generación en Runway.");
        }
    } else {
        console.log(`[generateRunwayTask] Using MOCK mode for user ${userId}. Generated task ID: ${taskId}`);
    }

    // 3. Save hologram record to Realtime Database with 'processing' status
    try {
        const hologramRef = db.ref(`${env}/users/${userId}/holograms/${hologramId}`);
        await hologramRef.update({
            runwayTaskId: taskId,
            status: "processing",
            updateAt: Date.now()
        });
        console.log(`[generateRunwayTask] Hologram record saved in database with ID: ${hologramId}`);
    } catch (dbError) {
        console.error("[generateRunwayTask] Error saving hologram to database:", dbError);
        throw new HttpsError("internal", "Error al guardar el registro en la base de datos.");
    }

    // 4. Spawn background polling/monitoring (non-blocking)
    // This handles local development and acts as a fallback for production
    pollRunwayTask(env, userId, hologramId, taskId, isMock).catch((err) => {
        console.error(`[generateRunwayTask] Error in background poller for task ${taskId}:`, err);
    });

    return {
        success: true,
        taskId: taskId,
        status: "processing"
    };
});

/**
 * HTTPS Function (Webhook): Receives completion notification from Runway
 */
/*export const runwayWebhook = onRequest(async (req, res) => {
    console.log("[runwayWebhook] Webhook received from Runway.");

    if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
    }

    const userId = req.query.userId as string;
    const hologramId = req.query.hologramId as string;
    const env = (req.query.env as string) || "prueba";

    if (!userId || !hologramId) {
        console.error("[runwayWebhook] Missing userId or hologramId in query parameters.");
        res.status(400).send("Missing parameters");
        return;
    }

    try {
        const body = req.body;
        console.log(`[runwayWebhook] Processing webhook for user ${userId}, hologram ${hologramId}:`, JSON.stringify(body));

        const status = body.status;
        const taskError = body.error;

        if (status === "SUCCEEDED" || status === "SUCCESS") {
            const videoUrl = body.artifacts?.[0]?.url || body.videoUrl || "";
            await updateHologramStatus(env, userId, hologramId, {
                status: "ready",
                videoUrl: videoUrl
            });
            console.log(`[runwayWebhook] Task succeeded. Hologram updated to ready.`);
        } else if (status === "FAILED" || status === "ERROR") {
            console.error(`[runwayWebhook] Task failed: ${taskError}`);
            await updateHologramStatus(env, userId, hologramId, {
                status: "error"
            });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("[runwayWebhook] Error processing webhook:", error);
        res.status(500).send("Internal Server Error");
    }
});*/


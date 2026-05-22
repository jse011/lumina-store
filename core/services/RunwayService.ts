import { httpsCallable } from 'firebase/functions';
import { functions } from '../lib/firebase';

export interface RunwayTaskPayload {
    userId: string;
    hologramId: string;
    name: string;
    thumbnailUrl: string;
    musicName?: string;
    duration?: number;
    creditsUsed?: number;
    type?: string;
    actions?: string[];
    env?: string;
}

export interface RunwayTaskResponse {
    success: boolean;
    taskId: string;
    status: string;
}

export class RunwayService {
    /**
     * Llama a la Cloud Function para generar el video con RunwayML.
     * Esta función configura la tarea y el webhook internamente.
     */
    static async generateHologram(payload: RunwayTaskPayload): Promise<RunwayTaskResponse> {
        try {
            // Se obtiene la referencia a la función mediante su nombre
            const generateRunwayTask = httpsCallable<RunwayTaskPayload, RunwayTaskResponse>(
                functions, 
                'generateRunwayTask'
            );
            
            // Se ejecuta la función enviando los datos necesarios
            const result = await generateRunwayTask(payload);
            return result.data;
        } catch (error) {
            console.error("Error al llamar a la función generateRunwayTask:", error);
            throw error;
        }
    }
}

"use client";

import { useState } from "react";
import { CreatorState, INITIAL_CREATOR_STATE, CreationStep } from "../types/CreatorState";
import { useAuth } from "@/core/providers/AuthContext";
import { FirebaseHologramRepository } from "../data/firebase/FirebaseHologramRepository";

import { storage, functions } from "@/core/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { httpsCallable } from "firebase/functions";

const repository = new FirebaseHologramRepository();

interface Props {
    onClose: () => void;
}

export function useHologramCreator({ onClose }: Props) {
    const { user } = useAuth();
    const [state, setState] = useState<CreatorState>(INITIAL_CREATOR_STATE);


    const nextStep = (next: CreationStep) => {
        setState(prev => ({ ...prev, step: next }));
    };

    const updateState = (updates: Partial<CreatorState>) => {
        setState(prev => ({ ...prev, ...updates }));
    };

    const generateHologram = async () => {
        if (!user || !state.type) return;

        updateState({ step: 'generating' });

        try {
            const hologramId = repository.generateHologramId(user.uid);
            const env = process.env.NODE_ENV === 'production' ? 'produccion' : 'prueba';

            // 1. Subir imágenes a Storage si existen
            let finalPreparedUrl = state.preparedImage || "";

            if (state.preparedBlob) {
                // Subir preparado (este es el que se usa como thumbnail)
                const preparedRef = ref(storage, `${env}/${user.uid}/${hologramId}/prepared.png`);
                await uploadBytes(preparedRef, state.preparedBlob);
                finalPreparedUrl = await getDownloadURL(preparedRef);
            }

            // 2. Generar nombre automático estratégico
            const now = new Date();
            const dateStr = now.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
            const typeStr = state.type === 'persona' ? 'Humano' : 'Mascota';
            const actionStr = state.actions.length > 0
                ? ` ${state.actions[0].charAt(0).toUpperCase() + state.actions[0].slice(1)}`
                : '';

            const autoName = `${typeStr}${actionStr} (${dateStr})`;

            // 3. Invocar la Cloud Function para llamar a Runway y guardar en DB
            const generateRunwayTask = httpsCallable(functions, 'generateRunwayTask');
            await generateRunwayTask({
                userId: user.uid,
                hologramId,
                name: state.name || autoName,
                thumbnailUrl: finalPreparedUrl,
                musicName: state.music,
                duration: "10 seg",
                creditsUsed: 1,
                type: state.type,
                actions: state.actions,
                env: env
            });

            onClose();

        } catch (error) {
            console.error("Error generating hologram:", error);
            updateState({ step: 'review' });

        }
    };

    return {
        state,
        nextStep,
        updateState,
        generateHologram
    };
}

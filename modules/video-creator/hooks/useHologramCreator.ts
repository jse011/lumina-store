"use client";

import { useState } from "react";
import { CreatorState, INITIAL_CREATOR_STATE, CreationStep } from "../types/CreatorState";
import { useAuth } from "@/core/providers/AuthContext";
import { FirebaseHologramRepository } from "../data/firebase/FirebaseHologramRepository";

import { storage } from "@/core/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const repository = new FirebaseHologramRepository();

export function useHologramCreator() {
    const { user } = useAuth();
    const [state, setState] = useState<CreatorState>(INITIAL_CREATOR_STATE);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openCreator = () => {
        setState(INITIAL_CREATOR_STATE);
        setIsModalOpen(true);
    };

    const closeCreator = () => {
        setIsModalOpen(false);
    };

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
            // 1. Subir imágenes a Storage si existen
            let finalPreparedUrl = state.preparedImage || "";
            
            if (state.preparedBlob && state.compressedBlob) {
                const timestamp = Date.now();
                
                // Subir original comprimido
                const originalRef = ref(storage, `holograms/${user.uid}/${timestamp}_original.webp`);
                await uploadBytes(originalRef, state.compressedBlob);
                // (Opcional: podrías guardar esta URL también en el registro si fuera necesario)

                // Subir preparado (este es el que se usa como thumbnail)
                const preparedRef = ref(storage, `holograms/${user.uid}/${timestamp}_prepared.png`);
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

            // Simular un poco más de tiempo para que parezca que está "creando" el video
            await new Promise(resolve => setTimeout(resolve, 2000));

            const hologramId = await repository.createHologram(user.uid, {
                name: state.name || autoName,
                thumbnailUrl: finalPreparedUrl,
                musicName: state.music,
                duration: "10 seg",
                creditsUsed: 1,
                type: state.type,
                actions: state.actions
            });

            updateState({ step: 'ready' });
        } catch (error) {
            console.error("Error generating hologram:", error);
            updateState({ step: 'review' });
        }
    };


    return {
        state,
        isModalOpen,
        openCreator,
        closeCreator,
        nextStep,
        updateState,
        generateHologram
    };
}

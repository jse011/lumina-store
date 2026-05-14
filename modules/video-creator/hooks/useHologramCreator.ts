"use client";

import { useState } from "react";
import { CreatorState, INITIAL_CREATOR_STATE, CreationStep } from "../types/CreatorState";
import { useAuth } from "@/core/providers/AuthContext";
import { FirebaseHologramRepository } from "../data/firebase/FirebaseHologramRepository";

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
            // Simular generación de holograma
            await new Promise(resolve => setTimeout(resolve, 3000));

            const hologramId = await repository.createHologram(user.uid, {
                name: state.name || "Nuevo Holograma",
                thumbnailUrl: state.preparedImage || "",
                musicName: state.music,
                duration: "10 seg",
                creditsUsed: 1,
                type: state.type,
                actions: state.actions
            });

            updateState({ step: 'ready' });
        } catch (error) {
            console.error("Error generating hologram:", error);
            updateState({ step: 'review' }); // Volver atrás en caso de error
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

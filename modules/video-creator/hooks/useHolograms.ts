"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/core/providers/AuthContext";
import { Hologram } from "../models/Hologram";
import { FirebaseHologramRepository } from "../data/firebase/FirebaseHologramRepository";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/core/lib/firebase";

const repository = new FirebaseHologramRepository();

export function useHolograms() {
    const { user } = useAuth();
    const [holograms, setHolograms] = useState<Hologram[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            setHolograms([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const unsubscribe = repository.onHologramsChange(user.uid, (data) => {
            setHolograms(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    // Global poller for any hologram that is currently processing
    useEffect(() => {
        if (!user || holograms.length === 0) return;

        const processingHolograms = holograms.filter(h => h.status === 'processing' && h.runwayTaskId);
        if (processingHolograms.length === 0) return;

        const checkHologramStatus = httpsCallable(functions, 'checkHologramStatus');
        const env = process.env.NODE_ENV === 'production' ? 'produccion' : 'prueba';

        // Keep track of tasks currently being polled to avoid concurrent calls for the same task
        const activePolls = new Set<string>();

        const pollInterval = setInterval(() => {
            processingHolograms.forEach(async (hologram) => {
                if (activePolls.has(hologram.id)) return;
                
                activePolls.add(hologram.id);
                try {
                    const isMock = String(hologram.runwayTaskId).includes("mock-runway");
                    await checkHologramStatus({
                        userId: user.uid,
                        hologramId: hologram.id,
                        taskId: hologram.runwayTaskId,
                        env: env,
                        isMock: isMock
                    });
                } catch (err) {
                    console.error("Error global polling hologram", hologram.id, err);
                } finally {
                    activePolls.delete(hologram.id);
                }
            });
        }, 5000);

        return () => clearInterval(pollInterval);
    }, [holograms, user]);

    const deleteHologram = async (id: string) => {
        if (!user) return;
        try {
            await repository.deleteHologram(user.uid, id);
        } catch (err) {
            setError("Error al eliminar el holograma");
        }
    };

    return { holograms, loading, error, deleteHologram };
}

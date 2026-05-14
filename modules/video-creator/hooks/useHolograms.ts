"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/core/providers/AuthContext";
import { Hologram } from "../models/Hologram";
import { FirebaseHologramRepository } from "../data/firebase/FirebaseHologramRepository";

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

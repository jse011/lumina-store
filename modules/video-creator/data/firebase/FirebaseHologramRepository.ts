import { ref, get, set, push, onValue, update, serverTimestamp } from "firebase/database";
import { database } from "@/core/lib/firebase";
import { Hologram } from "../../models/Hologram";
import { HologramAction } from "../../models/HologramAction";
import { HologramRepository } from "../../repositories/HologramRepository";

const getBasePath = () => {
    return process.env.NODE_ENV === 'production' ? 'produccion' : 'prueba';
};

export class FirebaseHologramRepository implements HologramRepository {
    private basePath = getBasePath() + "/users";

    async getHologramsByUserId(userId: string): Promise<Hologram[]> {
        const hologramsRef = ref(database, `${this.basePath}/${userId}/holograms`);
        const snapshot = await get(hologramsRef);

        if (!snapshot.exists()) return [];

        const data = snapshot.val();
        return Object.keys(data)
            .map(key => ({
                id: key,
                ...data[key]
            } as Hologram))
            .filter(h => !h.deleted)
            .sort((a, b) => b.createdAt - a.createdAt);
    }

    async createHologram(userId: string, hologram: Omit<Hologram, 'id' | 'createdAt' | 'status'>): Promise<string> {
        const id = this.generateHologramId(userId);
        await this.createHologramWithId(userId, id, hologram);
        return id;
    }

    generateHologramId(userId: string): string {
        const hologramsRef = ref(database, `${this.basePath}/${userId}/holograms`);
        const newHologramRef = push(hologramsRef);
        return newHologramRef.key as string;
    }

    async createHologramWithId(userId: string, hologramId: string, hologram: Omit<Hologram, 'id' | 'createdAt' | 'status'>): Promise<void> {
        const hologramRef = ref(database, `${this.basePath}/${userId}/holograms/${hologramId}`);

        const data = {
            ...hologram,
            status: 'pending',
            createdAt: serverTimestamp()
        };

        await set(hologramRef, data);
    }

    async deleteHologram(userId: string, hologramId: string): Promise<void> {
        const hologramRef = ref(database, `${this.basePath}/${userId}/holograms/${hologramId}`);
        const snapshot = await get(hologramRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            if (data.status !== 'ready') {
                throw new Error("Solo se pueden eliminar hologramas que ya están listos (ready)");
            }
        }

        await update(hologramRef, { deleted: true });
    }

    onHologramsChange(userId: string, callback: (holograms: Hologram[]) => void): () => void {
        const hologramsRef = ref(database, `${this.basePath}/${userId}/holograms`);

        const unsubscribe = onValue(hologramsRef, (snapshot) => {
            if (!snapshot.exists()) {
                callback([]);
                return;
            }

            const data = snapshot.val();
            const holograms = Object.keys(data)
                .map(key => ({
                    id: key,
                    ...data[key]
                } as Hologram))
                .filter(h => !h.deleted)
                .sort((a, b) => b.createdAt - a.createdAt);

            callback(holograms);
        });

        return unsubscribe;
    }

    onHologramChange(userId: string, hologramId: string, callback: (hologram: Hologram | null) => void): () => void {
        const hologramRef = ref(database, `${this.basePath}/${userId}/holograms/${hologramId}`);
        const unsubscribe = onValue(hologramRef, (snapshot) => {
            if (!snapshot.exists()) {
                callback(null);
                return;
            }
            const data = snapshot.val();
            callback({ id: hologramId, ...data } as Hologram);
        });
        return unsubscribe;
    }

    async getActionsByType(type: 'persona' | 'mascota'): Promise<HologramAction[]> {
        const actionsRef = ref(database, `${getBasePath()}/settings/hologramActions/${type}`);
        const snapshot = await get(actionsRef);

        if (!snapshot.exists()) {
            // Default actions in case Firebase is not configured yet
            if (type === 'mascota') {
                return [];
            } else {
                return [];
            }
        }

        return snapshot.val() as HologramAction[];
    }
}

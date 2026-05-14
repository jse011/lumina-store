import { ref, get, set, push, onValue, remove, serverTimestamp } from "firebase/database";
import { database } from "@/core/lib/firebase";
import { Hologram } from "../../models/Hologram";
import { HologramRepository } from "../../repositories/HologramRepository";

export class FirebaseHologramRepository implements HologramRepository {
    private basePath = "produccion/users";

    async getHologramsByUserId(userId: string): Promise<Hologram[]> {
        const hologramsRef = ref(database, `${this.basePath}/${userId}/holograms`);
        const snapshot = await get(hologramsRef);
        
        if (!snapshot.exists()) return [];

        const data = snapshot.val();
        return Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        })).sort((a, b) => b.createdAt - a.createdAt);
    }

    async createHologram(userId: string, hologram: Omit<Hologram, 'id' | 'createdAt' | 'status'>): Promise<string> {
        const hologramsRef = ref(database, `${this.basePath}/${userId}/holograms`);
        const newHologramRef = push(hologramsRef);
        
        const data = {
            ...hologram,
            status: 'pending',
            createdAt: serverTimestamp()
        };

        await set(newHologramRef, data);
        return newHologramRef.key as string;
    }

    async deleteHologram(userId: string, hologramId: string): Promise<void> {
        const hologramRef = ref(database, `${this.basePath}/${userId}/holograms/${hologramId}`);
        await remove(hologramRef);
    }

    onHologramsChange(userId: string, callback: (holograms: Hologram[]) => void): () => void {
        const hologramsRef = ref(database, `${this.basePath}/${userId}/holograms`);
        
        const unsubscribe = onValue(hologramsRef, (snapshot) => {
            if (!snapshot.exists()) {
                callback([]);
                return;
            }

            const data = snapshot.val();
            const holograms = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })).sort((a, b) => b.createdAt - a.createdAt);
            
            callback(holograms);
        });

        return unsubscribe;
    }
}

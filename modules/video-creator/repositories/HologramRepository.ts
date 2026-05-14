import { Hologram } from "../models/Hologram";

export interface HologramRepository {
    getHologramsByUserId(userId: string): Promise<Hologram[]>;
    createHologram(userId: string, hologram: Omit<Hologram, 'id' | 'createdAt' | 'status'>): Promise<string>;
    deleteHologram(userId: string, hologramId: string): Promise<void>;
    onHologramsChange(userId: string, callback: (holograms: Hologram[]) => void): () => void;
}

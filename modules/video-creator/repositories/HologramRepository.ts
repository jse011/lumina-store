import { Hologram } from "../models/Hologram";
import { HologramAction } from "../models/HologramAction";

export interface HologramRepository {
    getHologramsByUserId(userId: string): Promise<Hologram[]>;
    createHologram(userId: string, hologram: Omit<Hologram, 'id' | 'createdAt' | 'status'>): Promise<string>;
    deleteHologram(userId: string, hologramId: string): Promise<void>;
    onHologramsChange(userId: string, callback: (holograms: Hologram[]) => void): () => void;
    getActionsByType(type: 'persona' | 'mascota'): Promise<HologramAction[]>;
}

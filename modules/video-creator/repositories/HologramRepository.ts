import { Hologram } from "../models/Hologram";
import { HologramAction } from "../models/HologramAction";

export interface HologramRepository {
    getHologramsByUserId(userId: string): Promise<Hologram[]>;
    createHologram(userId: string, hologram: Omit<Hologram, 'id' | 'createdAt' | 'status'>): Promise<string>;
    generateHologramId(userId: string): string;
    createHologramWithId(userId: string, id: string, hologram: Omit<Hologram, 'id' | 'createdAt' | 'status'>): Promise<void>;
    deleteHologram(userId: string, hologramId: string): Promise<void>;
    onHologramsChange(userId: string, callback: (holograms: Hologram[]) => void): () => void;
    onHologramChange(userId: string, hologramId: string, callback: (hologram: Hologram | null) => void): () => void;
    getActionsByType(type: 'persona' | 'mascota'): Promise<HologramAction[]>;
}

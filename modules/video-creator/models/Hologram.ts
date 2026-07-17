export interface Hologram {
    id: string;
    name: string;
    thumbnailUrl: string;
    videoUrl?: string;
    musicName?: string;
    duration: string;
    createdAt: number;
    creditsUsed: number;
    status: 'pending' | 'processing' | 'ready' | 'error' | 'stopped';
    type: 'persona' | 'mascota';
    actions: string[];
    actionPrompts?: string[];
    deleted?: boolean;
    runwayTaskId?: string;
}

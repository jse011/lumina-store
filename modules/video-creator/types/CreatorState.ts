export type CreationStep = 'type' | 'actions' | 'upload' | 'music' | 'review' | 'generating' | 'ready';

export interface CreatorState {
    step: CreationStep;
    type: 'persona' | 'mascota' | null;
    actions: string[];
    image: File | null;
    compressedBlob: Blob | null;
    preparedBlob: Blob | null;
    preparedImage: string | null;
    originalPreviewUrl: string | null;
    music: string;
    name: string;
}

export const INITIAL_CREATOR_STATE: CreatorState = {
    step: 'type',
    type: null,
    actions: [],
    image: null,
    compressedBlob: null,
    preparedBlob: null,
    preparedImage: null,
    originalPreviewUrl: null,
    music: 'Sin música',
    name: ''
};


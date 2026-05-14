export type CreationStep = 'type' | 'actions' | 'upload' | 'music' | 'review' | 'generating' | 'ready';

export interface CreatorState {
    step: CreationStep;
    type: 'persona' | 'mascota' | null;
    actions: string[];
    image: File | null;
    preparedImage: string | null;
    music: string;
    name: string;
}

export const INITIAL_CREATOR_STATE: CreatorState = {
    step: 'type',
    type: null,
    actions: [],
    image: null,
    preparedImage: null,
    music: 'Sin música',
    name: ''
};

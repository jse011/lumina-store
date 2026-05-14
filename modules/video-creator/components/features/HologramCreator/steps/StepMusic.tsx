"use client";

import React from 'react';
import { CreatorState } from '../../../../types/CreatorState';

interface Props {
    onNext: () => void;
    onBack: () => void;
    onUpdate: (updates: Partial<CreatorState>) => void;
    value: string;
}

const MUSIC_OPTIONS = [
    { id: 'none', label: 'Sin música', duration: '00:00' },
    { id: 'suave', label: 'Melodía suave', duration: '01:30' },
    { id: 'emotiva', label: 'Emotiva', duration: '01:45' },
    { id: 'memorial', label: 'Memorial', duration: '02:10' },
    { id: 'lofi', label: 'Lofi recuerdos', duration: '01:50' }
];

export default function StepMusic({ onNext, onBack, onUpdate, value }: Props) {
    return (
        <div className="flex flex-col">
            <header className="flex items-center gap-4 mb-8">
                <button onClick={onBack} className="text-on-surface-variant hover:text-white transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div>
                    <h2 className="text-xl font-bold text-white">4. Elige la música</h2>
                    <p className="text-xs text-on-surface-variant">Selecciona la música para tu holograma</p>
                </div>
            </header>

            <div className="flex flex-col gap-2 mb-8">
                {MUSIC_OPTIONS.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => onUpdate({ music: option.label })}
                        className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                            value === option.label ? 'border-tertiary bg-tertiary/5' : 'border-outline-variant/30 hover:border-outline-variant'
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                value === option.label ? 'bg-tertiary text-background' : 'bg-surface-container-highest text-on-surface-variant'
                            }`}>
                                <span className="material-symbols-outlined text-xl">play_arrow</span>
                            </div>
                            <span className="text-sm font-medium text-on-surface">{option.label}</span>
                        </div>
                        <span className="text-xs text-on-surface-variant">{option.duration}</span>
                    </button>
                ))}
            </div>

            <button 
                onClick={onNext}
                className="w-full py-4 rounded-2xl bg-secondary text-on-secondary font-bold transition-all"
            >
                Continuar
            </button>
        </div>
    );
}

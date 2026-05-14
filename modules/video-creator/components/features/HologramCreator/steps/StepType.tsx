"use client";

import React from 'react';
import { CreatorState } from '../../../../types/CreatorState';

interface Props {
    onNext: () => void;
    onUpdate: (updates: Partial<CreatorState>) => void;
    value: CreatorState['type'];
}

export default function StepType({ onNext, onUpdate, value }: Props) {
    const handleSelect = (type: 'persona' | 'mascota') => {
        onUpdate({ type });
    };

    return (
        <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-2">¿Qué holograma deseas crear?</h2>
            <p className="text-on-surface-variant text-sm mb-8">Elige una opción para continuar</p>

            <div className="flex flex-col gap-4 mb-8">
                <button 
                    onClick={() => handleSelect('mascota')}
                    className={`flex items-center gap-4 p-5 rounded-2xl border transition-all ${
                        value === 'mascota' ? 'border-tertiary bg-tertiary/5' : 'border-outline-variant/30 hover:border-outline-variant'
                    }`}
                >
                    <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-3xl">pets</span>
                    </div>
                    <div className="text-left flex-1">
                        <h3 className="font-bold text-white">Mascota</h3>
                        <p className="text-xs text-on-surface-variant">Holograma para tu mascota</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
                </button>

                <button 
                    onClick={() => handleSelect('persona')}
                    className={`flex items-center gap-4 p-5 rounded-2xl border transition-all ${
                        value === 'persona' ? 'border-tertiary bg-tertiary/5' : 'border-outline-variant/30 hover:border-outline-variant'
                    }`}
                >
                    <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-3xl">person</span>
                    </div>
                    <div className="text-left flex-1">
                        <h3 className="font-bold text-white">Persona</h3>
                        <p className="text-xs text-on-surface-variant">Holograma para una persona</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
                </button>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-container-highest/50 mb-8">
                <span className="material-symbols-outlined text-on-surface-variant text-sm">info</span>
                <p className="text-[10px] leading-tight text-on-surface-variant">
                    Podrás elegir 2 acciones para tu holograma.
                </p>
            </div>

            <button 
                onClick={onNext}
                disabled={!value}
                className="w-full py-4 rounded-2xl bg-secondary text-on-secondary font-bold disabled:opacity-50 disabled:grayscale transition-all"
            >
                Continuar
            </button>
        </div>
    );
}

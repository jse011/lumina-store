"use client";

import React from 'react';
import { CreatorState } from '../../../../types/CreatorState';

interface Props {
    onNext: () => void;
    onBack: () => void;
    onUpdate: (updates: Partial<CreatorState>) => void;
    values: string[];
    type: 'persona' | 'mascota';
}

const PET_ACTIONS = [
    { id: 'mueve-cola', label: 'Mueve la cola' },
    { id: 'respira', label: 'Respira' },
    { id: 'come', label: 'Le das comida' },
    { id: 'salta', label: 'Salta' },
    { id: 'jadea', label: 'Jadea' },
    { id: 'acuesta', label: 'Se acuesta' }
];

const PERSON_ACTIONS = [
    { id: 'sonrie', label: 'Sonríe' },
    { id: 'saluda', label: 'Saluda' },
    { id: 'habla', label: 'Habla' },
    { id: 'guina', label: 'Guiña el ojo' },
    { id: 'respira', label: 'Respira' }
];

export default function StepActions({ onNext, onBack, onUpdate, values, type }: Props) {
    const actions = type === 'mascota' ? PET_ACTIONS : PERSON_ACTIONS;

    const toggleAction = (id: string) => {
        if (values.includes(id)) {
            onUpdate({ actions: values.filter(v => v !== id) });
        } else if (values.length < 2) {
            onUpdate({ actions: [...values, id] });
        }
    };

    return (
        <div className="flex flex-col">
            <header className="flex items-center gap-4 mb-8">
                <button onClick={onBack} className="text-on-surface-variant hover:text-white transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div>
                    <h2 className="text-xl font-bold text-white">Selecciona hasta 2 acciones</h2>
                    <p className="text-xs text-on-surface-variant">para tu holograma</p>
                </div>
            </header>

            <div className="flex flex-col gap-2 mb-8 max-h-[300px] overflow-y-auto no-scrollbar pr-1">
                {actions.map((action) => (
                    <button
                        key={action.id}
                        onClick={() => toggleAction(action.id)}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                            values.includes(action.id) ? 'border-tertiary bg-tertiary/5' : 'border-outline-variant/30 hover:border-outline-variant'
                        }`}
                    >
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            values.includes(action.id) ? 'bg-tertiary border-tertiary' : 'border-outline-variant/50'
                        }`}>
                            {values.includes(action.id) && <span className="material-symbols-outlined text-background text-[16px] font-bold">check</span>}
                        </div>
                        <span className="text-sm font-medium text-on-surface">{action.label}</span>
                    </button>
                ))}
            </div>

            <div className="text-center mb-8">
                <span className="text-xs text-on-surface-variant">
                    {values.length} de 2 seleccionadas
                </span>
            </div>

            <button 
                onClick={onNext}
                disabled={values.length === 0}
                className="w-full py-4 rounded-2xl bg-secondary text-on-secondary font-bold disabled:opacity-50 disabled:grayscale transition-all"
            >
                Continuar
            </button>
        </div>
    );
}

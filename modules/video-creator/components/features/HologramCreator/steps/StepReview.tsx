"use client";

import React from 'react';
import { CreatorState } from '../../../../types/CreatorState';

interface Props {
    onNext: () => void;
    onBack: () => void;
    state: CreatorState;
}

export default function StepReview({ onNext, onBack, state }: Props) {
    return (
        <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white mb-2">5. Generar holograma</h2>
            <p className="text-xs text-on-surface-variant mb-8">Revisa los detalles antes de generar</p>

            <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-highest/30">
                    <span className="text-xs text-on-surface-variant">Foto</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-white">Preparada</span>
                        <div className="w-8 h-8 rounded-md bg-surface-container-highest overflow-hidden">
                            {state.preparedImage && <img src={state.preparedImage} alt="Preview" className="w-full h-full object-cover" />}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-highest/30">
                    <span className="text-xs text-on-surface-variant">Música</span>
                    <span className="text-xs text-white">{state.music}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-highest/30">
                    <span className="text-xs text-on-surface-variant">Duración</span>
                    <span className="text-xs text-white">10 segundos</span>
                </div>
            </div>

            <div className="bg-surface-container-highest/50 p-6 rounded-3xl border border-tertiary/20 mb-8">
                <div className="text-center mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">Se usará:</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-tertiary">token</span>
                        </div>
                        <span className="text-lg font-bold text-white">1 crédito x 10 segundos de video</span>
                    </div>
                    <p className="text-[10px] text-on-surface-variant/60">(10 segundos de duración)</p>
                </div>
            </div>

            <div className="flex gap-3">
                <button 
                    onClick={onBack}
                    className="flex-1 py-4 rounded-2xl border border-outline-variant/30 text-white font-bold text-sm"
                >
                    Cancelar
                </button>
                <button 
                    onClick={onNext}
                    className="flex-[2] py-4 rounded-2xl bg-secondary text-on-secondary font-bold shadow-lg shadow-secondary/20"
                >
                    Generar ahora
                </button>
            </div>
        </div>
    );
}

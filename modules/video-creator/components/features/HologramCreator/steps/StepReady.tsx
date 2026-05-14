"use client";

import React from 'react';

interface Props {
    onClose: () => void;
}

export default function StepReady({ onClose }: Props) {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-2">6. ¡Tu holograma está listo!</h2>
            <p className="text-xs text-on-surface-variant mb-8 text-center">
                Así se verá en tu iluminador holográfico
            </p>

            <div className="aspect-video w-full rounded-3xl bg-black overflow-hidden relative mb-8 group shadow-2xl shadow-tertiary/10 border border-tertiary/20">
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-white opacity-40 group-hover:scale-110 transition-transform cursor-pointer">play_circle</span>
                </div>
                {/* Simulation of scanning lines */}
                <div className="absolute inset-0 pointer-events-none scan-line opacity-20"></div>
                
                {/* Control bar simulation */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-white text-lg">play_arrow</span>
                        <div className="w-32 h-1 bg-white/20 rounded-full relative">
                            <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-tertiary rounded-full"></div>
                        </div>
                        <span className="text-[10px] text-white">0:00 / 0:10</span>
                    </div>
                    <span className="material-symbols-outlined text-white text-lg">fullscreen</span>
                </div>
            </div>

            <div className="flex gap-3 w-full">
                <button 
                    className="flex-1 py-4 rounded-2xl border border-outline-variant/30 text-white font-bold text-sm flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined text-xl">download</span>
                    Descargar video
                </button>
                <button 
                    onClick={onClose}
                    className="flex-1 py-4 rounded-2xl bg-white text-background font-bold text-sm"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}

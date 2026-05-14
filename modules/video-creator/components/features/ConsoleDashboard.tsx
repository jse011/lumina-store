"use client";

import React from 'react';
import Link from 'next/link';
import { useHolograms } from '../../hooks/useHolograms';
import { useHologramCreator } from '../../hooks/useHologramCreator';
import HologramHistoryTable from './HologramHistoryTable';
import CreatorModal from './HologramCreator/CreatorModal';

export default function ConsoleDashboard() {
    const { holograms, loading, deleteHologram } = useHolograms();
    const { isModalOpen, openCreator, closeCreator } = useHologramCreator();

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
            {/* Back to Home */}
            <Link 
                href="/" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-on-surface-variant hover:text-white hover:bg-white/5 transition-all mb-8 group"
            >
                <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
                <span className="font-semibold text-sm">Volver al inicio</span>
            </Link>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Tu historial</h1>
                    <p className="text-on-surface-variant">Todos tus hologramas creados</p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex flex-col items-center md:items-end px-6">
                        <span className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Créditos disponibles</span>
                        <span className="text-2xl font-bold text-tertiary">2</span>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-tertiary/20 bg-tertiary/5 text-tertiary hover:bg-tertiary/10 transition-all">
                            <span className="material-symbols-outlined text-xl">chat_bubble</span>
                            <span className="font-semibold text-sm">Solicitar más créditos</span>
                        </button>
                        
                        <button 
                            onClick={openCreator}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-secondary text-on-secondary hover:brightness-110 transition-all shadow-lg shadow-secondary/20"
                        >
                            <span className="material-symbols-outlined text-xl">add</span>
                            <span className="font-semibold text-sm">Crear holograma</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="glass-panel rounded-3xl overflow-hidden">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-tertiary"></div>
                        <p className="text-on-surface-variant animate-pulse">Cargando tus recuerdos...</p>
                    </div>
                ) : holograms.length > 0 ? (
                    <HologramHistoryTable holograms={holograms} onDelete={deleteHologram} />
                ) : (
                    <div className="py-32 flex flex-col items-center justify-center text-center px-6">
                        <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-4xl text-on-surface-variant">auto_awesome_motion</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Aún no tienes hologramas</h3>
                        <p className="text-on-surface-variant max-w-md mb-8">
                            Comienza a crear tus propios recuerdos digitales y dales vida en el espectro lumínico.
                        </p>
                        <button 
                            onClick={openCreator}
                            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-tertiary to-secondary text-on-primary font-bold"
                        >
                            Crear mi primer holograma
                        </button>
                    </div>
                )}
            </div>

            {/* Creator Modal */}
            {isModalOpen && <CreatorModal onClose={closeCreator} />}
        </div>
    );
}

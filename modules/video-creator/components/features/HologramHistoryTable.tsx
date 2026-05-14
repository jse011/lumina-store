"use client";

import React from 'react';
import { Hologram } from '../../models/Hologram';

interface Props {
    holograms: Hologram[];
    onDelete: (id: string) => void;
}

export default function HologramHistoryTable({ holograms, onDelete }: Props) {
    return (
        <div className="w-full overflow-x-auto">
            {/* Desktop Table */}
            <table className="w-full text-left hidden md:table">
                <thead>
                    <tr className="border-b border-outline-variant/30">
                        <th className="px-6 py-5 text-xs uppercase tracking-widest text-on-surface-variant font-medium">Vista Previa</th>
                        <th className="px-6 py-5 text-xs uppercase tracking-widest text-on-surface-variant font-medium">Nombre</th>
                        <th className="px-6 py-5 text-xs uppercase tracking-widest text-on-surface-variant font-medium">Música</th>
                        <th className="px-6 py-5 text-xs uppercase tracking-widest text-on-surface-variant font-medium">Duración</th>
                        <th className="px-6 py-5 text-xs uppercase tracking-widest text-on-surface-variant font-medium">Fecha</th>
                        <th className="px-6 py-5 text-xs uppercase tracking-widest text-on-surface-variant font-medium text-center">Créditos</th>
                        <th className="px-6 py-5 text-xs uppercase tracking-widest text-on-surface-variant font-medium text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                    {holograms.map((hologram) => (
                        <tr key={hologram.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="w-16 h-10 rounded-lg bg-surface-container-highest overflow-hidden relative">
                                    {hologram.thumbnailUrl ? (
                                        <img src={hologram.thumbnailUrl} alt={hologram.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-on-surface-variant">image</span>
                                        </div>
                                    )}
                                    {hologram.status === 'processing' && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <div className="w-4 h-4 border-2 border-tertiary border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-white font-medium">{hologram.name}</span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                                    <span className="material-symbols-outlined text-lg">music_note</span>
                                    {hologram.musicName}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-on-surface-variant text-sm">
                                {hologram.duration}
                            </td>
                            <td className="px-6 py-4 text-on-surface-variant text-sm">
                                {new Date(hologram.createdAt).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })}
                                <div className="text-[10px] opacity-60">
                                     {new Date(hologram.createdAt).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-tertiary/10 text-tertiary text-xs font-bold">
                                    {hologram.creditsUsed}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors" title="Reproducir">
                                        <span className="material-symbols-outlined">play_circle</span>
                                    </button>
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-on-surface-variant transition-colors" title="Descargar">
                                        <span className="material-symbols-outlined">download</span>
                                    </button>
                                    <button 
                                        onClick={() => onDelete(hologram.id)}
                                        className="p-2 hover:bg-error/20 rounded-lg text-error transition-colors" 
                                        title="Eliminar"
                                    >
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Mobile List */}
            <div className="md:hidden divide-y divide-outline-variant/10">
                {holograms.map((hologram) => (
                    <div key={hologram.id} className="p-4 flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="w-24 h-16 rounded-xl bg-surface-container-highest overflow-hidden shrink-0">
                                {hologram.thumbnailUrl ? (
                                    <img src={hologram.thumbnailUrl} alt={hologram.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-on-surface-variant">image</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col justify-center">
                                <h4 className="text-white font-bold">{hologram.name}</h4>
                                <div className="flex items-center gap-2 text-on-surface-variant text-xs mt-1">
                                    <span className="material-symbols-outlined text-sm">music_note</span>
                                    {hologram.musicName} • {hologram.duration}
                                </div>
                                <div className="text-[10px] text-on-surface-variant/60 mt-0.5">
                                    {new Date(hologram.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <span className="text-[10px] uppercase text-on-surface-variant/60">Créditos:</span>
                                <span className="text-tertiary text-xs font-bold">{hologram.creditsUsed}</span>
                            </div>
                            <div className="flex gap-1">
                                <button className="p-2 bg-surface-container-high rounded-xl text-white">
                                    <span className="material-symbols-outlined text-xl">play_arrow</span>
                                </button>
                                <button className="p-2 bg-surface-container-high rounded-xl text-on-surface-variant">
                                    <span className="material-symbols-outlined text-xl">download</span>
                                </button>
                                <button 
                                    onClick={() => onDelete(hologram.id)}
                                    className="p-2 bg-error/10 rounded-xl text-error"
                                >
                                    <span className="material-symbols-outlined text-xl">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

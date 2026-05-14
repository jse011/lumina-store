"use client";

import React, { useRef, useState } from 'react';
import { CreatorState } from '../../../../types/CreatorState';

interface Props {
    onNext: () => void;
    onBack: () => void;
    onUpdate: (updates: Partial<CreatorState>) => void;
    image: File | null;
    preparedImage: string | null;
}

export default function StepUpload({ onNext, onBack, onUpdate, image, preparedImage }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isPreparing, setIsPreparing] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onUpdate({ image: file, preparedImage: null });
            simulatePreparation(file);
        }
    };

    const simulatePreparation = (file: File) => {
        setIsPreparing(true);
        // Simular procesamiento de imagen (recorte, fondo, etc)
        const reader = new FileReader();
        reader.onload = (e) => {
            setTimeout(() => {
                onUpdate({ preparedImage: e.target?.result as string });
                setIsPreparing(false);
            }, 1500);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white mb-2">
                {preparedImage ? '3. Prepara tu imagen' : '2. Sube tu foto'}
            </h2>
            <p className="text-xs text-on-surface-variant mb-8">
                {preparedImage ? 'Optimizamos tu foto para el holograma' : 'Elige una foto clara y de buena calidad'}
            </p>

            {!preparedImage ? (
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square w-full rounded-3xl border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/5 transition-all mb-8 p-8 text-center"
                >
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept="image/*"
                    />
                    <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white mb-1">Arrastra tu foto aquí</p>
                        <p className="text-xs text-on-surface-variant">o selecciona desde tu galería</p>
                    </div>
                    <button className="mt-4 px-6 py-2 rounded-xl border border-outline-variant/50 text-xs text-white">
                        Seleccionar foto
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-6 mb-8">
                    <div className="flex gap-4 items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-36 h-48 rounded-2xl bg-surface-container-highest overflow-hidden border border-outline-variant/30">
                                {image && <img src={URL.createObjectURL(image)} alt="Original" className="w-full h-full object-cover" />}
                            </div>
                            <span className="text-xs text-on-surface-variant uppercase">Original</span>
                        </div>
                        <span className="material-symbols-outlined text-tertiary">arrow_forward</span>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-36 h-48 rounded-2xl bg-surface-container-highest overflow-hidden border border-tertiary/50 shadow-lg shadow-tertiary/10">
                                <img src={preparedImage} alt="Preparada" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xs text-tertiary uppercase font-bold">Preparada</span>
                        </div>
                    </div>

                    <div className="bg-surface-container-highest/50 p-4 rounded-2xl">
                        <h4 className="text-[10px] uppercase font-bold text-on-surface-variant mb-2">Recomendaciones</h4>
                        <ul className="flex flex-col gap-1.5">
                            <li className="flex items-center gap-2 text-[10px] text-on-surface-variant/80">
                                <div className="w-1 h-1 rounded-full bg-tertiary"></div>
                                Rostro bien iluminado
                            </li>
                            <li className="flex items-center gap-2 text-[10px] text-on-surface-variant/80">
                                <div className="w-1 h-1 rounded-full bg-tertiary"></div>
                                Fondo simple
                            </li>
                            <li className="flex items-center gap-2 text-[10px] text-on-surface-variant/80">
                                <div className="w-1 h-1 rounded-full bg-tertiary"></div>
                                Foto nítida y enfocada
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            <div className="flex gap-3">
                <button 
                    onClick={() => onUpdate({ preparedImage: null, image: null })}
                    className="flex-1 py-4 rounded-2xl border border-outline-variant/30 text-white font-bold text-sm"
                >
                    {preparedImage ? 'Cambiar foto' : 'Cancelar'}
                </button>
                <button 
                    onClick={onNext}
                    disabled={!preparedImage || isPreparing}
                    className="flex-[2] py-4 rounded-2xl bg-secondary text-on-secondary font-bold disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center"
                >
                    {isPreparing ? (
                        <div className="w-5 h-5 border-2 border-on-secondary border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        'Crear holograma'
                    )}
                </button>
            </div>
        </div>
    );
}

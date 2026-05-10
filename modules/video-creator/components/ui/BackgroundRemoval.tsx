'use client';

import { useState, ChangeEvent } from 'react';
import { removeBackground } from '@imgly/background-removal';
import imageCompression from 'browser-image-compression';

export default function BackgroundRemoval() {
    const [loading, setLoading] = useState(false);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [originalUrl, setOriginalUrl] = useState<string | null>(null);

    const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setResultUrl(null);

        try {
            // Options for compression
            const options = {
                maxSizeMB: 2, // Max size 2MB
                maxWidthOrHeight: 1920, // Max dimension 1920px
                useWebWorker: true,
                preserveExif: true, // Preserve orientation and metadata
            };

            // Compress image before processing
            const compressedFile = await imageCompression(file, options);
            
            // Show compressed image preview (as it represents what will be processed)
            const previewUrl = URL.createObjectURL(compressedFile);
            setOriginalUrl(previewUrl);

            // Remove background using the compressed file
            const blob = await removeBackground(compressedFile);
            const url = URL.createObjectURL(blob);
            setResultUrl(url);
        } catch (error) {
            console.error('Error al procesar la imagen:', error);
            alert('Ocurrió un error al procesar la imagen. Asegúrate de que sea un formato compatible.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 hover:shadow-indigo-500/10">
            <div className="w-full max-w-2xl text-center space-y-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent italic">
                        Lumina Background Remover
                    </h2>
                    <p className="text-white/60 text-sm font-medium">
                        Sube una imagen y nuestra IA hará el resto.
                    </p>
                </div>

                <div className="relative group">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFile}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={`p-10 border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center gap-4 ${
                        loading ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/20 group-hover:border-indigo-500/50 group-hover:bg-white/5'
                    }`}>
                        <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                            {loading ? (
                                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                            )}
                        </div>
                        <div className="space-y-1">
                            <p className="text-white font-semibold">
                                {loading ? 'Procesando magia...' : 'Selecciona una imagen'}
                            </p>
                            <p className="text-white/40 text-xs">
                                PNG, JPG o WebP hasta 10MB
                            </p>
                        </div>
                    </div>
                </div>

                {(originalUrl || resultUrl) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {originalUrl && (
                            <div className="space-y-2">
                                <p className="text-xs font-bold text-white/40 uppercase tracking-widest text-left ml-1">Original</p>
                                <div className="aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 group relative">
                                    <img src={originalUrl} alt="Original" className="w-full h-full object-contain" />
                                </div>
                            </div>
                        )}
                        {resultUrl && (
                            <div className="space-y-2">
                                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest text-left ml-1">Sin Fondo</p>
                                <div className="aspect-square rounded-xl overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] border border-indigo-500/30 group relative shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                                    <img src={resultUrl} alt="Sin fondo" className="w-full h-full object-contain animate-in zoom-in-95 duration-500" />
                                    <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors duration-300" />
                                </div>
                                <div className="pt-2">
                                    <a 
                                        href={resultUrl} 
                                        download="lumina-bg-removed.png"
                                        className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold text-sm transition-colors"
                                    >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Descargar Resultado
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
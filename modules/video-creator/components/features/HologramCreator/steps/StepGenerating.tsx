"use client";

import React from 'react';

export default function StepGenerating() {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="relative mb-12">
                <div className="w-32 h-32 rounded-full border-4 border-tertiary/10"></div>
                <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-tertiary border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-tertiary animate-pulse">auto_awesome</span>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">Generando....</h2>
            <p className="text-sm text-on-surface-variant max-w-[240px]">
                Estamos dando vida a tu recuerdo. Esto puede tomar unos segundos.
            </p>
            
            <div className="mt-12 flex gap-1.5">
                {[0, 1, 2].map((i) => (
                    <div 
                        key={i} 
                        className="w-2 h-2 rounded-full bg-tertiary animate-bounce" 
                        style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                ))}
            </div>
        </div>
    );
}

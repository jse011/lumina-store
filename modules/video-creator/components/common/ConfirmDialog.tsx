"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    variant = 'danger'
}: ConfirmDialogProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !mounted) return null;

    const variantStyles = {
        danger: {
            icon: 'delete_forever',
            iconColor: 'text-error',
            buttonBg: 'bg-error/20 hover:bg-error/30 text-error border-error/30',
            glow: 'shadow-[0_0_30px_rgba(255,180,171,0.15)]',
            accent: 'bg-error/5'
        },
        warning: {
            icon: 'warning',
            iconColor: 'text-amber-500',
            buttonBg: 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 border-amber-500/30',
            glow: 'shadow-[0_0_30px_rgba(245,158,11,0.15)]',
            accent: 'bg-amber-500/5'
        },
        info: {
            icon: 'info',
            iconColor: 'text-tertiary',
            buttonBg: 'bg-tertiary/20 hover:bg-tertiary/30 text-tertiary border-tertiary/30',
            glow: 'shadow-[0_0_30px_rgba(0,219,231,0.15)]',
            accent: 'bg-tertiary/5'
        }
    };

    const style = variantStyles[variant];

    return createPortal(
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-300"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className={`glass-panel max-w-sm w-full rounded-[2rem] p-8 border border-white/10 ${style.glow} text-center space-y-6 relative overflow-hidden animate-in zoom-in-95 duration-300`}>
                {/* Decorative Accents */}
                <div className={`absolute -top-24 -left-24 w-48 h-48 ${style.accent} blur-[80px] pointer-events-none`}></div>
                <div className={`absolute -bottom-24 -right-24 w-48 h-48 ${style.accent} blur-[80px] pointer-events-none`}></div>

                <div className="relative">
                    <div className={`w-20 h-20 ${style.accent} rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5 shadow-inner`}>
                        <span className={`material-symbols-outlined ${style.iconColor} text-4xl`} style={{ fontVariationSettings: "'FILL' 1" }}>
                            {style.icon}
                        </span>
                    </div>

                    <h3 className="font-display text-2xl text-white font-bold mb-3 tracking-tight">
                        {title}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
                        {message}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-on-surface-variant font-bold text-xs uppercase tracking-widest transition-all active:scale-95"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`px-6 py-4 rounded-2xl border ${style.buttonBg} font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

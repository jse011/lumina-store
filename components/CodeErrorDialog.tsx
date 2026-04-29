"use client";

import { useEffect, useState } from 'react';

interface CodeErrorDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CodeErrorDialog({ open, onClose }: CodeErrorDialogProps) {
  const [countdown, setCountdown] = useState(299); // 4:59

  useEffect(() => {
    if (!open) {
      setCountdown(299);
      return;
    }
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [open]);

  const minutes = String(Math.floor(countdown / 60)).padStart(2, '0');
  const seconds = String(countdown % 60).padStart(2, '0');

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#050B18]/80 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="glass-panel max-w-md w-full rounded-[2rem] p-8 border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.15)] text-center space-y-6 relative overflow-hidden animate-[fadeIn_0.3s_ease]">
        {/* Red glow accent */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-500/10 blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-red-500/5 blur-[80px] pointer-events-none"></div>

        <div className="relative">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <span className="material-symbols-outlined text-red-500 text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              shield_with_heart
            </span>
          </div>

          <h3 className="font-display text-2xl text-white font-bold mb-4">
            Código Incorrecto o No Válido
          </h3>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
            El código ingresado no se encuentra en nuestro sistema o ya ha sido
            utilizado. Por seguridad, se ha limitado el número de intentos.
          </p>

          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 mb-8">
            <p className="text-red-400 font-display text-xs uppercase tracking-widest font-bold">
              Reintento disponible en:
            </p>
            <p className="text-white font-display text-2xl font-bold mt-1 tracking-tighter">
              {minutes}:{seconds}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-red-500/80 to-amber-500/80 text-white font-display font-bold py-4 rounded-xl transition-all uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-[0.98]"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

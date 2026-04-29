"use client";

interface CodeValidatedScreenProps {
  code: string;
  onContinueWithGoogle: () => void;
  onBack: () => void;
}

export default function CodeValidatedScreen({ code, onContinueWithGoogle, onBack }: CodeValidatedScreenProps) {
  return (
    <div className="fixed inset-0 z-[150] bg-[#050B18] flex items-center justify-center overflow-auto px-4 py-12">
      {/* Background glow elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[60%] bg-tertiary/10 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[60%] bg-secondary/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Botón Volver - esquina superior izquierda */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-on-surface-variant hover:text-tertiary transition-colors group z-10"
      >
        <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">
          arrow_back
        </span>
        <span className="font-display text-xs uppercase tracking-widest font-bold">Volver</span>
      </button>

      {/* Card principal */}
      <div className="relative z-10 w-full max-w-[560px]">
        <div className="glass-panel scan-line w-full rounded-3xl p-8 md:p-12 bg-white/5 relative overflow-hidden flex flex-col items-center text-center shadow-[0_0_50px_rgba(34,211,238,0.1)] border border-tertiary/20">

          {/* Success Aura */}
          <div className="w-24 h-24 rounded-full bg-tertiary/20 flex items-center justify-center mb-8 border border-tertiary/30 animate-pulse shadow-[0_0_30px_rgba(0,219,231,0.2)]">
            <span
              className="material-symbols-outlined text-5xl text-tertiary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>

          <div className="space-y-4 mb-8">
            <h1 className="font-display text-3xl md:text-5xl text-white font-bold">¡Código Validado!</h1>
            <p className="text-on-surface-variant text-base md:text-lg max-w-[420px] leading-relaxed">
              Ahora, vincula tu cuenta para proteger tu recuerdo para siempre.
            </p>
          </div>

          {/* Verified Code Chip */}
          <div className="bg-tertiary/10 border border-tertiary/30 px-6 py-3 rounded-xl mb-8">
            <span className="font-display text-xl tracking-[0.5em] text-tertiary font-bold uppercase">
              {code || 'LMN-992-ARC'}
            </span>
          </div>

          {/* Google Link Action */}
          <button
            onClick={onContinueWithGoogle}
            className="w-full group flex items-center justify-center gap-4 bg-white hover:bg-slate-100 text-slate-900 font-display font-bold py-4 rounded-xl transition-all duration-300 active:scale-[0.98] shadow-xl mb-8"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="text-lg">Continuar con Google</span>
          </button>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/5 text-center transition-all hover:bg-white/10">
              <span className="material-symbols-outlined text-secondary mb-2 text-3xl">devices</span>
              <p className="font-display text-[10px] uppercase tracking-widest text-secondary/80">Acceso desde cualquier dispositivo</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/5 text-center transition-all hover:bg-white/10">
              <span className="material-symbols-outlined text-tertiary mb-2 text-3xl">shield_lock</span>
              <p className="font-display text-[10px] uppercase tracking-widest text-tertiary/80">Seguridad total de datos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

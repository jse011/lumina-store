"use client";

import { useState, ReactNode } from 'react';
import CodeErrorDialog from './CodeErrorDialog';
import CodeValidatedScreen from './CodeValidatedScreen';
import { useAuth } from '@/core/context/AuthContext';

interface AccessProps {
  hero: ReactNode;
  authorized: ReactNode;
}

export default function Access({ hero, authorized }: AccessProps) {
  const { isAuthorized, login } = useAuth();
  const [code, setCode] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showValidated, setShowValidated] = useState(false);

  const handleValidate = () => {
    if (!code.trim()) {
      setShowErrorDialog(true);
    } else {
      setShowValidated(true);
    }
  };

  const handleLogin = () => {
    setShowValidated(false);
    login();
  };

  // Si ya está autorizado, mostrar solo Authorized
  if (isAuthorized) {
    return <>{authorized}</>;
  }

  return (
    <>
      {/* Error Dialog */}
      <CodeErrorDialog
        open={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
      />

      {/* Validated Screen overlay */}
      {showValidated && (
        <CodeValidatedScreen
          code={code}
          onBack={() => setShowValidated(false)}
          onContinueWithGoogle={handleLogin}
        />
      )}

      {/* Hero + Access section */}
      {hero}

      <section className="py-24 relative overflow-hidden" id="access">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full glass-panel border-tertiary/30">
            <span className="material-symbols-outlined text-tertiary text-sm">lock</span>
            <span className="font-display text-[10px] text-white uppercase tracking-[0.2em] font-bold">Portal de Acceso Privado</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium mb-6">Tu recuerdo te espera</h2>
          <p className="text-on-surface-variant max-w-lg mx-auto mb-12 text-sm md:text-base">
            Si ya cuentas con tu producto físico Lumina y tu tarjeta de acceso, ingresa el código único para activar la experiencia holográfica en tu dispositivo.
          </p>

          <div className="glass-panel p-2 rounded-2xl max-w-lg mx-auto flex flex-col sm:flex-row gap-2 border border-white/10 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            <input
              className="flex-grow bg-transparent border-0 focus:ring-0 text-white px-6 py-4 placeholder:text-slate-500 font-display tracking-[0.2em] text-center sm:text-left outline-none"
              placeholder="INGRESA TU CÓDIGO AQUÍ"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleValidate(); }}
            />
            <button
              onClick={handleValidate}
              className="bg-gradient-to-r from-tertiary to-secondary text-on-primary font-display font-bold py-4 px-10 rounded-xl transition-all uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-95 cursor-pointer"
            >
              Validar
            </button>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-4 my-8">
              <div className="flex-grow h-px bg-white/10"></div>
              <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-medium whitespace-nowrap">O inicia sesión con tu correo</span>
              <div className="flex-grow h-px bg-white/10"></div>
            </div>
            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white text-background font-display font-bold py-4 px-10 rounded-xl transition-all uppercase tracking-widest text-xs hover:bg-slate-200 active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Continuar con Google
            </button>
          </div>

          <div className="mt-8 flex justify-center items-center gap-4">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">¿No tienes un código?</span>
            <a className="text-[10px] text-tertiary font-bold uppercase tracking-widest hover:underline" href="#catalog">Explora el Catálogo</a>
          </div>
        </div>
      </section>
    </>
  );
}

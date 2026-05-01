"use client";

import { ReactNode, useMemo } from 'react';
import CodeErrorDialog from '../common/CodeErrorDialog';
import CodeValidatedScreen from '../common/CodeValidatedScreen';
import { useAuth } from '@/core/providers/AuthContext';
import { useAccess } from '../../hooks/useAccess';
import { FirebaseCodeRepository } from '../../data/firebase';
import Badge from '@/components/ui/Badge';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';

interface AccessCardProps {
  hero?: ReactNode;
  authorized?: ReactNode;
}

export default function AccessCard({ hero, authorized }: AccessCardProps) {
  const { isAuthorized, login, logout } = useAuth();

  const codeRepository = useMemo(() => new FirebaseCodeRepository(), []);

  const {
    code,
    setCode,
    lockoutTime,
    isValidating,
    showErrorDialog,
    setShowErrorDialog,
    showValidated,
    setShowValidated,
    errorType,
    handleValidate,
    handleLinkUser
  } = useAccess(codeRepository, () => { });

  const handleLogin = async () => {
    try {
      const loggedUser = await login();
      if (loggedUser && loggedUser.email) {
        try {
          await handleLinkUser(loggedUser.email, async () => { });
        } catch (error) {
          console.error("Linking failed, logging out:", error);
          setShowValidated(false);
          await logout();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isAuthorized) {
    return <>{authorized}</>;
  }

  return (
    <>
      <CodeErrorDialog
        open={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        lockoutTime={lockoutTime}
        title={
          errorType === 'empty' ? "Código Requerido" : 
          errorType === 'used' ? "Código ya utilizado" : 
          undefined
        }
        description={
          errorType === 'empty' ? "Por favor, ingresa tu código de acceso para continuar con la validación." : 
          errorType === 'used' ? "Este código ya ha sido vinculado a otra cuenta. Si crees que es un error, contacta a soporte." : 
          undefined
        }
      />

      {showValidated && (
        <CodeValidatedScreen
          code={code}
          onBack={() => setShowValidated(false)}
          onContinueWithGoogle={handleLogin}
        />
      )}

      {hero}

      <section className="py-24 relative overflow-hidden" id="access">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <Badge icon="lock">
            Portal de Acceso Privado
          </Badge>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium mb-6">Tu recuerdo te espera</h2>
          <p className="text-on-surface-variant max-w-lg mx-auto mb-12 text-sm md:text-base">
            Si ya cuentas con tu producto físico Lumina y tu tarjeta de acceso, ingresa el código único para activar la experiencia holográfica en tu dispositivo.
          </p>

          <div className="glass-panel p-2 rounded-2xl max-w-lg mx-auto flex flex-col sm:flex-row gap-2 border border-white/10 shadow-[0_0_30px_rgba(34,211,238,0.15)] relative overflow-hidden">
            {lockoutTime > 0 && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-20 flex items-center justify-center gap-3 animate-in fade-in duration-300">
                <span className="material-symbols-outlined text-error text-sm animate-pulse">timer</span>
                <span className="text-error font-display text-xs uppercase tracking-widest font-bold">
                  Espera {lockoutTime}s para reintentar
                </span>
              </div>
            )}
            <TextInput
              placeholder="INGRESA TU CÓDIGO AQUÍ"
              value={code}
              disabled={lockoutTime > 0 || isValidating}
              className={lockoutTime > 0 ? 'opacity-20' : 'opacity-100'}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => { if (e.key === 'Enter') handleValidate(); }}
            />
            <Button
              onClick={handleValidate}
              disabled={lockoutTime > 0 || isValidating}
            >
              {isValidating ? 'Validando...' : 'Validar'}
            </Button>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-4 my-8">
              <div className="flex-grow h-px bg-white/10"></div>
              <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-medium whitespace-nowrap">O inicia sesión con tu correo</span>
              <div className="flex-grow h-px bg-white/10"></div>
            </div>
            <Button
              variant="social"
              onClick={handleLogin}
              className="gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Continuar con Google
            </Button>
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
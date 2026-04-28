import { FirebaseSettingsRepository } from '@/core/infrastructure/firebase/repositories';
import Link from 'next/link';

export default async function Delivery() {
  const settingsRepo = new FirebaseSettingsRepository();
  const settings = await settingsRepo.getSettings();

  return (
    <section className="py-24" id="delivery">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="glass-panel rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 border border-tertiary/20 relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 relative z-10">
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-white mb-6 font-bold">Información de Entrega</h2>
                <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
                  Llevamos tus recuerdos a cualquier rincón del país con el máximo cuidado y respeto.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl glass-panel flex items-center justify-center text-tertiary border-tertiary/30">
                    <span className="material-symbols-outlined text-2xl md:text-3xl">local_shipping</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg md:text-xl">Lima</p>
                    <p className="text-xs md:text-sm text-tertiary font-medium">{settings.shippingTimeLima}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl glass-panel flex items-center justify-center text-secondary border-secondary/30">
                    <span className="material-symbols-outlined text-2xl md:text-3xl">public</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg md:text-xl">Provincias</p>
                    <p className="text-xs md:text-sm text-secondary font-medium">{settings.shippingTimeProvincia}</p>
                  </div>
                </div>
                
                <p className="text-[10px] md:text-xs text-slate-500 mt-4 italic font-medium">* Costo de envío según ubicación</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/5 rounded-3xl p-6 md:p-8 border border-white/10 space-y-6">
                <h3 className="font-display text-xl md:text-2xl text-white font-bold">Cómo recibes tu recuerdo</h3>
                <div className="space-y-4">
                  <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                    Luego de coordinar tu pedido por WhatsApp, recibirás tu producto físico junto con una <span className="text-tertiary font-bold">tarjeta de acceso única</span>.
                  </p>
                  <div className="p-4 bg-tertiary/10 border border-tertiary/30 rounded-xl">
                    <p className="text-[10px] md:text-xs text-cyan-200 leading-relaxed font-medium mb-3">
                      Con ese código podrás ingresar a la experiencia digital de Lumina Recuerdos para activar la proyección holográfica.
                    </p>
                    <Link 
                      className="inline-flex items-center gap-2 text-white font-bold text-[10px] uppercase tracking-widest hover:text-tertiary transition-colors" 
                      href="#access"
                    >
                      Ir al portal de acceso <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


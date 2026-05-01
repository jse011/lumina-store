import Image from 'next/image';
import { FirebaseSettingsRepository } from '../../data/firebase';

export default async function Hero() {
  const settingsRepo = new FirebaseSettingsRepository();
  const settings = await settingsRepo.getSettings();

  const {
    whatsappNumber,
    heroTitle,
    heroTitleHighlight,
    heroSubtitle,
    heroImageUrl,
    heroWhatsappText,
    heroBadgeText,
    heroSubBadge
  } = settings;

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="home">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 text-center md:text-left mt-10 md:mt-0">
          <h1 className="font-display text-4xl md:text-7xl text-white leading-none font-bold">
            {heroTitle} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tertiary to-secondary">{heroTitleHighlight}</span>
          </h1>

          <p className="text-base md:text-lg text-on-surface-variant max-w-lg mx-auto md:mx-0">
            {heroSubtitle}
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                className="bg-[#25D366] text-white font-bold px-8 md:px-10 py-4 rounded-xl flex items-center gap-2 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)] transition-all uppercase tracking-widest text-[10px] md:text-xs"
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(heroWhatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {heroBadgeText} <span className="material-symbols-outlined">chat</span>
              </a>
              <a
                className="glass-panel text-white font-bold px-6 md:px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all uppercase tracking-widest text-[10px] md:text-xs"
                href="#access"
              >
                Acceder con mi Código
              </a>
            </div>

            <p className="text-[10px] md:text-[11px] text-slate-400 font-medium tracking-wide leading-relaxed">
              {heroSubBadge}
            </p>
          </div>
        </div>

        <div className="relative group max-w-md mx-auto md:max-w-none hidden md:block">
          <div className="absolute -inset-10 bg-gradient-to-tr from-tertiary/20 to-secondary/20 blur-[80px] opacity-40 group-hover:opacity-60 transition-opacity"></div>

          {/* Phone Frame */}
          <div className="relative w-[300px] h-[600px] mx-auto border-[12px] border-slate-900 rounded-[3rem] bg-slate-900 shadow-2xl overflow-hidden ring-1 ring-white/10 group-hover:scale-[1.02] transition-transform duration-500">
            {/* Camera/Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-800 mr-2"></div>
              <div className="w-12 h-1 rounded-full bg-slate-800"></div>
            </div>

            {/* Video Content */}
            <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-black">
              {heroImageUrl && heroImageUrl.includes('drive.google.com') ? (
                <iframe
                  src={heroImageUrl.replace(/\/view.*$/, '/preview').replace(/\/edit.*$/, '/preview') + '?autoplay=1&mute=1&loop=1'}
                  className="w-full h-[120%] -mt-[10%] object-cover pointer-events-none border-none"
                  allow="autoplay"
                />
              ) : heroImageUrl ? (
                <Image
                  alt="Hero Visual"
                  className="w-full h-full object-cover"
                  src={heroImageUrl}
                  width={600}
                  height={1200}
                  priority
                />
              ) : (
                <div className="w-full h-full bg-slate-800 animate-pulse"></div>
              )}

              {/* YouTube Shorts UI Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

              {/* Bottom Info */}
              <div className="absolute bottom-6 left-4 right-12 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-tertiary to-secondary p-[1px]">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                      <span className="material-symbols-outlined text-xs">store</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold tracking-tight">@lumina_oficial</span>
                </div>
                <p className="text-xs line-clamp-2 opacity-90 leading-relaxed font-medium">
                  {heroSubtitle}
                </p>
              </div>

              {/* Action Icons */}
              <div className="absolute right-3 bottom-10 flex flex-col gap-5 items-center text-white">
                <div className="flex flex-col items-center">
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur-md mb-1 border border-white/5">
                    <span className="material-symbols-outlined text-xl">favorite</span>
                  </div>
                  <span className="text-[10px] font-bold">12.5k</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur-md mb-1 border border-white/5">
                    <span className="material-symbols-outlined text-xl">chat</span>
                  </div>
                  <span className="text-[10px] font-bold">482</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur-md mb-1 border border-white/5">
                    <span className="material-symbols-outlined text-xl">share</span>
                  </div>
                  <span className="text-[10px] font-bold">Compartir</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-800 border-2 border-white/20 animate-spin-slow">
                  <div className="w-full h-full bg-gradient-to-tr from-tertiary to-secondary opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 scan-line pointer-events-none opacity-10"></div>
        </div>
      </div>
    </section>
  );
}

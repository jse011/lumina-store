import Link from 'next/link';
import { APP_VERSION } from '../data/mock';

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-white/5 bg-[#050B18]">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 gap-6 max-w-7xl mx-auto text-center md:text-left">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <span className="text-lg font-semibold text-white font-display">Lumina Recuerdos</span>
          <p className="text-slate-500 font-display text-xs">© 2024 Lumina Recuerdos. <span className="opacity-50">v{APP_VERSION}</span></p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <Link className="text-slate-500 hover:text-cyan-400 transition-colors font-display text-sm hover:underline" href="#">
            Privacidad
          </Link>
          <Link className="text-slate-500 hover:text-cyan-400 transition-colors font-display text-sm hover:underline" href="#">
            Términos
          </Link>
          <Link className="text-slate-500 hover:text-cyan-400 transition-colors font-display text-sm hover:underline" href="#">
            Contacto
          </Link>
          <Link className="text-slate-500 hover:text-cyan-400 transition-colors font-display text-sm hover:underline" href="#">
            Preguntas Frecuentes
          </Link>
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-white hover:text-cyan-400 cursor-pointer transition-colors" aria-hidden="true">
            public
          </span>
          <span className="material-symbols-outlined text-white hover:text-cyan-400 cursor-pointer transition-colors" aria-hidden="true">
            chat_bubble
          </span>
        </div>
      </div>
    </footer>
  );
}

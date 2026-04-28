import { APP_VERSION } from '../data/mock';

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-slate-800/50 bg-background">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-12 gap-6 max-w-7xl mx-auto">
        <div className="text-lg font-semibold text-slate-200 font-display">Lumina Recuerdos</div>
        
        <p className="font-display font-light text-[10px] md:text-sm text-slate-500 uppercase tracking-widest text-center md:text-left">
          © 2024 Lumina Recuerdos. Digital Immortality Preserved. <span className="opacity-30">v{APP_VERSION}</span>
        </p>
        
        <div className="flex gap-4 md:gap-8">
          <a className="text-slate-500 hover:text-violet-400 transition-colors duration-300 font-display text-[10px] md:text-sm font-light uppercase tracking-widest" href="#">
            Privacy Policy
          </a>
          <a className="text-slate-500 hover:text-violet-400 transition-colors duration-300 font-display text-[10px] md:text-sm font-light uppercase tracking-widest" href="#">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}


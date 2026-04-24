import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#050B18]/80 backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent font-display tracking-tight">
          Lumina Recuerdos
        </span>
        <div className="hidden md:flex items-center gap-8">
          <Link
            className="text-cyan-400 border-b-2 border-cyan-400 pb-1 font-display tracking-tight"
            href="#"
          >
            Inicio
          </Link>
          <Link
            className="text-slate-400 hover:text-white transition-colors font-display tracking-tight"
            href="#catalogo"
          >
            Catálogo
          </Link>
          <Link
            className="text-slate-400 hover:text-white transition-colors font-display tracking-tight"
            href="#historias"
          >
            Historias
          </Link>
          <Link
            className="text-slate-400 hover:text-white transition-colors font-display tracking-tight"
            href="#entrega"
          >
            Entrega
          </Link>
        </div>
        <button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-white px-6 py-2 rounded-full font-label-sm uppercase tracking-wider hover:scale-95 transition-transform active:scale-90 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          WhatsApp
        </button>
      </div>
    </nav>
  );
}

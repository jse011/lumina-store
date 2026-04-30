import Image from 'next/image';

export default async function Authorized() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden" id="authorized">
            {/* Background elements to match home style */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-tertiary/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                {/* ── Hero Welcome Section ── */}
                <header className="mb-16 md:mb-24 text-center md:text-left">
                    <p className="font-display text-tertiary uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-4">
                        Acceso Autorizado
                    </p>
                    <h1 className="font-display text-4xl md:text-7xl text-white leading-tight font-bold mb-6">
                        Hola, <span className="text-transparent bg-clip-text bg-gradient-to-r from-tertiary to-secondary">Julián</span>
                    </h1>
                    <p className="text-on-surface-variant text-base md:text-lg max-w-2xl leading-relaxed">
                        Bienvenido a tu santuario digital. Tus fragmentos de tiempo están
                        siendo preservados en la eternidad del espectro lumínico.
                    </p>
                </header>

                {/* Prominent CTA Section */}
                <section className="mt-16 md:mt-24 text-center">
                    <button className="relative group inline-flex items-center justify-center p-0.5 overflow-hidden rounded-2xl bg-gradient-to-br from-tertiary to-secondary active:scale-95 transition-all duration-300">
                        <span className="relative px-10 py-5 transition-all ease-in duration-75 bg-[#050B18] rounded-[14px] group-hover:bg-opacity-0 flex items-center gap-4">
                            <span className="font-display text-xl md:text-2xl text-white font-bold tracking-wide uppercase">Ver Mi Bóveda</span>
                            <span className="material-symbols-outlined text-2xl text-white group-hover:translate-x-2 transition-transform">arrow_forward</span>
                        </span>
                        {/* Background glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-tertiary to-secondary rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                    </button>
                    <p className="mt-6 text-on-surface-variant text-sm md:text-base italic opacity-60">
                        Explora tus recuerdos y revive la esencia de cada momento.
                    </p>
                </section>


            </div>
        </section>
    );
}
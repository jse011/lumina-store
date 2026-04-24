import Image from 'next/image';

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-xl">
      <div className="absolute inset-0 z-0">
        <Image
          alt="Exhibición holográfica futurista de un recuerdo familiar"
          className="w-full h-full object-cover opacity-40"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdINwCYrHbLyZ-7dEDE1NHVevMnmJErdNWr07wOLBLAN548td04h0BbwHZ5wsUIkrG_JdK0pwzY0m3a13SRHxiKQqxKhY8a8v750KIXpwwwPZiuo4KKv2BhpiKMiaEF1xokUxoIPnlUHgfxUwQ1mfPFfn2K1iL7o0h5C7P4ETPF9fxfOX9qBaVP2ZOwIhgBK2weLp_yD4_cMdgm637TlWj10I4fEayD53wknaYyrgDgrO-QbdIMptOW4FC6wrShBqSujWKwvH8dAfB"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B18] via-transparent to-[#050B18]"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-md items-center">
        <div className="space-y-md text-center md:text-left mt-20 md:mt-0">
          <h2 className="font-display text-display text-white leading-tight">
            Revive tus momentos <span className="text-tertiary">favoritos en 3D</span>
          </h2>
          <p className="font-body-lg text-on-surface-variant">
            Transformamos tus fotos y videos en recuerdos holográficos eternos. Una ventana al pasado capturada con la tecnología del futuro.
          </p>
          <div className="pt-base flex justify-center md:justify-start">
            <button className="px-lg py-sm md:px-xl md:py-md bg-gradient-to-r from-cyan-400 to-violet-500 text-white rounded-xl text-lg md:text-2xl font-headline-md shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:scale-105 transition-all flex items-center gap-4">
              Hablar por WhatsApp
              <span className="material-symbols-outlined" aria-hidden="true">
                chat
              </span>
            </button>
          </div>
        </div>
        <div className="hidden md:flex justify-center">
          <div className="relative w-[400px] h-[400px] glass-panel rounded-full flex items-center justify-center p-md shadow-[0_0_50px_rgba(0,219,231,0.15)]">
            <div className="w-full h-full rounded-full border border-tertiary/20 animate-pulse absolute"></div>
            <Image
              alt="Primer plano de un prisma holográfico de cristal"
              className="object-cover rounded-3xl mix-blend-screen"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkkaR9hpUBbDLG3INnlOXkj7t45ion6TpVrKOA_A4Z52TBpiXeQeXvsa9Jo3rxwn6x2xvPNCgQoqAmYD6ejAoDwa2w_W-pU8QVHiCzFqDyxmHZNaXYfVLxEigqqF366ZsqZ829L6KcSqSUDFkM-KceSuDrqaEX71iIm0ejJPCD9d-0T1gbtWauy_uT-2t7-qxeaYzWFdcETcWyl-PXRJV2zCWBkkpduycFY3AXbIK9mSX9ukRZD0NoOe_h29OUvLAw_mt7pwSojcVe"
              width={320}
              height={320}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

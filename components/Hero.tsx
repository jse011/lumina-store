import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="home">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 text-center md:text-left mt-10 md:mt-0">
          <h1 className="font-display text-4xl md:text-7xl text-white leading-none font-bold">
            La magia de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tertiary to-secondary">volver a verlos</span>
          </h1>

          <p className="text-base md:text-lg text-on-surface-variant max-w-lg mx-auto md:mx-0">
            Transformamos tus fotos más queridas en proyecciones eternas llenas de vida. Inmortaliza a tus seres queridos, mascotas y momentos especiales con tecnología holográfica.
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                className="bg-[#25D366] text-white font-bold px-8 md:px-10 py-4 rounded-xl flex items-center gap-2 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)] transition-all uppercase tracking-widest text-[10px] md:text-xs"
                href="https://wa.me/yournumber?text=Hola,%20quiero%20hablar%20con%20un%20asesor%20para%20mi%20pedido"
              >
                Hablar por WhatsApp <span className="material-symbols-outlined">chat</span>
              </a>
              <a
                className="glass-panel text-white font-bold px-6 md:px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all uppercase tracking-widest text-[10px] md:text-xs"
                href="#access"
              >
                Acceder con mi Código
              </a>
            </div>

            <p className="text-[10px] md:text-[11px] text-slate-400 font-medium tracking-wide leading-relaxed">
              Atención personalizada por WhatsApp | Entrega física con tarjeta de acceso | Experiencia digital con código único
            </p>
          </div>
        </div>

        <div className="relative group max-w-md mx-auto md:max-w-none">
          <div className="absolute -inset-4 bg-gradient-to-tr from-tertiary/20 to-secondary/20 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
          <div className="relative rounded-3xl overflow-hidden glass-panel border border-tertiary/30 p-4 shadow-2xl">
            <Image
              alt="Cubo holográfico"
              className="w-full aspect-square object-cover rounded-2xl"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCizT8KMymZYFPST2bW64Blm1vPuE_ZoOIW6xL8Gi-Rg9RyqtsLkfOacffHFlCztkGAzWyNrEhUaY0PT_p4ZaYDlWcZSD4kRftvzaBQgflzQN1XvqGUCH9wTpfwGsYlGUD3hsngSabwJcm4fPZLrT9xjluP-uB8Wh6fEyYPcIpuNmTkM9fPyAC4AxFanckp6q55qB_A4jiWdtJgdx1xhOsiPQ6pYP04zjFxuXgH0UvDIiaHqOE5KzedldTaQ39-JgnGVuLCtGdTPB-h"
              width={600}
              height={600}
              priority
            />
            <div className="absolute inset-0 scan-line pointer-events-none opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
}


import Image from 'next/image';

export default function Delivery() {
  return (
    <section className="py-xl" id="entrega">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="glass-panel rounded-3xl p-md md:p-lg flex flex-col md:flex-row items-center gap-lg border-cyan-400/20 relative overflow-hidden">
          <div className="absolute -left-12 -top-12 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="md:w-1/2 relative z-10">
            <h2 className="font-headline-lg text-white mb-md">Recibe tu magia en casa</h2>
            <p className="font-body-lg text-on-surface-variant mb-md">
              Entrega en 2 a 4 días en Lima y envíos a todo el Perú. Cada recuerdo es embalado con tecnología de protección premium.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-md mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary" aria-hidden="true">
                  local_shipping
                </span>
                <span className="font-label-sm text-white">Seguimiento Real</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary" aria-hidden="true">
                  verified
                </span>
                <span className="font-label-sm text-white">Seguridad Total</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full h-64 rounded-2xl overflow-hidden shadow-2xl relative">
            <Image
              alt="Primer plano de una mano enguantada sosteniendo un paquete holográfico brillante"
              className="object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1lyVo05lYKkIO3meVufC0yR9NTTcTuWj_2jIgQUrRQcab4lGnMeEbqC6duCoeVzxClQ4O6imfsLzfljOyHBsQG4o3UmAxYuSAPyz-dqXxgtSYKm2TrzymbhfBtkO38SrVmSjZbw6gRbaBUvQI1JEitvQv2CF2VZesMpLlLhyyFqpcX2R-jtfp_2ROn1BxYSSWF5KiJzfVT8GP0FjI7oaBTrhr9_bfB3NiO0VYimZ-chMwNPCdfGr9XPYAbm9i-mV-DquDdSfK3d63"
              fill
            />
          </div>
        </div>
      </div>
    </section>
  );
}

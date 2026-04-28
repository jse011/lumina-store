import { PROCESS_STEPS } from '@/data/mock';
import Link from 'next/link';

export default function Process() {
  return (
    <section className="py-24 bg-surface/30 border-y border-tertiary/10" id="process">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="font-display text-tertiary uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold block">Simple y Personalizado</span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium">Cómo crear tu recuerdo</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step) => {
            const Content = (
              <>
                <div className={`absolute -right-4 -top-4 text-white/5 font-display text-7xl md:text-8xl font-bold group-hover:text-${step.color === 'tertiary' ? 'tertiary' : 'secondary'}/10 transition-colors`}>
                  {step.id}
                </div>
                <div className={`${step.color === 'tertiary' ? 'text-tertiary' : 'text-secondary'} font-display text-[10px] md:text-xs font-bold uppercase tracking-widest relative z-10`}>
                  Paso {step.id}
                </div>
                <h3 className="text-lg md:text-xl text-white font-bold relative z-10">{step.title}</h3>
                <p className="text-on-surface-variant text-xs md:text-sm relative z-10 leading-relaxed">{step.description}</p>
              </>
            );

            const containerClasses = `glass-panel p-8 rounded-3xl space-y-4 border-l-4 relative overflow-hidden group transition-all ${
              step.color === 'tertiary' ? 'border-l-tertiary' : 'border-l-secondary'
            }`;

            if (step.href) {
              return (
                <Link key={step.id} href={step.href} className={`${containerClasses} block hover:bg-white/5`}>
                  {Content}
                </Link>
              );
            }

            return (
              <div key={step.id} className={containerClasses}>
                {Content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

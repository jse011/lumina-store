import { TESTIMONIALS } from '@/data/mock';

export default function Testimonials() {
  return (
    <section className="py-xl bg-surface-container-lowest/50" id="historias">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="font-headline-lg text-white text-center mb-xl">Historias Inmortales</h2>
        <div className="grid md:grid-cols-3 gap-md">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`glass-panel p-md rounded-xl relative ${
                testimonial.type === 'violet' ? 'border-t-2 border-t-violet-400/30' : ''
              }`}
            >
              <span
                className={`material-symbols-outlined absolute top-4 right-4 text-6xl ${
                  testimonial.type === 'tertiary' ? 'text-tertiary/20' : 'text-violet-400/20'
                }`}
                aria-hidden="true"
              >
                format_quote
              </span>
              <p className="font-body-lg text-white mb-md italic">{testimonial.quote}</p>
              <div className="flex items-center gap-base">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    testimonial.type === 'tertiary' ? 'bg-tertiary/20 text-tertiary' : 'bg-violet-400/20 text-violet-400'
                  }`}
                >
                  {testimonial.initial}
                </div>
                <div>
                  <p className="font-label-sm text-white">{testimonial.name}</p>
                  <p className="text-xs text-on-surface-variant">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

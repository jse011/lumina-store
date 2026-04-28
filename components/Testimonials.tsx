import Image from 'next/image';
import { GALLERY_IMAGES } from '@/core/constants';
import { FirebaseTestimonialRepository } from '@/core/infrastructure/firebase/repositories';

export default async function Testimonials() {
  const testimonialRepo = new FirebaseTestimonialRepository();
  const testimonials = await testimonialRepo.getTestimonials();

  return (
    <section className="py-24" id="stories">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="font-display text-tertiary uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold block">Historias de Luz</span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium">Galería de Memorias</h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {GALLERY_IMAGES.map((img, idx) => (
            <div 
              key={idx} 
              className={`aspect-[3/4] rounded-2xl overflow-hidden glass-panel border-white/10 group ${
                idx % 2 !== 0 ? 'md:translate-y-8' : ''
              }`}
            >
              <Image 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-105" 
                src={img} 
                alt={`Galería de memoria ${idx + 1}`}
                width={300}
                height={400}
              />
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl md:text-4xl text-white mb-16 text-center font-bold italic">
          "Historias que siguen brillando"
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="glass-panel p-8 rounded-3xl space-y-6 border border-white/5 hover:border-white/10 transition-all"
            >
              <p className="text-on-surface-variant italic font-medium text-sm leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${testimonial.type === 'cyan' ? 'bg-tertiary/20' : 'bg-secondary/20'}`}></div>
                <div>
                  <p className="text-white font-bold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


import { FirebaseTestimonialRepository } from '@/core/infrastructure/firebase/repositories';

export default async function Testimonials() {
  const testimonialRepo = new FirebaseTestimonialRepository();

  const testimonials = await testimonialRepo.getTestimonials();

  return (
    <section className="py-24" id="stories">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
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


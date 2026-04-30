import Image from 'next/image';
import { FirebaseGalleryRepository } from '../../data/firebase';

export default async function Gallery() {
  const galleryRepo = new FirebaseGalleryRepository();
  const galleryImagesFromFirebase = await galleryRepo.getGalleryImages();

  const galleryImages = galleryImagesFromFirebase?.length > 0 ? galleryImagesFromFirebase : [];

  return (
    <section className="py-24" id="gallery">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="font-display text-tertiary uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold block">Historias de Luz</span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium">Galería de Memorias</h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className={`aspect-[3/4] rounded-2xl overflow-hidden glass-panel border-white/10 group ${idx % 2 !== 0 ? 'md:translate-y-8' : ''
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
      </div>
    </section>
  );
}

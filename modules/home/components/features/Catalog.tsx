import { FirebaseProductRepository, FirebaseSettingsRepository } from '../../data/firebase';
import ProductCard from './ProductCard';

export default async function Catalog() {
  const productRepo = new FirebaseProductRepository();
  const settingsRepo = new FirebaseSettingsRepository();

  const [products, settings] = await Promise.all([
    productRepo.getProducts(),
    settingsRepo.getSettings()
  ]);

  return (
    <section className="md:py-24 md:max-w-7xl md:mx-auto md:px-8" id="catalog">
      {/* Header ajustado al contenido en móvil */}
      <div className="w-full py-12 md:py-0 md:h-auto flex flex-col px-4 md:px-0 md:mb-16 relative">
        <div className="space-y-4 text-center md:text-left">
          <span className="font-display text-secondary uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold block">Catálogo de Eternidad</span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium">Colección de Memorias</h2>
          <div className="text-tertiary font-medium text-sm max-w-xs mx-auto md:mx-0 md:text-right md:absolute md:top-0 md:right-0 italic opacity-80 md:opacity-100">
            "Honramos el vínculo eterno con tu familia y tus compañeros de cuatro patas."
          </div>
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:overflow-visible">
        {products.map((product) => (
          <div key={product.id} className="w-full h-[100dvh] md:h-auto flex-shrink-0">
            <ProductCard
              product={product}
              whatsappNumber={settings.whatsappNumber}
              whatsappMessageTemplate={settings.whatsappProductMessage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

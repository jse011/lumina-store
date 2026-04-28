import { FirebaseProductRepository, FirebaseSettingsRepository } from '@/core/infrastructure/firebase/repositories';
import ProductCard from './ProductCard';

export default async function Catalog() {
  const productRepo = new FirebaseProductRepository();
  const settingsRepo = new FirebaseSettingsRepository();
  
  const [products, settings] = await Promise.all([
    productRepo.getProducts(),
    settingsRepo.getSettings()
  ]);

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 md:px-8" id="catalog">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="space-y-4 text-center md:text-left w-full md:w-auto">
          <span className="font-display text-secondary uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold block">Catálogo de Eternidad</span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium">Colección de Memorias</h2>
        </div>
        <div className="text-tertiary font-medium text-sm max-w-xs text-right hidden md:block italic">
          "Honramos el vínculo eterno con tu familia y tus compañeros de cuatro patas."
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            whatsappNumber={settings.whatsappNumber} 
            whatsappMessageTemplate={settings.whatsappProductMessage}
          />
        ))}
      </div>
    </section>
  );
}


import Image from 'next/image';
import { PRODUCTS } from '@/data/mock';

export default function Catalog() {
  return (
    <section className="py-xl max-w-7xl mx-auto px-4 md:px-6" id="catalogo">
      <div className="text-center mb-xl">
        <h2 className="font-headline-lg text-white mb-base">Nuestra Colección</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto rounded-full"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-lg">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className={`glass-panel p-md rounded-xl group transition-all ${
              product.tag?.type === 'popular' ? 'hover:border-cyan-400/30' : 'hover:border-violet-400/30'
            }`}
          >
            <div className="aspect-video mb-md overflow-hidden rounded-lg relative">
              <Image
                alt={product.name}
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                src={product.imageUrl}
                fill
              />
              <div className="absolute inset-0 scan-line pointer-events-none opacity-20"></div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-base gap-2">
              <div>
                <h3 className="font-headline-md text-white">{product.name}</h3>
                <p className="font-body-md text-on-surface-variant">{product.price}</p>
              </div>
              {product.tag && (
                <span
                  className={`${
                    product.tag.type === 'popular'
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'bg-surface-container-high text-tertiary'
                  } px-3 py-1 rounded-full text-label-sm`}
                >
                  {product.tag.label}
                </span>
              )}
            </div>
            <p className="font-body-md text-on-surface-variant mb-md">{product.description}</p>
            <button
              className={`w-full py-md border rounded-lg font-label-sm transition-all flex justify-center items-center gap-2 ${
                product.tag?.type === 'popular'
                  ? 'border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-on-primary'
                  : 'border-violet-400/50 text-violet-400 hover:bg-violet-400 hover:text-white'
              }`}
            >
              Hablar por WhatsApp
              <span className="material-symbols-outlined" aria-hidden="true">
                send
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

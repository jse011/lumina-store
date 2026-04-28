"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/mock';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handleImageChange = (index: number) => {
    if (index === currentImageIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsFading(false);
    }, 150);
  };

  const scrollThumbnails = (direction: 'left' | 'right') => {
    const container = document.getElementById(`thumbnails-${product.id}`);
    if (container) {
      const scrollAmount = direction === 'left' ? -80 : 80;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="group relative h-full">
      <div className="relative glass-panel rounded-3xl overflow-hidden p-6 space-y-6 flex flex-col h-full border border-tertiary/10 hover:border-tertiary/30 transition-all">
        <div className="space-y-4">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl relative bg-black/40">
            <Image
              alt={product.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${isFading ? 'opacity-40' : 'opacity-100'}`}
              src={product.images[currentImageIndex]}
              width={800}
              height={600}
            />
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md border border-tertiary/30 px-4 py-1 rounded-full text-tertiary font-bold text-sm">
              {product.price}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="relative flex items-center group/nav">
            <button 
              className="absolute -left-2 z-10 bg-background/90 text-tertiary p-2 rounded-full border border-tertiary/40 hover:bg-tertiary/30 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              onClick={() => scrollThumbnails('left')}
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </button>
            
            <div 
              id={`thumbnails-${product.id}`}
              className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth px-10 py-2 w-full justify-start"
            >
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === idx 
                      ? 'border-tertiary shadow-[0_0_10px_rgba(0,219,231,0.3)]' 
                      : 'border-white/10 hover:border-tertiary/50'
                  }`}
                  onClick={() => handleImageChange(idx)}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} width={64} height={64} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <button 
              className="absolute -right-2 z-10 bg-background/90 text-tertiary p-2 rounded-full border border-tertiary/40 hover:bg-tertiary/30 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              onClick={() => scrollThumbnails('right')}
            >
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </button>
            
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-display text-slate-500 font-bold tracking-widest bg-background px-2">
              {currentImageIndex + 1} / {product.images.length}
            </div>
          </div>
        </div>

        <div className="space-y-4 flex-grow">
          <h3 className="font-display text-2xl text-white font-medium">{product.name}</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed">{product.description}</p>
          <div className="space-y-2 pt-2 border-t border-white/5">
            <p className="text-xs text-tertiary/80 leading-relaxed italic">{product.italicLabel}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 pt-4">
          <a 
            className="bg-gradient-to-r from-tertiary to-secondary text-on-primary font-display font-bold py-4 rounded-xl transition-all uppercase tracking-widest text-xs text-center flex items-center justify-center hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] active:scale-95" 
            href={`https://wa.me/yournumber?text=Hola,%20quiero%20iniciar%20mi%20pedido%20del%20${product.name}`}
          >
            INICIAR PEDIDO POR WHATSAPP
          </a>
        </div>
      </div>
    </div>
  );
}

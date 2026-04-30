"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '../../models';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
  whatsappNumber: string;
  whatsappMessageTemplate: string;
}

export default function ProductCard({ product, whatsappNumber, whatsappMessageTemplate }: ProductCardProps) {
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
            <Badge variant="price" className="absolute top-4 right-4">
              {product.price}
            </Badge>
          </div>

          {/* Thumbnails */}
          <div className="relative flex items-center group/nav">
            <Button
              variant="icon"
              className="absolute -left-2 z-10"
              onClick={() => scrollThumbnails('left')}
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </Button>

            <div
              id={`thumbnails-${product.id}`}
              className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth px-10 py-2 w-full justify-start"
            >
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === idx
                    ? 'border-tertiary shadow-[0_0_10px_rgba(0,219,231,0.3)]'
                    : 'border-white/10 hover:border-tertiary/50'
                    }`}
                  onClick={() => handleImageChange(idx)}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} width={64} height={64} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <Button
              variant="icon"
              className="absolute -right-2 z-10"
              onClick={() => scrollThumbnails('right')}
            >
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </Button>

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
          <Button
            as="a"
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessageTemplate.replace('{productName}', product.name))}`}
            className="w-full"
          >
            INICIAR PEDIDO POR WHATSAPP
          </Button>
        </div>
      </div>
    </div>
  );
}

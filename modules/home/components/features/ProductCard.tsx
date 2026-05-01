"use client";

import { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Product } from '../../models';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { GoogleDriveUtils } from '@/core/utils/GoogleDriveUtils';

interface ProductCardProps {
  product: Product;
  whatsappNumber: string;
  whatsappMessageTemplate: string;
}

export default function ProductCard({ product, whatsappNumber, whatsappMessageTemplate }: ProductCardProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Consolidar imágenes y videos (asumimos que product.images puede contener IDs de ambos)
  const mediaList = useMemo(() => product.images || [], [product.images]);
  const currentMedia = mediaList[currentMediaIndex];
  const isVideo = GoogleDriveUtils.isVideo(currentMedia);

  const resolveUrl = (id: string) => {
    if (GoogleDriveUtils.isVideo(id)) return GoogleDriveUtils.getVideoUrl(id);
    return GoogleDriveUtils.getImageUrl(id);
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentMediaIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full h-[100dvh] md:h-[650px] md:max-w-[360px] md:mx-auto md:rounded-[2rem] md:shadow-2xl overflow-hidden bg-black group">
      
      {/* Media Layer */}
      <div className="absolute inset-0 z-0" onClick={togglePlay}>
        {isVideo ? (
          <video
            ref={videoRef}
            src={resolveUrl(currentMedia)}
            className="w-full h-full object-cover"
            loop
            muted={isMuted}
            playsInline
            autoPlay
          />
        ) : (
          <Image
            src={resolveUrl(currentMedia)}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        )}
        
        {/* Play/Pause Overlay Icon */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10 pointer-events-none">
            <span className="material-symbols-outlined text-white text-8xl opacity-70 animate-pulse">play_arrow</span>
          </div>
        )}
      </div>

      {/* Top Overlay: Title and Price */}
      <div className="absolute top-0 left-0 right-0 p-6 pt-12 md:pt-8 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-tertiary text-[10px] font-bold tracking-[0.2em] uppercase opacity-90">Lumina Store</span>
            <h3 className="text-white font-display text-lg font-medium">{product.name}</h3>
          </div>
          <Badge variant="price" className="backdrop-blur-md bg-white/10 border-white/20">
            {product.price}
          </Badge>
        </div>
      </div>

      {/* Right Side: Action Icons (Like TikTok) */}
      <div className="absolute right-4 bottom-40 flex flex-col gap-6 z-30">
        <button 
          onClick={toggleMute}
          className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white border-white/20 hover:scale-110 transition-transform"
        >
          <span className="material-symbols-outlined text-2xl">
            {isMuted ? 'volume_off' : 'volume_up'}
          </span>
        </button>
        
        <button className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white border-white/20 hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-2xl">share</span>
        </button>
      </div>

      {/* Bottom Overlay: Info and Main Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20">
        <div className="space-y-4">
          
          {/* Thumbnails superpuestos */}
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            {mediaList.map((media, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentMediaIndex(idx);
                }}
                className={`flex-shrink-0 w-12 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  currentMediaIndex === idx 
                  ? 'border-tertiary scale-110' 
                  : 'border-white/20 opacity-60 hover:opacity-100'
                }`}
              >
                {GoogleDriveUtils.isVideo(media) ? (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xs">videocam</span>
                  </div>
                ) : (
                  <Image 
                    src={GoogleDriveUtils.getImageUrl(media)} 
                    alt="thumbnail" 
                    width={48} 
                    height={64} 
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>

          <p className="text-white/80 text-xs line-clamp-2 md:line-clamp-3 mb-2">{product.description}</p>
          <p className="text-tertiary/90 text-[10px] italic mb-4">{product.italicLabel}</p>
          
          <Button
            as="a"
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessageTemplate.replace('{productName}', product.name))}`}
            className="w-full py-4 text-xs font-bold tracking-widest backdrop-blur-xl bg-tertiary/90 hover:bg-tertiary shadow-[0_0_20px_rgba(0,219,231,0.3)]"
          >
            INICIAR PEDIDO POR WHATSAPP
          </Button>
        </div>
      </div>

      {/* Strategy for Horizontal Mobile: Blur background */}
      <div className="hidden landscape:md:hidden landscape:block absolute inset-0 -z-10 bg-slate-900">
         <div className="absolute inset-0 opacity-30 blur-2xl">
            <Image src={resolveUrl(currentMedia)} alt="bg-blur" fill className="object-cover" />
         </div>
      </div>
    </div>
  );
}


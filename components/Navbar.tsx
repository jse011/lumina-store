"use client";

import Link from 'next/link';
import { NAV_ITEMS } from '../data/mock';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [activeId, setActiveId] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      let currentActiveId = 'inicio';
      
      const sectionElements = NAV_ITEMS.map(item => {
        const targetId = item.href.startsWith('#') ? item.href.substring(1) : item.id;
        return {
          id: item.id,
          element: document.getElementById(targetId)
        };
      }).filter(section => section.element !== null);

      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 100) {
            currentActiveId = section.id;
          }
        }
      }

      setActiveId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-[20px] border-b border-tertiary/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]">
      <nav className="flex justify-between items-center w-full px-4 md:px-8 h-20 max-w-7xl mx-auto">
        <Link href="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent font-display tracking-tight">
          Lumina Recuerdos
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeId;
            return (
              <Link
                key={item.id}
                className={`font-display uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold transition-all ${
                  isActive 
                    ? "text-tertiary drop-shadow-[0_0_8px_rgba(0,219,231,0.5)]" 
                    : "text-slate-400 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <Link 
            className="hidden sm:block font-display uppercase tracking-[0.2em] text-[10px] font-bold text-tertiary hover:text-white transition-all border border-tertiary/30 px-4 py-2 rounded-full" 
            href="#access"
          >
            Ver mi Recuerdo
          </Link>
          <a 
            className="bg-gradient-to-r from-tertiary to-secondary px-6 py-2 rounded-full text-on-primary font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all active:scale-95 text-[10px] md:text-xs" 
            href="https://wa.me/yournumber?text=Hola,%20necesito%20información%20sobre%20Lumina%20Recuerdos"
          >
            Conectar
          </a>
        </div>
      </nav>
    </header>
  );
}


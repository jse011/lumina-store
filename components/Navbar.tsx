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
        const targetId = item.href === '#' ? item.id : item.href.substring(1);
        return {
          id: item.id,
          element: document.getElementById(targetId)
        };
      }).filter(section => section.element !== null);

      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          // Adjust threshold to better detect when section is in view
          if (rect.top <= 150) {
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
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#050B18]/80 backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      <div className="flex justify-between items-center px-4 md:px-6 py-4 max-w-7xl mx-auto gap-4">
        <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent font-display tracking-tight">
          Lumina Recuerdos
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeId;
            return (
              <Link
                key={item.id}
                className={
                  isActive
                    ? "text-cyan-400 border-b-2 border-cyan-400 pb-1 font-display tracking-tight"
                    : "text-slate-400 hover:text-white transition-colors font-display tracking-tight"
                }
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-white px-4 md:px-6 py-2 rounded-full font-label-sm uppercase tracking-wider hover:scale-95 transition-transform active:scale-90 shadow-[0_0_15px_rgba(34,211,238,0.3)] whitespace-nowrap">
          WhatsApp
        </button>
      </div>
    </nav>
  );
}

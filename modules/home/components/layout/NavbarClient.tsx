"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { AppSettings } from '../../models';
import { NavItem } from '../../types';
import { useAuth } from '@/core/providers/AuthContext';

interface NavbarClientProps {
  navItems: NavItem[];
  settings: AppSettings;
}

export default function NavbarClient({ navItems, settings }: NavbarClientProps) {
  const [activeId, setActiveId] = useState('inicio');
  const { isAuthorized, logout } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Umbral de 5px para evitar micro-movimientos
      if (Math.abs(currentScrollY - lastScrollY.current) < 5) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false); // Bajando
      } else {
        setIsVisible(true); // Subiendo
      }
      
      lastScrollY.current = currentScrollY;

      // Lógica de Active Section
      let currentActiveId = 'inicio';
      const sectionElements = navItems.map(item => {
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <header className={`fixed top-0 w-full z-50 bg-background/70 backdrop-blur-[20px] border-b border-tertiary/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] transition-transform duration-500 ease-in-out md:translate-y-0 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="flex justify-between items-center w-full px-4 md:px-8 h-20 max-w-7xl mx-auto">
        <Link href="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent font-display tracking-tight">
          Lumina Recuerdos
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = item.id === activeId;
            return (
              <Link
                key={item.id}
                className={`font-display uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold transition-all ${isActive
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
          {isAuthorized ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 border border-red-500/40 text-red-400 hover:bg-red-500/10 px-5 py-2 rounded-full font-display font-bold uppercase tracking-widest transition-all active:scale-95 text-[10px] md:text-xs"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              Cerrar Sesión
            </button>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </header>
  );
}

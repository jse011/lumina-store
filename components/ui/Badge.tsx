import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  icon?: string;
  variant?: 'status' | 'price';
  className?: string;
}

export default function Badge({ children, icon, variant = 'status', className = '' }: BadgeProps) {
  const baseStyles = "inline-flex items-center gap-2 font-display font-bold uppercase tracking-widest";
  
  const variants = {
    status: "px-4 py-1.5 rounded-full glass-panel border border-tertiary/30 text-white text-[10px] tracking-[0.2em]",
    price: "bg-background/80 backdrop-blur-md border border-tertiary/30 px-4 py-1 rounded-full text-tertiary text-sm"
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {icon && <span className="material-symbols-outlined text-tertiary text-sm">{icon}</span>}
      {children}
    </div>
  );
}

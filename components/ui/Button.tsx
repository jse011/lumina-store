import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'social' | 'icon';
  className?: string;
  as?: 'button' | 'a';
} & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({ children, variant = 'primary', className = '', as = 'button', ...props }: ButtonProps) {
  const baseStyles = "font-display font-bold transition-all uppercase tracking-widest text-xs flex items-center justify-center cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-tertiary to-secondary text-on-primary py-4 px-10 rounded-xl hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]",
    social: "w-full bg-white text-background py-4 px-10 rounded-xl hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    icon: "bg-background/90 text-tertiary p-2 rounded-full border border-tertiary/40 hover:bg-tertiary/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
  };

  const selectedVariant = variants[variant] || variants.primary;
  const combinedClassName = `${baseStyles} ${selectedVariant} ${className}`;

  if (as === 'a') {
    return (
      <a className={combinedClassName} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button 
      className={combinedClassName}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}


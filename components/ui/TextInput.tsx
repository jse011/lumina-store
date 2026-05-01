import { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'code';
  className?: string;
}

export default function TextInput({ variant = 'code', className = '', ...props }: TextInputProps) {
  const baseStyles = "bg-transparent border-0 focus:ring-0 text-white outline-none transition-opacity";
  
  const variants = {
    code: "flex-grow px-6 py-4 placeholder:text-slate-500 font-display tracking-[0.2em] text-center sm:text-left"
  };

  return (
    <input 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  tag?: {
    label: string;
    type: 'popular' | 'exclusive';
  };
}

export interface Testimonial {
  id: string;
  quote: string;
  initial: string;
  name: string;
  location: string;
  type: 'tertiary' | 'violet';
}

export const PRODUCTS: Product[] = [
  {
    id: 'cubo-holografico',
    name: 'Cubo Holográfico',
    price: 'Desde S/120',
    description: 'La pieza perfecta para tu escritorio. Un prisma de cristal que proyecta profundidad cinemática.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZrctvOPRx0sOeg9lC-iqy8zrPgMckni-r3zPwPbO39Oi79Tnr6Ep2dlrI8sqju4h1aMhmk-bGm3_gdIwyf1bRX2s_Fr7R7QelQ8VXPAAWPt7C0Lofgw5N6JHyzQQqynbMWsGEhddx8GT22NlKoIMYdIuGYxGgFKPn-EMLOI4TFvf8eobEbfa5_r1M1cX8-qB7CXwuThm9eDUuHJGhIFGjkUSEBo2LbtmhFsmm49zBeb7xkIcSsNONVamtew7vAYChajVwLw6BLPxo',
    tag: {
      label: 'POPULAR',
      type: 'popular',
    },
  },
  {
    id: 'esfera-recuerdos',
    name: 'Esfera de Recuerdos',
    price: 'Desde S/160',
    description: 'Visión de 360 grados. Una burbuja de tiempo que captura la esencia de tus mejores momentos.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWMt3CXlPSSUwDfrBKwoN9ANo1vq0LuIajQh7rGjC_NjFEAfpSP8FwgMWdXNkdquuMFeaXtuVfGqzKFVAHW0wkhFYodoTtFRo1Jr813G-eDO_FPpRDRcytAhjGI5zFXgnznlyLNmLW2ycM6hDJjE8BPd5M7dau93z5W4HemtQal0_0TaUn4MMAawr1NnaL7Dt1XgjweslNXwgP5U_hmre-U1bvDStOLnfBXkAgDJGXnR2rR79IoJ_8x14Ws7fC1MC1IuqozZ5pJFSu',
    tag: {
      label: 'EXCLUSIVO',
      type: 'exclusive',
    },
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: '"Parece que mi abuelo está aquí de nuevo. El detalle es increíble, es como tenerlo presente."',
    initial: 'M',
    name: 'María R.',
    location: 'Lima, Perú',
    type: 'tertiary',
  },
  {
    id: '2',
    quote: '"Fue el regalo perfecto para nuestro aniversario. Ver el video de nuestra boda en 3D nos conmovió."',
    initial: 'J',
    name: 'Jorge P.',
    location: 'Arequipa, Perú',
    type: 'violet',
  },
  {
    id: '3',
    quote: '"La calidad de la esfera es impresionante. El envío a Trujillo llegó perfecto y muy rápido."',
    initial: 'S',
    name: 'Sofía L.',
    location: 'Trujillo, Perú',
    type: 'tertiary',
  },
];

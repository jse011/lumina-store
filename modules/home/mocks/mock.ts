export const APP_VERSION = '1.0.3';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

export const NAV_ITEMS: any[] = [
  { id: 'inicio', label: 'Inicio', href: '#home', order: 1, isActive: true },
  { id: 'catalogo', label: 'Catálogo', href: '#catalog', order: 2, isActive: false },
  { id: 'proceso', label: 'Proceso', href: '#process', order: 3, isActive: false },
  { id: 'historias', label: 'Historias', href: '#stories', order: 4, isActive: false },
  { id: 'entrega', label: 'Entrega', href: '#delivery', order: 5, isActive: false },
];

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  italicLabel: string;
  images: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  type: 'cyan' | 'violet';
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  color: 'tertiary' | 'secondary';
  href?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'cubo-holografico',
    name: 'Cubo Holográfico',
    price: 'Desde S/120',
    description: 'Cristal templado con proyección de 4 caras. Ideal para retratos familiares o de tus mascotas en tu lugar favorito.',
    italicLabel: 'Preserva el brillo de su mirada para siempre.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAxowtiC15no05003R8SPedxrBvQyI7bBSTDerk26ageqF7A9UYlsErIGcGE5Y0x8bkwnR24-TIN041BjPzRxaxL8nHaXbC8fbXxpoUqgQZdBd8D2xS0BFx-pU3knAX8AyEVM-LC5n-6LeceDjGPcQ-_8kwLs6NZcDdfFf5iABbTr5NXG9QHCAJODu4XMsG9N4Al0WJbDXaWt_2Z0KOFaY3h_MrbpLPO977-DZidBb0ff-rMerkZxmVZPCtVvNwBORByR2PpJ8Ugbpm',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCI-zzaQ30XygmncwAoaC0Fa1ZkVeR-wytTm2lFfh0bPqqz9faZ5mDKMq6X4th_OW373r5DZTRAO2EdL5swbuTr4GITy6j-jtc4_Bh4ewo0oWDSjrwrGe048-jDRlZgyBUb0F5mhvambK9P1EXNC-XEf7wpF6fZIWNHzlybGqsQvWMcTNbG39gha5gkmd83ZlbkoHZ6Ltk4NfNDQWLJp4wMiZoUbfr7G4rVd4dr2soWapBFQktitw2WdDtWG6n2ZwJQFQBo1qv5pMVf',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWk62fKt9yCEEiSRR5akMaouS4nuN_ml0kHVH3HAozIjNI7ILzeLU61JumezRbnLHvLC0SGHTutDtMYWSbX69daIoqBRhFPXMYI_A6pIutSE3E6cWGAJkm3MLzMnEWSxE_pgM5j9Gz190jXGhPitF4wLiFzQwpKtoS_S8yfBOSxsguKalwvhpNVoc0iww9hJuu5kNvq1TCV6tslp1l342WI4RV70oF7uN3xYfMgRy74FT3jWarQz5hCCjZi2s7hyJxkXSPtGSTS9ID',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA_RTDWsCviZZMOW7-6UIPCQ4qtA8DJYsnEqUR-sClsvXbcXUpGbCBIYg9bWho_DlcGLYdSnrs6WGpBdGkMnxQ9zwQvbZjs43ckx3e9e7-6yMMC51M7TIaBELZtjiJ-isVne0PwbbDgvNu3raj1E7W6CwQuuwnmNEphMWCDGanW1WGvUOB9UEp3pwARPniZX62dOD_PMn_Up-dwr9oIXJf0SOHjGApRj9OdJHGAFTyGJX-rrpuGUDwv5Zsqso9JU6p1tBUpI2B0JsTG'
    ]
  },
  {
    id: 'esfera-recuerdos',
    name: 'Esfera de Recuerdos',
    price: 'Desde S/160',
    description: 'Diseño orgánico con proyección envolvente de 360 grados. Una pieza de arte que mantiene viva la presencia de quienes ya no están.',
    italicLabel: 'Un refugio de luz para tus recuerdos más hermosos.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBMq8sXraLNG5vn8aNlPUcnF0I5y3-YWQop6qmKEu3px6suQitzgXpfb79l2tvyaugNa934ymXuZLWrOY3VvZNyIxTY_OGlfrZpNohd7684lCxyg4c94BKIqH8LfY0HmjDFSrdC2wKmZqaUzxkOvqNjaIHApyMS45ZYtelbYj8xgZttcPDuP5iSdm_8CC9C6Eu1ZuLL629_U-nH3NPGEPLwGpgljGh9g5Q4mE4bxMWyuJP65bAQyDlZyG91T_kHhDMcJ5ksm60GJWun',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCizT8KMymZYFPST2bW64Blm1vPuE_ZoOIW6xL8Gi-Rg9RyqtsLkfOacffHFlCztkGAzWyNrEhUaY0PT_p4ZaYDlWcZSD4kRftvzaBQgflzQN1XvqGUCH9wTpfwGsYlGUD3hsngSabwJcm4fPZLrT9xjluP-uB8Wh6fEyYPcIpuNmTkM9fPyAC4AxFanckp6q55qB_A4jiWdtJgdx1xhOsiPQ6pYP04zjFxuXgH0UvDIiaHqOE5KzedldTaQ39-JgnGVuLCtGdTPB-h',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkR2AGiXrMv8RF7lUnEoqasrplhOnF-ETYiwvUVZfcCVLxX0QzdYyJ0FusFu8jrzAs4kEVakitJ8nUGJSFXrv3i-w2C1CMvG9ff7Tpn-yLEeLxldtqjO48voU-5H3w6gIga7MeQc1STT5-ZVuIxX2gFJIOzoW16cVBWC4l-KE25yDQo2jeVwZmFQrJjSV73lvwht_EpY8swgu2gD4sC1s90oYVzfrmUDL6OWgm-6O-zaynk2RZShS8Nxb5RbdB0Q6-dh_lFLOR37BZ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA_RTDWsCviZZMOW7-6UIPCQ4qtA8DJYsnEqUR-sClsvXbcXUpGbCBIYg9bWho_DlcGLYdSnrs6WGpBdGkMnxQ9zwQvbZjs43ckx3e9e7-6yMMC51M7TIaBELZtjiJ-isVne0PwbbDgvNu3raj1E7W6CwQuuwnmNEphMWCDGanW1WGvUOB9UEp3pwARPniZX62dOD_PMn_Up-dwr9oIXJf0SOHjGApRj9OdJHGAFTyGJX-rrpuGUDwv5Zsqso9JU6p1tBUpI2B0JsTG'
    ]
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: '"Poder ver a mi abuelo sonreír de nuevo en mi escritorio no tiene precio. Es un puente emocional que no creí posible."',
    name: 'María R.',
    location: 'Lima, Perú',
    type: 'cyan',
  },
  {
    id: '2',
    quote: '"Inmortalizar a mi fiel compañero en la esfera fue sanador. Es como si una parte de su luz siguiera aquí cada noche."',
    name: 'Juan P.',
    location: 'Arequipa, Perú',
    type: 'violet',
  },
  {
    id: '3',
    quote: '"El regalo más significativo que he dado. Ver a mi esposa emocionada ante el holograma de nuestra boda fue único."',
    name: 'Carlos M.',
    location: 'Trujillo, Perú',
    type: 'cyan',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Elige tu recuerdo',
    description: 'Explora nuestros productos y ejemplos para decidir cómo quieres inmortalizar ese momento especial.',
    color: 'tertiary',
  },
  {
    id: 2,
    title: 'Escríbenos',
    description: 'Háblanos por WhatsApp. Te ayudamos a elegir el mejor formato y a seleccionar la foto ideal para tu recuerdo.',
    color: 'secondary',
  },
  {
    id: 3,
    title: 'Recibe tu producto',
    description: 'Te entregamos el cubo o esfera listo para usar en la comodidad de tu hogar, con envío seguro a todo el Perú.',
    color: 'tertiary',
  },
  {
    id: 4,
    title: 'Activa tu experiencia',
    description: 'Usa el código de tu tarjeta de acceso para ingresar y visualizar tu recuerdo holográfico en tu nuevo dispositivo.',
    color: 'secondary',
    href: '#access',
  },
];

export const GALLERY_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCI-zzaQ30XygmncwAoaC0Fa1ZkVeR-wytTm2lFfh0bPqqz9faZ5mDKMq6X4th_OW373r5DZTRAO2EdL5swbuTr4GITy6j-jtc4_Bh4ewo0oWDSjrwrGe048-jDRlZgyBUb0F5mhvambK9P1EXNC-XEf7wpF6fZIWNHzlybGqsQvWMcTNbG39gha5gkmd83ZlbkoHZ6Ltk4NfNDQWLJp4wMiZoUbfr7G4rVd4dr2soWapBFQktitw2WdDtWG6n2ZwJQFQBo1qv5pMVf',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA_RTDWsCviZZMOW7-6UIPCQ4qtA8DJYsnEqUR-sClsvXbcXUpGbCBIYg9bWho_DlcGLYdSnrs6WGpBdGkMnxQ9zwQvbZjs43ckx3e9e7-6yMMC51M7TIaBELZtjiJ-isVne0PwbbDgvNu3raj1E7W6CwQuuwnmNEphMWCDGanW1WGvUOB9UEp3pwARPniZX62dOD_PMn_Up-dwr9oIXJf0SOHjGApRj9OdJHGAFTyGJX-rrpuGUDwv5Zsqso9JU6p1tBUpI2B0JsTG',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAWk62fKt9yCEEiSRR5akMaouS4nuN_ml0kHVH3HAozIjNI7ILzeLU61JumezRbnLHvLC0SGHTutDtMYWSbX69daIoqBRhFPXMYI_A6pIutSE3E6cWGAJkm3MLzMnEWSxE_pgM5j9Gz190jXGhPitF4wLiFzQwpKtoS_S8yfBOSxsguKalwvhpNVoc0iww9hJuu5kNvq1TCV6tslp1l342WI4RV70oF7uN3xYfMgRy74FT3jWarQz5hCCjZi2s7hyJxkXSPtGSTS9ID',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDkR2AGiXrMv8RF7lUnEoqasrplhOnF-ETYiwvUVZfcCVLxX0QzdYyJ0FusFu8jrzAs4kEVakitJ8nUGJSFXrv3i-w2C1CMvG9ff7Tpn-yLEeLxldtqjO48voU-5H3w6gIga7MeQc1STT5-ZVuIxX2gFJIOzoW16cVBWC4l-KE25yDQo2jeVwZmFQrJjSV73lvwht_EpY8swgu2gD4sC1s90oYVzfrmUDL6OWgm-6O-zaynk2RZShS8Nxb5RbdB0Q6-dh_lFLOR37BZ',
];


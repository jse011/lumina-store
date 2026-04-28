export interface NavItem {
  id: string;
  label: string;
  href: string;
  order: number;
  isActive?: boolean;
}

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

export interface AppSettings {
  whatsappNumber: string;
  contactEmail: string;
  whatsappGeneralMessage: string;
  whatsappProductMessage: string; // Plantilla: usa {productName} para reemplazo
  whatsappFABMessage: string;
  shippingTimeLima: string;
  shippingTimeProvincia: string;
}

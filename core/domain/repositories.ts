import { NavItem, Product, Testimonial, ProcessStep, AppSettings } from './models';

export interface IProductRepository {
  getProducts(): Promise<Product[]>;
  saveProduct(product: Product): Promise<void>;
}

export interface INavRepository {
  getNavItems(): Promise<NavItem[]>;
  saveNavItem(item: NavItem): Promise<void>;
}

export interface ITestimonialRepository {
  getTestimonials(): Promise<Testimonial[]>;
  saveTestimonial(testimonial: Testimonial): Promise<void>;
}

export interface IProcessRepository {
  getProcessSteps(): Promise<ProcessStep[]>;
  saveProcessStep(step: ProcessStep): Promise<void>;
}

export interface ISettingsRepository {
  getSettings(): Promise<AppSettings>;
  updateSettings(settings: AppSettings): Promise<void>;
}

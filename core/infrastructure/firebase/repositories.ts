import { database } from '../../../firebase/firebase';
import { ref, get, set } from 'firebase/database';
import { Product, NavItem, Testimonial, ProcessStep, AppSettings } from '../../domain/models';
import { IProductRepository, INavRepository, ITestimonialRepository, IProcessRepository, ISettingsRepository } from '../../domain/repositories';

const getBasePath = () => {
  return process.env.NODE_ENV === 'production' ? 'produccion' : 'prueba';
};

export class FirebaseProductRepository implements IProductRepository {
  async getProducts(): Promise<Product[]> {
    const dbRef = ref(database, `${getBasePath()}/products`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data) as Product[];
    }
    return [];
  }

  async saveProduct(product: Product): Promise<void> {
    const dbRef = ref(database, `${getBasePath()}/products/${product.id}`);
    await set(dbRef, product);
  }
}

export class FirebaseNavRepository implements INavRepository {
  async getNavItems(): Promise<NavItem[]> {
    const dbRef = ref(database, `${getBasePath()}/navItems`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const items = Object.values(data) as NavItem[];
      return items.sort((a, b) => a.order - b.order);
    }
    return [];
  }

  async saveNavItem(item: NavItem): Promise<void> {
    const dbRef = ref(database, `${getBasePath()}/navItems/${item.id}`);
    await set(dbRef, item);
  }
}

export class FirebaseTestimonialRepository implements ITestimonialRepository {
  async getTestimonials(): Promise<Testimonial[]> {
    const dbRef = ref(database, `${getBasePath()}/testimonials`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data) as Testimonial[];
    }
    return [];
  }

  async saveTestimonial(testimonial: Testimonial): Promise<void> {
    const dbRef = ref(database, `${getBasePath()}/testimonials/${testimonial.id}`);
    await set(dbRef, testimonial);
  }
}

export class FirebaseProcessRepository implements IProcessRepository {
  async getProcessSteps(): Promise<ProcessStep[]> {
    const dbRef = ref(database, `${getBasePath()}/processSteps`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data) as ProcessStep[];
    }
    return [];
  }

  async saveProcessStep(step: ProcessStep): Promise<void> {
    const dbRef = ref(database, `${getBasePath()}/processSteps/${step.id}`);
    await set(dbRef, step);
  }
}

export class FirebaseSettingsRepository implements ISettingsRepository {
  async getSettings(): Promise<AppSettings> {
    const settingsRef = ref(database, `${getBasePath()}/settings`);
    const snapshot = await get(settingsRef);
    if (snapshot.exists()) {
      return snapshot.val() as AppSettings;
    }
    // Default values if not found
    return {
      whatsappNumber: '51900000000',
      contactEmail: 'contacto@lumina.com',
      whatsappGeneralMessage: 'Hola, necesito información sobre Lumina Recuerdos',
      whatsappProductMessage: 'Hola, quiero iniciar mi pedido del {productName}',
      whatsappFABMessage: 'Hola, quiero crear mi recuerdo holográfico',
      shippingTimeLima: '2 a 3 días hábiles',
      shippingTimeProvincia: '3 días hábiles'
    };
  }

  async updateSettings(settings: AppSettings): Promise<void> {
    const settingsRef = ref(database, `${getBasePath()}/settings`);
    await set(settingsRef, settings);
  }
}

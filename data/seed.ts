import {
  FirebaseProductRepository,
  FirebaseNavRepository,
  FirebaseTestimonialRepository,
  FirebaseProcessRepository,
  FirebaseSettingsRepository,
  FirebaseGalleryRepository
} from '../core/infrastructure/firebase/repositories';
import { PRODUCTS, NAV_ITEMS, TESTIMONIALS, PROCESS_STEPS, GALLERY_IMAGES } from './mock';

async function seed() {
  console.log('Starting seed...');

  const productRepo = new FirebaseProductRepository();
  const navRepo = new FirebaseNavRepository();
  const testimonialRepo = new FirebaseTestimonialRepository();
  const processRepo = new FirebaseProcessRepository();
  const settingsRepo = new FirebaseSettingsRepository();
  const galleryRepo = new FirebaseGalleryRepository();

  console.log('Seeding products...');
  for (const product of PRODUCTS) {
    await productRepo.saveProduct(product);
  }

  console.log('Seeding nav items...');
  for (const item of NAV_ITEMS) {
    await navRepo.saveNavItem(item);
  }

  console.log('Seeding testimonials...');
  for (const testimonial of TESTIMONIALS) {
    await testimonialRepo.saveTestimonial(testimonial);
  }

  console.log('Seeding process steps...');
  for (const step of PROCESS_STEPS) {
    await processRepo.saveProcessStep(step);
  }

  console.log('Seeding app settings...');
  await settingsRepo.updateSettings({
    whatsappNumber: '51900000000',
    contactEmail: 'contacto@lumina.com',
    whatsappGeneralMessage: 'Hola, necesito información sobre Lumina Recuerdos',
    whatsappProductMessage: 'Hola, quiero iniciar mi pedido del {productName}',
    whatsappFABMessage: 'Hola, quiero crear mi recuerdo holográfico',
    shippingTimeLima: '2 a 3 días hábiles',
    shippingTimeProvincia: '3 días hábiles',
    galleryImages: GALLERY_IMAGES, // Also keeping it here for compatibility if needed
    heroTitle: 'La magia de',
    heroTitleHighlight: 'volver a verlos',
    heroSubtitle: 'Transformamos tus fotos más queridas en proyecciones eternas llenas de vida. Inmortaliza a tus seres queridos, mascotas y momentos especiales con tecnología holográfica.',
    heroImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCizT8KMymZYFPST2bW64Blm1vPuE_ZoOIW6xL8Gi-Rg9RyqtsLkfOacffHFlCztkGAzWyNrEhUaY0PT_p4ZaYDlWcZSD4kRftvzaBQgflzQN1XvqGUCH9wTpfwGsYlGUD3hsngSabwJcm4fPZLrT9xjluP-uB8Wh6fEyYPcIpuNmTkM9fPyAC4AxFanckp6q55qB_A4jiWdtJgdx1xhOsiPQ6pYP04zjFxuXgH0UvDIiaHqOE5KzedldTaQ39-JgnGVuLCtGdTPB-h',
    heroWhatsappText: 'Hola, quiero crear mi recuerdo holográfico',
    heroBadgeText: 'Hablar por WhatsApp',
    heroSubBadge: 'Atención personalizada por WhatsApp | Entrega física con tarjeta de acceso | Experiencia digital con código único'
  });

  console.log('Seeding gallery...');
  await galleryRepo.saveGalleryImages(GALLERY_IMAGES);

  console.log('Seed completed successfully!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});

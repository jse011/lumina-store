import dynamic from 'next/dynamic';
import Navbar from "@/modules/home/components/layout/Navbar";
import AccessCard from "@/modules/home/components/features/AccessCard";
import Hero from "@/modules/home/components/features/Hero";
import Authorized from "@/modules/home/components/features/Authorized";
import Catalog from "@/modules/home/components/features/Catalog";
import Process from "@/modules/home/components/features/Process";
import Delivery from "@/modules/home/components/features/Delivery";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/modules/home/components/common/WhatsAppFAB";

// Lazy loading heavy components below the fold for better performance
const DynamicGallery = dynamic(() => import("@/modules/home/components/features/Gallery"), {
  loading: () => <div className="py-24 text-center text-white/50">Cargando Galería...</div>,
});
const DynamicTestimonials = dynamic(() => import("@/modules/home/components/features/Testimonials"), {
  loading: () => <div className="py-24 text-center text-white/50">Cargando Testimonios...</div>,
});

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <AccessCard
          hero={<Hero />}
          authorized={<Authorized />}
        />
        <Catalog />
        {/*<Process />*/}
        <DynamicGallery />
        <DynamicTestimonials />
        <Delivery />
      </main>
      <Footer />
      {/*<WhatsAppFAB />*/}
    </>
  );
}
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Access from '@/components/Access';
import Catalog from '@/components/Catalog';
import Gallery from '@/components/Gallery';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Delivery from '@/components/Delivery';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import Authorized from '@/components/Authorized';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Access
          hero={<Hero />}
          authorized={<Authorized />}
        />
        <Catalog />
        <Process />
        <Gallery />
        <Testimonials />
        <Delivery />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}

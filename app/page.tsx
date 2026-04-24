import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import Testimonials from '@/components/Testimonials';
import Delivery from '@/components/Delivery';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Catalog />
      <Testimonials />
      <Delivery />
      <Footer />
    </>
  );
}

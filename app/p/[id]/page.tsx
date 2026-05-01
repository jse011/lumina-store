import { FirebaseProductRepository, FirebaseSettingsRepository } from '@/modules/home/data/firebase';
import ProductCard from '@/modules/home/components/features/ProductCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const productRepo = new FirebaseProductRepository();
  const products = await productRepo.getProducts();
  
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  const productRepo = new FirebaseProductRepository();
  const settingsRepo = new FirebaseSettingsRepository();

  const [product, settings] = await Promise.all([
    productRepo.getProductById(id),
    settingsRepo.getSettings()
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-0 md:p-8 relative">
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-50 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white border-white/10 hover:bg-white/5 transition-all"
      >
        <span className="material-symbols-outlined">close</span>
      </Link>

      <div className="w-full h-full md:h-auto md:max-w-[360px] flex items-center justify-center">
        <div className="w-full h-full md:h-auto md:rounded-[2rem] overflow-hidden shadow-2xl">
          <ProductCard 
            product={product} 
            whatsappNumber={settings.whatsappNumber} 
            whatsappMessageTemplate={settings.whatsappProductMessage} 
          />
        </div>
      </div>
    </div>
  );
}

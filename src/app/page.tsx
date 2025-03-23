import Header from '@/components/header/Header';
import HeroSlider from '@/components/home/HeroSlider';
import ProductGrid from '@/components/product/ProductGrid';
import Footer from '@/components/footer/Footer';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <HeroSlider />

        <section className="py-10 fade-in">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl md:text-3xl font-montserrat font-semibold text-Krixies-dark mb-4">
              Krixies Shop Since 2007
            </h1>
            <p className="text-md italic text-gray-600 mb-8">
              "CACHET"
            </p>
          </div>
        </section>

        <Separator className="bg-gray-200" />

        <div className="slide-in-up">
          <ProductGrid title="NEW ARRIVAL" />
        </div>
      </div>
      <Footer />
    </main>
  );
}

import { getProducts } from '@/lib/products';
import Hero from '@/components/Hero';
import ProductCatalog from '@/components/catalog/ProductCatalog';

export default function Home() {
  const products = getProducts();

  return (
    <main>
      <Hero />
      <ProductCatalog products={products} />
    </main>
  );
}

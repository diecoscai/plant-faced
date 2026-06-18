import type { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="text-center text-[#666] py-8">
        No se encontraron productos.
      </p>
    );
  }

  return (
    <div
      role="list"
      className="
        grid
        grid-cols-[repeat(auto-fill,minmax(300px,1fr))]
        gap-8
        mt-4
      "
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

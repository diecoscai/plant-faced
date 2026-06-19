import { Link } from 'react-router-dom';
import { useCart } from '@/lib/cart-context';
import { getProductDetailPath } from '@/lib/navigation';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { add } = useCart();
  const detailPath = getProductDetailPath(product.urlName);

  return (
    <div
      role="listitem"
      className="
        bg-white rounded-xl overflow-hidden
        shadow-[0_4px_6px_rgba(0,0,0,0.1)]
        transition-transform duration-300
        hover:-translate-y-[5px]
        hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)]
        flex flex-col
      "
    >
      <div className="relative w-full h-[200px]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <h3 className="text-[1.25rem] m-0 mb-2 text-primary">
          {product.name}
        </h3>
        <p className="text-[1.1rem] text-primary m-0 mb-4">
          ${product.price.toFixed(2)}
        </p>
        <p
          className="text-[0.9rem] text-[#666] flex-1 mb-4"
          style={{ maxHeight: '150px', overflowY: 'auto' }}
        >
          {product.description}
        </p>
        <div className="flex flex-col gap-2">
          <Link
            to={detailPath}
            aria-label={`View details for ${product.name}`}
            className="
              border border-primary text-primary
              py-[0.8rem] px-4
              rounded-lg
              text-base text-center no-underline
              transition-colors duration-300
              hover:bg-primary hover:text-white
              focus:outline-2 focus:outline-primary focus:outline-offset-2
            "
          >
            View details
          </Link>
          <button
            onClick={() => add(product)}
            aria-label={`Add ${product.name} to cart`}
            className="
              bg-primary text-white
              border-none
              py-[0.8rem] px-4
              rounded-lg
              cursor-pointer
              text-base
              transition-colors duration-300
              hover:bg-primary/80
            "
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

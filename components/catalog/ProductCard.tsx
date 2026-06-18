'use client';

import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { add } = useCart();

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
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <h3 className="text-[1.25rem] m-0 mb-2 text-primary">
          {product.name}
        </h3>
        <p className="text-[1.1rem] text-secondary m-0 mb-4">
          ${product.price.toFixed(2)}
        </p>
        <p
          className="text-[0.9rem] text-[#666] flex-1 mb-4"
          style={{ maxHeight: '150px', overflowY: 'auto' }}
        >
          {product.description}
        </p>
        <button
          onClick={() => add(product)}
          aria-label={`Agregar ${product.name} al carrito`}
          className="
            bg-secondary text-white
            border-none
            py-[0.8rem] px-4
            rounded-lg
            cursor-pointer
            text-base
            transition-colors duration-300
            hover:bg-primary
          "
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

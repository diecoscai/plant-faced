'use client';

import { useCart } from '@/lib/cart-context';

interface CartButtonProps {
  onOpenCart?: () => void;
}

export default function CartButton({ onOpenCart }: CartButtonProps) {
  const { count } = useCart();

  return (
    <button
      className="ml-auto bg-transparent border-none cursor-pointer text-xl px-2 py-2 flex items-center gap-2"
      aria-label="Abrir carrito"
      onClick={onOpenCart}
    >
      🛒
      <span className="relative inline-flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-white text-xs">
        {count}
      </span>
    </button>
  );
}

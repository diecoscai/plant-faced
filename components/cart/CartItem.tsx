'use client';

import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import type { CartItem as CartItemType } from '@/types/product';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { remove, setQty } = useCart();

  function handleDecrease() {
    setQty(item.id, item.quantity - 1);
  }

  function handleIncrease() {
    setQty(item.id, item.quantity + 1);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseInt(e.target.value, 10);
    setQty(item.id, isNaN(val) ? 1 : val);
  }

  return (
    <li
      className="grid gap-4 py-4 border-b border-gray-100 last:border-b-0 transition-[transform,opacity] duration-300"
      style={{ gridTemplateColumns: '60px 1fr auto' }}
      data-id={item.id}
    >
      <Image
        src={item.image}
        alt={item.name}
        width={60}
        height={60}
        className="w-[60px] h-[60px] object-cover rounded-lg"
      />
      <div className="flex flex-col justify-center">
        <h4 className="text-base m-0 mb-1">{item.name}</h4>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-gray-100 rounded-full">
          <button
            className="w-[30px] h-[30px] border-none bg-transparent cursor-pointer text-lg flex items-center justify-center"
            aria-label="Reducir cantidad"
            onClick={handleDecrease}
          >
            -
          </button>
          <input
            type="number"
            className="w-[30px] text-center border-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={item.quantity}
            min={1}
            aria-label="Cantidad"
            onChange={handleInputChange}
          />
          <button
            className="w-[30px] h-[30px] border-none bg-transparent cursor-pointer text-lg flex items-center justify-center"
            aria-label="Aumentar cantidad"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <button
          className="bg-transparent border-none text-red-500 cursor-pointer px-2 text-xl"
          aria-label="Eliminar producto"
          onClick={() => remove(item.id)}
        >
          &times;
        </button>
      </div>
    </li>
  );
}

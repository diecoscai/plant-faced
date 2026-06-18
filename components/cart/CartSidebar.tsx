'use client';

import { useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import CartItem from './CartItem';

export default function CartSidebar() {
  const { items, total, isOpen, closeCart } = useCart();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  return (
    <aside
      id="cart"
      aria-label="Carrito de compras"
      className={[
        'fixed top-0 right-0 w-full max-w-[400px] h-screen bg-white',
        'shadow-[-2px_0_15px_rgba(0,0,0,0.1)] flex flex-col z-[1001]',
        'transition-[transform] duration-[400ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]',
        isOpen ? 'translate-x-0' : 'translate-x-full',
      ].join(' ')}
    >
      <div className="flex justify-between items-center px-6 py-6 border-b border-gray-100 cart-header">
        <h2 className="text-2xl m-0">Tu Carrito</h2>
        <button
          className="close-cart bg-transparent border-none text-4xl cursor-pointer px-2 py-2 leading-none"
          aria-label="Cerrar carrito"
          onClick={closeCart}
        >
          &times;
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {items.length === 0 ? (
          <p
            id="cart-empty"
            className="text-center py-8 text-gray-500"
          >
            Tu carrito está vacío
          </p>
        ) : (
          <ul id="cart-items" className="list-none p-0 m-0">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
        )}
      </div>

      <div className="px-6 py-6 border-t border-gray-100">
        <div className="flex justify-between items-center text-xl mb-4">
          <span>Total:</span>
          <span id="total-price">${total.toFixed(2)}</span>
        </div>
        <button
          className="w-full py-4 bg-secondary text-white border-none rounded-lg cursor-pointer transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed checkout-button"
          disabled={items.length === 0}
          aria-label="Pagar"
        >
          Pagar
        </button>
      </div>
    </aside>
  );
}

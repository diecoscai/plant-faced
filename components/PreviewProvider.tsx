import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '@/lib/cart-context';

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter>
      <CartProvider>{children}</CartProvider>
    </MemoryRouter>
  );
}

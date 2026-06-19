import type { Product } from '@/types/product';

export const CATEGORIES = ['Camisetas', 'Buzos', 'Musculosas'] as const;

export type Category = (typeof CATEGORIES)[number];

export async function getProducts(): Promise<Product[]> {
  const response = await fetch('/products.json');

  if (!response.ok) {
    throw new Error(`Failed to load products: ${response.status}`);
  }

  return response.json() as Promise<Product[]>;
}

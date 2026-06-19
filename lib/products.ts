import type { Product } from '@/types/product';
import productsData from '@/public/products.json';

export const CATEGORIES = ['Camisetas', 'Buzos', 'Musculosas'] as const;

export type Category = (typeof CATEGORIES)[number];

export function getProducts(): Product[] {
  return productsData as unknown as Product[];
}

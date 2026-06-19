import { describe, it, expect } from 'vitest';
import { filterProducts, getPaginationWindow } from '../catalog-utils';
import type { Product } from '@/types/product';

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 1,
  name: 'Test Shirt',
  urlName: 'test-shirt',
  description: 'A test product',
  image: '/img.jpg',
  lifestyleImage: '/lifestyle.jpg',
  isBundle: false,
  collectionImage: '/col.jpg',
  collectionImageAlt: 'collection',
  price: 10,
  totalBundlePrice: 0,
  salePrice: 0,
  colors: [],
  colorThumbnails: {},
  defaultColor: null,
  defaultColour: null,
  sizes: [],
  types: [],
  options: [],
  gender: 'unisex',
  ageGroup: 'adult',
  reviews: { rating: 5, count: 1 },
  priceRange: [10],
  salePriceRange: [],
  category: 'Camisetas',
  ...overrides,
});

const products: Product[] = [
  makeProduct({ id: 1, name: 'Camiseta Verde', category: 'Camisetas' }),
  makeProduct({ id: 2, name: 'Buzo Negro', category: 'Buzos' }),
  makeProduct({ id: 3, name: 'Musculosa Blanca', category: 'Musculosas' }),
  makeProduct({ id: 4, name: 'Camiseta Roja', category: 'Camisetas' }),
];

describe('filterProducts', () => {
  it('returns all products when search is empty and category is "all"', () => {
    expect(filterProducts(products, '', 'all')).toHaveLength(4);
  });

  it('filters by name case-insensitively', () => {
    const result = filterProducts(products, 'camiseta', 'all');
    expect(result).toHaveLength(2);
    expect(result.map((p) => p.id)).toEqual([1, 4]);
  });

  it('filters by category', () => {
    const result = filterProducts(products, '', 'Buzos');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it('combines search and category filters', () => {
    const result = filterProducts(products, 'camiseta', 'Camisetas');
    expect(result).toHaveLength(2);
  });

  it('returns empty when no match', () => {
    expect(filterProducts(products, 'zapatos', 'all')).toHaveLength(0);
  });

  it('returns empty when search matches but category does not', () => {
    const result = filterProducts(products, 'camiseta', 'Buzos');
    expect(result).toHaveLength(0);
  });
});

describe('getPaginationWindow', () => {
  it('returns window centered on currentPage', () => {
    const result = getPaginationWindow(5, 10);
    expect(result.startPage).toBe(3);
    expect(result.endPage).toBe(7);
  });

  it('clamps startPage at 1', () => {
    const result = getPaginationWindow(1, 10);
    expect(result.startPage).toBe(1);
    expect(result.endPage).toBe(5);
  });

  it('clamps endPage at totalPages', () => {
    const result = getPaginationWindow(10, 10);
    expect(result.endPage).toBe(10);
    // startPage = max(1, 10 - floor(5/2)) = max(1, 8) = 8
    expect(result.startPage).toBe(8);
  });

  it('does not show first page when window starts at 1', () => {
    const result = getPaginationWindow(1, 10);
    expect(result.showFirstPage).toBe(false);
    expect(result.showFirstEllipsis).toBe(false);
  });

  it('shows first page and ellipsis when window starts > 2', () => {
    const result = getPaginationWindow(5, 10);
    expect(result.showFirstPage).toBe(true);
    expect(result.showFirstEllipsis).toBe(true);
  });

  it('shows first page without ellipsis when startPage === 2', () => {
    const result = getPaginationWindow(4, 10);
    expect(result.startPage).toBe(2);
    expect(result.showFirstPage).toBe(true);
    expect(result.showFirstEllipsis).toBe(false);
  });

  it('shows last page and ellipsis when window ends < totalPages - 1', () => {
    const result = getPaginationWindow(1, 10);
    expect(result.showLastPage).toBe(true);
    expect(result.showLastEllipsis).toBe(true);
  });

  it('shows last page without ellipsis when endPage === totalPages - 1', () => {
    const result = getPaginationWindow(7, 10);
    expect(result.endPage).toBe(9);
    expect(result.showLastPage).toBe(true);
    expect(result.showLastEllipsis).toBe(false);
  });

  it('does not show last page when window ends at totalPages', () => {
    const result = getPaginationWindow(10, 10);
    expect(result.showLastPage).toBe(false);
    expect(result.showLastEllipsis).toBe(false);
  });

  it('handles single page', () => {
    const result = getPaginationWindow(1, 1);
    expect(result.startPage).toBe(1);
    expect(result.endPage).toBe(1);
    expect(result.showFirstPage).toBe(false);
    expect(result.showLastPage).toBe(false);
  });
});

import type { Product } from '@/types/product';

export function filterProducts(
  products: Product[],
  search: string,
  category: string
): Product[] {
  const term = search.toLowerCase();
  return products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(term);
    const matchesCategory = category === 'all' || p.category === category;
    return matchesSearch && matchesCategory;
  });
}

export interface PaginationWindow {
  startPage: number;
  endPage: number;
  showFirstPage: boolean;
  showFirstEllipsis: boolean;
  showLastEllipsis: boolean;
  showLastPage: boolean;
}

export function getPaginationWindow(
  currentPage: number,
  totalPages: number,
  maxVisible = 5
): PaginationWindow {
  const startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);

  return {
    startPage,
    endPage,
    showFirstPage: startPage > 1,
    showFirstEllipsis: startPage > 2,
    showLastEllipsis: endPage < totalPages - 1,
    showLastPage: endPage < totalPages,
  };
}

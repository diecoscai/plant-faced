import { useState, useEffect, useRef } from 'react';
import type { Product } from '@/types/product';
import { filterProducts } from '@/lib/catalog-utils';
import Filters from './Filters';
import ProductGrid from './ProductGrid';
import Pagination from './Pagination';

const PRODUCTS_PER_PAGE = 10;

interface ProductCatalogProps {
  products: Product[];
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchTerm(searchInput);
      setCurrentPage(1);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchInput]);

  function handleCategoryChange(value: string) {
    setCategory(value);
    setCurrentPage(1);
  }

  const filtered = filterProducts(products, searchTerm, category);
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  return (
    <section
      id="products"
      tabIndex={-1}
      className="products px-8 py-8 max-w-[1400px] mx-auto scroll-mt-header"
      aria-label="Product catalog"
    >
      <Filters
        search={searchInput}
        category={category}
        onSearchChange={setSearchInput}
        onCategoryChange={handleCategoryChange}
      />
      <ProductGrid products={paginated} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

'use client';

import { getPaginationWindow } from '@/lib/catalog-utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const btnBase = `
  bg-primary text-white border-none
  py-2 px-4 rounded-lg mx-2
  cursor-pointer
  transition-[background-color,transform] duration-300
  hover:enabled:bg-secondary hover:enabled:scale-105
  disabled:bg-[#ccc] disabled:cursor-not-allowed
`;

const btnActive = `bg-secondary font-bold scale-110`;

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const {
    startPage,
    endPage,
    showFirstPage,
    showFirstEllipsis,
    showLastEllipsis,
    showLastPage,
  } = getPaginationWindow(currentPage, totalPages);

  function handlePageChange(page: number) {
    onPageChange(page);
    const el =
      document.querySelector('#products') ??
      document.querySelector('.products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const pages: Array<number | '...'> = [];

  if (showFirstPage) {
    pages.push(1);
    if (showFirstEllipsis) pages.push('...');
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (showLastPage) {
    if (showLastEllipsis) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <nav
      className="flex justify-center items-center my-8"
      aria-label="Navegación de paginación"
      role="navigation"
    >
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className={btnBase}
      >
        Anterior
      </button>

      {pages.map((page, idx) =>
        page === '...' ? (
          <span key={`ellipsis-${idx}`} className="mx-2 text-[#666]">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            aria-label={`Página ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`${btnBase} ${page === currentPage ? btnActive : ''}`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
        className={btnBase}
      >
        Siguiente
      </button>
    </nav>
  );
}

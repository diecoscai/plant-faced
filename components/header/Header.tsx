'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Nav from './Nav';
import CartButton from './CartButton';
import { useCart } from '@/lib/cart-context';

interface HeaderProps {
  onOpenCart?: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  const { openCart } = useCart();
  const handleOpenCart = onOpenCart ?? openCart;
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && menuOpen) {
        closeMenu();
      }
    }

    function handleOutsideClick(e: MouseEvent) {
      if (
        menuOpen &&
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [menuOpen, closeMenu]);

  return (
    <header
      ref={headerRef}
      className="flex justify-between items-center px-[5%] bg-white fixed w-full top-0 z-[1000] shadow-[0_2px_10px_rgba(0,0,0,0.1)] h-header"
    >
      {/* Left: nav + hamburger */}
      <nav className="flex items-center mr-auto">
        <Nav isOpen={menuOpen} onLinkClick={closeMenu} />

        <button
          className={[
            'md:hidden flex flex-col justify-around w-[30px] h-[25px]',
            'bg-transparent border-none cursor-pointer p-0 z-[1001] relative',
          ].join(' ')}
          id="hamburger"
          aria-label="Menú móvil"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span className="w-full h-[3px] bg-primary transition-all duration-300" />
          <span className="w-full h-[3px] bg-primary transition-all duration-300" />
          <span className="w-full h-[3px] bg-primary transition-all duration-300" />
        </button>
      </nav>

      {/* Center: logo */}
      <div className="absolute left-1/2 -translate-x-1/2 flex justify-center items-center h-full">
        <Link
          href="/"
          className="flex items-center h-full"
          aria-label="Ir a la página de inicio"
        >
          <Image
            src="/assets/images/logo.webp"
            alt="Plant Faced Logo"
            width={100}
            height={100}
            className="w-[100px] h-auto max-w-full object-contain hover:opacity-90"
            priority
          />
        </Link>
      </div>

      {/* Right: cart */}
      <CartButton onOpenCart={handleOpenCart} />
    </header>
  );
}

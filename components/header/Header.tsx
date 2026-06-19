import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import CartButton from './CartButton';
import { useCart } from '@/lib/cart-context';
import { navLinks, scrollToSection, type SectionId } from '@/lib/navigation';

interface HeaderProps {
  onOpenCart?: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  const { openCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const handleOpenCart = onOpenCart ?? openCart;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>('home');
  const headerRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleNavigate = useCallback(
    (sectionId: SectionId) => {
      if (location.pathname !== '/') {
        navigate(`/#${sectionId}`);
        setActiveSection(sectionId);
        setMenuOpen(false);
        return;
      }

      if (scrollToSection(sectionId)) {
        setActiveSection(sectionId);
        setMenuOpen(false);
      }
    },
    [location.pathname, navigate]
  );

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

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(null);
      return;
    }

    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id as SectionId);
        }
      },
      {
        rootMargin: '-120px 0px -55% 0px',
        threshold: 0.01,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const hash = location.hash.slice(1) as SectionId;

    if (navLinks.some((link) => link.id === hash)) {
      setActiveSection(hash);
      return;
    }

    if (location.pathname !== '/') {
      setActiveSection(null);
    }
  }, [location.pathname, location.hash]);

  return (
    <header
      ref={headerRef}
      className="flex justify-between items-center px-[5%] bg-white fixed w-full top-0 z-[1000] shadow-[0_2px_10px_rgba(0,0,0,0.1)] h-header"
    >
      {/* Left: nav + hamburger */}
      <nav className="flex items-center mr-auto" aria-label="Primary navigation">
        <Nav
          isOpen={menuOpen}
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onLinkClick={closeMenu}
        />

        <button
          className={[
            'md:hidden flex flex-col justify-around w-[30px] h-[25px]',
            'bg-transparent border-none cursor-pointer p-0 z-[1001] relative',
          ].join(' ')}
          id="hamburger"
          aria-label="Mobile menu"
          aria-controls="primary-navigation"
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
        <a
          href="#home"
          className="flex items-center h-full"
          aria-label="Go to home page"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate('home');
          }}
        >
          <img
            src="/assets/images/logo.webp"
            alt="Plant Faced Logo"
            width={100}
            height={100}
            className="w-[100px] h-auto max-w-full object-contain hover:opacity-90"
          />
        </a>
      </div>

      {/* Right: cart */}
      <CartButton onOpenCart={handleOpenCart} />
    </header>
  );
}

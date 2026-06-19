import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import CartSidebar from '@/components/cart/CartSidebar';
import CartFeedback from '@/components/cart/CartFeedback';
import Hero from '@/components/Hero';
import ProductCatalog from '@/components/catalog/ProductCatalog';
import { CartProvider } from '@/lib/cart-context';
import { isSectionId, scrollToSection } from '@/lib/navigation';
import { getProducts } from '@/lib/products';
import NotFoundPage from '@/src/pages/NotFoundPage';
import ProductDetailPage from '@/src/pages/ProductDetailPage';
import type { Product } from '@/types/product';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const location = useLocation();
  const skipTarget = location.pathname === '/' ? 'products' : 'product-detail';

  useEffect(() => {
    let cancelled = false;

    getProducts()
      .then((loadedProducts) => {
        if (!cancelled) {
          setProducts(loadedProducts);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('error');
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const sectionId = location.hash.slice(1);

    if (!isSectionId(sectionId)) return;

    window.setTimeout(() => {
      scrollToSection(sectionId);
    }, 0);
  }, [location.pathname, location.hash]);

  return (
    <CartProvider>
      <a
        href={`#${skipTarget}`}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1200] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-3 focus:text-white focus:no-underline"
        onClick={(e) => {
          e.preventDefault();
          const target = document.getElementById(skipTarget);

          if (!target) return;

          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          target.focus({ preventScroll: true });
        }}
      >
        Skip to content
      </a>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              {status === 'loading' ? (
                <p className="text-center text-[#666] py-8">
                  Loading products...
                </p>
              ) : status === 'error' ? (
                <p role="alert" className="text-center text-red-600 py-8">
                  Could not load products.
                </p>
              ) : (
                <ProductCatalog products={products} />
              )}
            </main>
          }
        />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <CartSidebar />
      <CartFeedback />
    </CartProvider>
  );
}

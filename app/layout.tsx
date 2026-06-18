import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import CartSidebar from '@/components/cart/CartSidebar';
import CartFeedback from '@/components/cart/CartFeedback';

export const metadata: Metadata = {
  title: 'Plant Faced - Moda Vegana',
  description: 'Tienda de ropa minimalista y vegana. Moda sostenible, sin crueldad y con diseño atemporal.',
  keywords: ['moda vegana', 'ropa sostenible', 'tienda online', 'moda ética'],
  openGraph: {
    title: 'Plant Faced - Moda Vegana',
    description: 'Tienda de ropa minimalista y vegana. Moda sostenible, sin crueldad y con diseño atemporal.',
    images: [
      {
        url: 'https://tudominio.com/assets/images/logo.png',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        />
        <link rel="preload" href="/assets/images/logo.webp" as="image" media="(min-width: 768px)" />
        <link rel="icon" href="/assets/images/favicon.png" type="image/x-icon" />
      </head>
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartSidebar />
          <CartFeedback />
        </CartProvider>
      </body>
    </html>
  );
}

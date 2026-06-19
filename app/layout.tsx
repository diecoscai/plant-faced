import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import CartSidebar from '@/components/cart/CartSidebar';
import CartFeedback from '@/components/cart/CartFeedback';

export const metadata: Metadata = {
  title: 'Plant Faced - Vegan Fashion',
  description: 'Minimalist and vegan clothing store. Sustainable fashion, cruelty-free and timeless design.',
  keywords: ['vegan fashion', 'sustainable clothing', 'online store', 'ethical fashion'],
  openGraph: {
    title: 'Plant Faced - Vegan Fashion',
    description: 'Minimalist and vegan clothing store. Sustainable fashion, cruelty-free and timeless design.',
    images: [
      {
        url: '/assets/images/logo.webp',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        />
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

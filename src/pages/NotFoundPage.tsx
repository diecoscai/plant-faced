import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main
      id="product-detail"
      className="max-w-[900px] mx-auto px-8 py-16 min-h-[60vh]"
      aria-labelledby="not-found-title"
    >
      <p className="text-primary font-semibold mb-2">404</p>
      <h1 id="not-found-title" className="text-4xl text-primary mb-4">
        Page not found
      </h1>
      <Link
        to="/#products"
        className="inline-flex text-primary no-underline hover:text-primary"
      >
        Back to products
      </Link>
    </main>
  );
}

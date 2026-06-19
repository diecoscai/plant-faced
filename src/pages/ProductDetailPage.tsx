import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/lib/cart-context';
import { getProducts } from '@/lib/products';
import ProductGrid from '@/components/catalog/ProductGrid';
import NotFoundPage from './NotFoundPage';
import type { Product } from '@/types/product';

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <span className="inline-flex gap-0.5 text-lg leading-none">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? 'text-primary' : 'text-gray-300'} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}

function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-colors ${
              i === active ? 'border-primary' : 'border-transparent hover:border-secondary'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover block" />
          </button>
        ))}
      </div>
      <div className="flex-1 rounded-2xl overflow-hidden bg-[#eef3f0]">
        <img
          src={images[active]}
          alt={`${name} view ${active + 1}`}
          className="w-full h-full object-cover block aspect-[3/4]"
        />
      </div>
    </div>
  );
}

function BuyBox({ product }: { product: Product }) {
  const { add, openCart } = useCart();
  const [color, setColor] = useState(product.defaultColor ?? product.defaultColour ?? product.colors[0] ?? '');
  const [size, setSize] = useState(product.sizes[0] ?? '');
  const [qty, setQty] = useState(1);
  const onSale = product.salePrice > 0;

  function handleAdd() {
    for (let i = 0; i < qty; i++) add(product);
    openCart();
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/60">
          {product.category}
        </span>
        <h1 className="font-urbanist text-[2.5rem] leading-[1.05] m-0 text-primary">
          {product.name}
        </h1>
        {product.reviews.count > 0 && (
          <div className="flex items-center gap-2">
            <Stars rating={product.reviews.rating} />
            <span className="text-sm text-gray-500">
              {product.reviews.rating.toFixed(1)} · {product.reviews.count} reviews
            </span>
          </div>
        )}
      </div>

      <div className="flex items-end gap-3">
        {onSale ? (
          <>
            <span className="text-3xl font-bold text-primary">${product.salePrice.toFixed(2)}</span>
            <span className="text-xl text-gray-400 line-through">${product.price.toFixed(2)}</span>
            <span className="mb-1 px-2 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary">
              -{Math.round((1 - product.salePrice / product.price) * 100)}%
            </span>
          </>
        ) : (
          <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
        )}
      </div>

      <p className="m-0 text-[1.02rem] leading-relaxed text-gray-600 max-w-[46ch]">
        {product.description}
      </p>

      {product.colors.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-primary">Color</span>
            <span className="text-sm text-gray-500">{color}</span>
          </div>
          <div className="flex gap-3">
            {product.colors.map((c) => {
              const thumb = product.colorThumbnails[c];
              const isActive = color === c;
              return (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  aria-label={c}
                  aria-pressed={isActive}
                  title={c}
                  className={`relative w-10 h-10 rounded-full border transition-all ${
                    isActive
                      ? 'border-primary ring-2 ring-primary ring-offset-2'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                  style={{ background: thumb?.type === 'color' ? thumb.value : undefined }}
                >
                  {thumb?.type === 'image' && (
                    <img src={thumb.value} alt="" className="w-full h-full rounded-full object-cover" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-primary">Size</span>
          <div className="flex flex-wrap gap-2.5">
            {product.sizes.map((z) => {
              const isActive = size === z;
              return (
                <button
                  key={z}
                  onClick={() => setSize(z)}
                  aria-pressed={isActive}
                  className={`min-w-[3rem] h-12 px-3 rounded-lg border text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-primary border-gray-300 hover:border-primary'
                  }`}
                >
                  {z}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-1">
        <div className="flex gap-3">
          <div className="flex items-center rounded-xl border border-gray-300 overflow-hidden">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              aria-label="Decrease quantity"
              className="w-12 h-14 text-2xl text-primary bg-white hover:bg-gray-50 border-none cursor-pointer"
            >
              −
            </button>
            <span className="w-12 text-center text-lg font-medium text-primary select-none">
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              aria-label="Increase quantity"
              className="w-12 h-14 text-2xl text-primary bg-white hover:bg-gray-50 border-none cursor-pointer"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAdd}
            className="flex-1 h-14 rounded-xl text-white text-lg font-semibold border-none cursor-pointer transition-colors duration-300 bg-primary hover:bg-primary/80"
          >
            Add to cart
          </button>
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 m-0 p-0 list-none pt-2 border-t border-gray-100">
        {[
          ['Carbon-neutral delivery', 'Ships in 2–4 days'],
          ['Free returns', '30-day window'],
          ['Wind-powered print', 'Water-based inks'],
        ].map(([a, b], i) => (
          <li key={i} className="flex flex-col">
            <span className="text-sm font-semibold text-primary">{a}</span>
            <span className="text-xs text-gray-500">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    getProducts()
      .then((p) => {
        if (!cancelled) {
          setProducts(p);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === 'loading') {
    return (
      <main id="product-detail" className="py-16">
        <p className="text-center text-[#666]">Loading...</p>
      </main>
    );
  }

  const product = products.find((p) => p.urlName === slug);

  if (!product) return <NotFoundPage />;

  const images = [product.image, product.lifestyleImage].filter(Boolean);
  const related = products.filter((p) => p.urlName !== slug).slice(0, 3);

  return (
    <main id="product-detail" className="pt-[100px]">
      <div className="max-w-[1200px] mx-auto px-[5%]">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500 py-6">
          {['Home', 'Shop', product.category, product.name].map((b, i, arr) => {
            const last = i === arr.length - 1;
            return (
              <span
                key={i}
                className={`flex items-center gap-2 ${last ? 'text-primary font-medium truncate max-w-[16rem]' : ''}`}
              >
                <span>
                  {i === 0 ? (
                    <Link to="/" className="text-gray-500 no-underline hover:text-primary">
                      {b}
                    </Link>
                  ) : (
                    b
                  )}
                </span>
                {!last && <span className="text-gray-300">/</span>}
              </span>
            );
          })}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 pb-16">
          <Gallery images={images} name={product.name} />
          <BuyBox product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-[#f6f9f7] py-16 mt-4">
          <div className="max-w-[1200px] mx-auto px-[5%]">
            <div className="flex items-end justify-between mb-2">
              <h2 className="font-urbanist text-[2rem] m-0 text-primary">You might also like</h2>
              <Link
                to="/#products"
                className="text-primary text-sm font-medium no-underline hover:underline"
              >
                View all
              </Link>
            </div>
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </main>
  );
}

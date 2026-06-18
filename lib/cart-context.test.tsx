import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './cart-context';
import type { Product } from '@/types/product';

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 1,
  name: 'Test Shirt',
  urlName: 'test-shirt',
  description: 'A test product',
  image: '/img.jpg',
  lifestyleImage: '/lifestyle.jpg',
  isBundle: false,
  collectionImage: '/col.jpg',
  collectionImageAlt: 'collection',
  price: 10,
  totalBundlePrice: 0,
  salePrice: 0,
  colors: [],
  colorThumbnails: {},
  defaultColor: null,
  defaultColour: null,
  sizes: [],
  types: [],
  options: [],
  gender: 'unisex',
  ageGroup: 'adult',
  reviews: { rating: 5, count: 1 },
  priceRange: [10],
  salePriceRange: [],
  category: 'Camisetas',
  ...overrides,
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

beforeEach(() => {
  localStorage.clear();
});

describe('useCart', () => {
  it('add new item → count 1, total equals price', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.add(makeProduct({ price: 25 }));
    });

    expect(result.current.count).toBe(1);
    expect(result.current.total).toBe(25);
    expect(result.current.items).toHaveLength(1);
  });

  it('add same item twice → quantity 2, count 2, total = 2 * price', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = makeProduct({ price: 15 });

    act(() => {
      result.current.add(product);
      result.current.add(product);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.count).toBe(2);
    expect(result.current.total).toBe(30);
  });

  it('remove → item is gone from the list', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.add(makeProduct({ id: 1 }));
      result.current.add(makeProduct({ id: 2, name: 'Other' }));
    });

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.remove(1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe(2);
  });

  it('setQty clamps to >= 1 — setQty(id, 0) yields quantity 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.add(makeProduct({ id: 1 }));
    });

    act(() => {
      result.current.setQty(1, 0);
    });

    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.count).toBe(1);
  });

  it('setQty clamps negative values to 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.add(makeProduct({ id: 1 }));
    });

    act(() => {
      result.current.setQty(1, -5);
    });

    expect(result.current.items[0].quantity).toBe(1);
  });

  it('total computes price * quantity across multiple items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.add(makeProduct({ id: 1, price: 10 }));
      result.current.add(makeProduct({ id: 1, price: 10 }));
      result.current.add(makeProduct({ id: 2, name: 'Hoodie', price: 30 }));
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.count).toBe(3);
    expect(result.current.total).toBe(50);
  });

  it('persists state to localStorage["cart"] after changes', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.add(makeProduct({ id: 1, price: 20 }));
    });

    const stored = JSON.parse(localStorage.getItem('cart') ?? '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe(1);
    expect(stored[0].quantity).toBe(1);
  });

  it('fresh provider hydrates from localStorage', () => {
    const existing = [{ ...makeProduct({ id: 3, price: 40 }), quantity: 2 }];
    localStorage.setItem('cart', JSON.stringify(existing));

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe(3);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.count).toBe(2);
    expect(result.current.total).toBe(80);
  });
});

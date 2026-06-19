import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import type { Product, CartItem } from '@/types/product';

interface AddNotification {
  product: Product;
  nonce: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; id: number }
  | { type: 'SET_QTY'; id: number; n: number }
  | { type: 'HYDRATE'; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.items };
    case 'ADD': {
      const existing = state.items.find((item) => item.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { ...action.product, quantity: 1 }] };
    }
    case 'REMOVE':
      return { items: state.items.filter((item) => item.id !== action.id) };
    case 'SET_QTY': {
      const qty = Math.max(1, action.n);
      return {
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, quantity: qty } : item
        ),
      };
    }
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (id: number) => void;
  setQty: (id: number, n: number) => void;
  count: number;
  total: number;
  lastAdded: Product | null;
  addNotification: AddNotification | null;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [lastAdded, setLastAdded] = useState<Product | null>(null);
  const [addNotification, setAddNotification] = useState<AddNotification | null>(null);
  const nonceRef = useRef(0);
  const hydratedRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        dispatch({ type: 'HYDRATE', items: parsed });
      }
    } catch {
      // ignore corrupt data
    }
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) {
      hydratedRef.current = true;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore storage errors
    }
  }, [state.items]);

  const add = useCallback((product: Product) => {
    dispatch({ type: 'ADD', product });
    setLastAdded(product);
    nonceRef.current += 1;
    setAddNotification({ product, nonce: nonceRef.current });
  }, []);

  const remove = useCallback((id: number) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  const setQty = useCallback((id: number, n: number) => {
    dispatch({ type: 'SET_QTY', id, n });
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const count = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        add,
        remove,
        setQty,
        count,
        total,
        lastAdded,
        addNotification,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return ctx;
}

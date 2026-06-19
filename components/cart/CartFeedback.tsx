'use client';

import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/lib/cart-context';

export default function CartFeedback() {
  const { addNotification } = useCart();
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!addNotification) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(true);
    timerRef.current = setTimeout(() => setVisible(false), 2000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [addNotification]);

  if (!visible || !addNotification) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 bg-secondary text-white px-4 py-4 rounded-lg animate-slide-in z-[1100]"
    >
      ✅ {addNotification.product.name} agregado
    </div>
  );
}

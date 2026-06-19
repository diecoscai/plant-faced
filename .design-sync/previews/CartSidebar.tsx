import React, { useEffect } from 'react';
import { CartSidebar, useCart } from 'plant-faced';
import type { Product } from 'plant-faced';

const sampleProduct: Product = {
  id: 1,
  name: "Seitan's Finest - White Boxy Tee",
  urlName: 'seitans-finest-white-crop-top',
  description: '100% certified organic cotton tee.',
  image: 'https://images.teemill.com/77051b81e961661e017a961519b4358ccc3b71a57b9102d4.png.jpg?w=640&h=auto',
  lifestyleImage: '',
  isBundle: false,
  collectionImage: '',
  collectionImageAlt: '',
  price: 28,
  totalBundlePrice: 0,
  salePrice: 0,
  colors: ['White'],
  colorThumbnails: { White: { type: 'color', value: '#ffffff' } },
  defaultColor: null,
  defaultColour: null,
  sizes: ['M'],
  types: ['Printed T-shirt'],
  options: [],
  gender: 'female',
  ageGroup: 'adults',
  reviews: { rating: 4.6, count: 34 },
  priceRange: [28],
  salePriceRange: [],
  category: 'Camisetas',
};

const containerStyle: React.CSSProperties = {
  position: 'relative',
  height: 600,
  overflow: 'hidden',
  transform: 'translateZ(0)',
};

function CartWithItem() {
  const { add, openCart } = useCart();
  useEffect(() => {
    add(sampleProduct);
    openCart();
  }, []);
  return <CartSidebar />;
}

export function WithItem() {
  return (
    <div style={containerStyle}>
      <CartWithItem />
    </div>
  );
}

function CartEmpty() {
  const { openCart } = useCart();
  useEffect(() => {
    openCart();
  }, []);
  return <CartSidebar />;
}

export function Empty() {
  return (
    <div style={containerStyle}>
      <CartEmpty />
    </div>
  );
}

import React from 'react';
import { ProductCard } from 'plant-faced';
import type { Product } from 'plant-faced';

const whiteTee: Product = {
  id: 1,
  name: "Seitan's Finest - White Boxy Tee",
  urlName: 'seitans-finest-white-crop-top',
  description: "Minimalist print tee. 100% certified organic cotton, printed with water-based eco inks.",
  image: 'https://images.teemill.com/77051b81e961661e017a961519b4358ccc3b71a57b9102d4.png.jpg?w=640&h=auto',
  lifestyleImage: 'https://images.teemill.com/5cpusfoyjbdecs4eu9trcannhq6fh4xug91ymxogvv0p2xix.jpeg.jpg?w=640&h=auto',
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
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  types: ['Printed T-shirt'],
  options: [],
  gender: 'female',
  ageGroup: 'adults',
  reviews: { rating: 4.6, count: 34 },
  priceRange: [28],
  salePriceRange: [],
  category: 'Camisetas',
};

const hoodieOnSale: Product = {
  id: 4,
  name: 'Plant Life Oversized Hoodie - Forest',
  urlName: 'plant-life-hoodie-forest',
  description: 'Heavyweight unisex hoodie in forest green. Made from 100% organic cotton.',
  image: 'https://images.teemill.com/38da7eae1ef8c3f906324c9988293da9d571b4ba92bc8e39.png.jpg?w=640&h=auto',
  lifestyleImage: '',
  isBundle: false,
  collectionImage: '',
  collectionImageAlt: '',
  price: 52,
  totalBundlePrice: 0,
  salePrice: 38,
  colors: ['Forest', 'Charcoal'],
  colorThumbnails: {
    Forest: { type: 'color', value: '#2d5a27' },
    Charcoal: { type: 'color', value: '#333' },
  },
  defaultColor: null,
  defaultColour: null,
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  types: ['Hoodie'],
  options: [],
  gender: 'unisex',
  ageGroup: 'adults',
  reviews: { rating: 4.9, count: 87 },
  priceRange: [38, 52],
  salePriceRange: [38],
  category: 'Buzos',
};

export function DefaultCard() {
  return (
    <div style={{ maxWidth: 300, padding: '16px' }}>
      <ProductCard product={whiteTee} />
    </div>
  );
}

export function WithSalePrice() {
  return (
    <div style={{ maxWidth: 300, padding: '16px' }}>
      <ProductCard product={hoodieOnSale} />
    </div>
  );
}

export interface ColorThumbnail {
  type: 'color' | 'image';
  value: string;
}

export interface Reviews {
  rating: number;
  count: number;
}

export interface Product {
  id: number;
  name: string;
  urlName: string;
  description: string;
  image: string;
  lifestyleImage: string;
  isBundle: boolean;
  collectionImage: string;
  collectionImageAlt: string;
  price: number;
  totalBundlePrice: number;
  salePrice: number;
  colors: string[];
  colorThumbnails: Record<string, ColorThumbnail>;
  defaultColor: string | null;
  defaultColour: string | null;
  sizes: string[];
  types: string[];
  options: unknown[];
  gender: string;
  ageGroup: string;
  reviews: Reviews;
  priceRange: number[];
  salePriceRange: number[];
  category: string;
}

export type CartItem = Product & { quantity: number };

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'North Indian' | 'Chinese' | 'South Indian' | 'Sweets' | 'Beverages';
  isSignature?: boolean;
  isVegetarian: boolean;
  image?: string;
  spicyLevel?: 0 | 1 | 2 | 3; // 0 = not spicy, 3 = very spicy
}

export interface SweetItem {
  id: string;
  name: string;
  description: string;
  pricePerKg: number;
  image: string;
  availableWeights: number[]; // in kg, e.g. [0.25, 0.5, 1.0, 2.0]
  isBestSeller?: boolean;
}

export interface BasketItem {
  sweet?: SweetItem;
  menuItem?: MenuItem;
  weight?: number; // in kg
  quantity: number;
}

export interface Reservation {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Sweets' | 'Meals' | 'Ambience' | 'All' | 'Storefront' | 'Sweets Counter' | 'Interiors';
  image: string;
  caption: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  tagline: string;
  schema: string;
}

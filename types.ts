export interface Product {
  id: string;
  sku: string;
  name: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  category: string;
  images: string[];
  sizes?: string[];
  colors?: string[];
  tags: string[];
  isNew?: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export enum CurrencyCode {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  INR = 'INR',
  NZD = 'NZD'
}

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // Relative to USD
}

export interface FilterState {
  category: string | null;
  minPrice: number;
  maxPrice: number;
  sort: 'newest' | 'price-low' | 'price-high';
}
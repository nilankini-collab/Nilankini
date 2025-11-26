import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, CurrencyCode, CurrencyConfig, Product } from '../types';
import { CURRENCIES } from '../constants';

interface ShopContextType {
  cart: CartItem[];
  currency: CurrencyConfig;
  isCartOpen: boolean;
  addToCart: (product: Product, size?: string, color?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  setCurrency: (code: CurrencyCode) => void;
  toggleCart: () => void;
  cartTotal: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currency, setCurrencyState] = useState<CurrencyConfig>(CURRENCIES.USD);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Simulate Geo-location for currency detection
  useEffect(() => {
    // In a real app, this would use an IP-API
    const timer = setTimeout(() => {
      // Mocking a detected location
      console.log('Auto-detected currency: USD'); 
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(CURRENCIES[code]);
  };

  const addToCart = (product: Product, size?: string, color?: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === size && item.selectedColor === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      })
    );
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = cart.reduce((acc, item) => {
    const price = item.salePrice || item.price;
    return acc + price * item.quantity;
  }, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        currency,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        setCurrency,
        toggleCart,
        cartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

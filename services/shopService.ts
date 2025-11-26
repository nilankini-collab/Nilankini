import { CurrencyConfig } from '../types';

export const formatPrice = (price: number, currency: CurrencyConfig): string => {
  const convertedPrice = price * currency.rate;
  
  // Format based on currency for display
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedPrice);
};

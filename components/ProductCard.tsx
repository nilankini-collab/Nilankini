import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../services/shopService';
import { ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProductCard = ({ product }: { product: Product }) => {
  const { currency, addToCart } = useShop();

  return (
    <div className="group relative">
      <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100 relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-white px-2 py-1 text-xs font-semibold uppercase tracking-wider text-brand-900">
            New
          </span>
        )}
        {product.salePrice && (
          <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold uppercase tracking-wider">
            Sale
          </span>
        )}
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-full bg-white/90 backdrop-blur-sm py-3 text-sm font-medium text-brand-900 hover:bg-brand-900 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={16} />
            Quick Add
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            <Link to={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <div className="text-right">
          <div className="flex flex-col items-end">
             {product.salePrice ? (
               <>
                 <p className="text-sm font-medium text-red-600">{formatPrice(product.salePrice, currency)}</p>
                 <p className="text-xs text-gray-500 line-through">{formatPrice(product.price, currency)}</p>
               </>
             ) : (
                <p className="text-sm font-medium text-gray-900">{formatPrice(product.price, currency)}</p>
             )}
          </div>
          <div className="flex items-center mt-1 text-yellow-500 text-xs gap-0.5">
            <Star size={10} fill="currentColor" />
            <span className="text-gray-400 ml-1">{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
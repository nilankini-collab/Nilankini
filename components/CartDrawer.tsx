import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Minus, Plus, Trash2, Lock } from 'lucide-react';
import { formatPrice } from '../services/shopService';
import { Button } from './Button';
import { Link } from 'react-router-dom';

export const CartDrawer = () => {
  const { isCartOpen, toggleCart, cart, currency, updateQuantity, removeFromCart, cartTotal } = useShop();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={toggleCart} />
      
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform transition-transform bg-white shadow-xl flex flex-col">
          
          <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 font-serif">Shopping Bag</h2>
            <button onClick={toggleCart} className="text-gray-400 hover:text-gray-500">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Your bag is empty.</p>
                <Button onClick={toggleCart} variant="outline">Continue Shopping</Button>
              </div>
            ) : (
              <ul className="space-y-8">
                {cart.map((item, idx) => (
                  <li key={`${item.id}-${idx}`} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">{formatPrice(item.salePrice || item.price, currency)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.selectedColor} / {item.selectedSize}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border border-gray-300 rounded-sm">
                          <button 
                            className="p-1 hover:bg-gray-50"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 font-medium">{item.quantity}</span>
                          <button 
                            className="p-1 hover:bg-gray-50"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="font-medium text-red-500 hover:text-red-600 flex items-center gap-1"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={14} />
                          <span className="text-xs">Remove</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-50">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>{formatPrice(cartTotal, currency)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 mb-6">
                Shipping and taxes calculated at checkout.
              </p>
              <Link to="/checkout" onClick={toggleCart}>
                <Button className="w-full flex items-center justify-center gap-2">
                    <Lock size={16} />
                    Checkout
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
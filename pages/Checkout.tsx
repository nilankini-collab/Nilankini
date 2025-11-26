import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../services/shopService';
import { Button } from '../components/Button';
import { CreditCard, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Checkout = () => {
  const { cart, cartTotal, currency } = useShop();
  const [step, setStep] = useState(1);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-serif mb-4">Your bag is empty</h1>
        <Link to="/shop"><Button>Continue Shopping</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-center mb-10">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Forms */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white p-6 shadow-sm rounded-sm">
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <span className="bg-brand-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                Contact Information
              </h2>
              <div className="space-y-4">
                <input type="email" placeholder="Email Address" className="w-full border p-3 rounded-sm" />
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" defaultChecked /> Keep me up to date on news and exclusive offers
                </label>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white p-6 shadow-sm rounded-sm">
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <span className="bg-brand-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First name" className="w-full border p-3 rounded-sm" />
                <input type="text" placeholder="Last name" className="w-full border p-3 rounded-sm" />
                <input type="text" placeholder="Address" className="w-full border p-3 rounded-sm col-span-2" />
                <input type="text" placeholder="City" className="w-full border p-3 rounded-sm" />
                <input type="text" placeholder="Postal Code" className="w-full border p-3 rounded-sm" />
                <select className="w-full border p-3 rounded-sm col-span-2">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>India</option>
                  <option>New Zealand</option>
                </select>
              </div>
            </div>

            {/* Payment (Mock) */}
            <div className="bg-white p-6 shadow-sm rounded-sm">
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <span className="bg-brand-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                Payment
              </h2>
              
              <div className="border border-brand-200 rounded-sm p-4 bg-brand-50 mb-4">
                <p className="text-sm text-gray-600 mb-2">Express Checkout</p>
                <div className="flex gap-2">
                   <button className="flex-1 bg-black text-white py-2 rounded font-medium">Apple Pay</button>
                   <button className="flex-1 bg-blue-600 text-white py-2 rounded font-medium">GPay</button>
                </div>
              </div>

              <div className="space-y-3">
                 <label className="flex items-center gap-3 p-4 border border-brand-900 bg-brand-50 rounded-sm cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="text-brand-900 focus:ring-brand-900" />
                    <div className="flex-1">
                        <span className="font-medium block text-gray-900">Credit Card (Stripe)</span>
                        <div className="flex gap-1 mt-1">
                           <div className="w-8 h-5 bg-gray-200 rounded"></div>
                           <div className="w-8 h-5 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                 </label>
                 <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-sm cursor-pointer opacity-70">
                    <input type="radio" name="payment" className="text-brand-900" />
                    <span className="font-medium text-gray-900">Razorpay</span>
                 </label>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-100">
                  <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="text-gray-400" size={20} />
                      </div>
                      <input type="text" placeholder="Card number" className="pl-10 w-full border p-2 rounded bg-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                       <input type="text" placeholder="MM / YY" className="w-full border p-2 rounded bg-white" />
                       <input type="text" placeholder="CVC" className="w-full border p-2 rounded bg-white" />
                  </div>
              </div>

            </div>

            <Button size="lg" className="w-full">Pay {formatPrice(cartTotal, currency)}</Button>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:pl-8">
            <div className="bg-white p-6 shadow-sm rounded-sm sticky top-24">
              <h2 className="text-lg font-medium mb-6">Order Summary</h2>
              <ul className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                {cart.map((item, idx) => (
                  <li key={`${item.id}-${idx}`} className="flex gap-4">
                    <div className="relative w-16 h-20 rounded border border-gray-200 overflow-hidden">
                       <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                       <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                         {item.quantity}
                       </span>
                    </div>
                    <div className="flex-1">
                       <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                       <p className="text-xs text-gray-500">{item.selectedColor} / {item.selectedSize}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                        {formatPrice((item.salePrice || item.price) * item.quantity, currency)}
                    </p>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-2 py-4 border-t border-gray-100 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal, currency)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes (Estimated)</span>
                  <span>{formatPrice(cartTotal * 0.08, currency)}</span>
                </div>
              </div>

              <div className="py-4 border-t border-gray-100">
                 <div className="flex justify-between text-lg font-bold text-gray-900">
                   <span>Total</span>
                   <span>{formatPrice(cartTotal * 1.08, currency)}</span>
                 </div>
                 <p className="text-xs text-gray-400 mt-1">Including {formatPrice(cartTotal * 0.08, currency)} in taxes</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
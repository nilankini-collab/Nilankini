import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-semibold text-gray-900">Wow Stunning.</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Redefining women's fashion with timeless elegance and modern comfort. Designed for the confident, stylish woman.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-900"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-900"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-900"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/shop" className="hover:text-brand-900">New Arrivals</Link></li>
              <li><Link to="/shop?category=Dresses" className="hover:text-brand-900">Dresses</Link></li>
              <li><Link to="/shop?category=Lingerie" className="hover:text-brand-900">Lingerie</Link></li>
              <li><Link to="/shop?category=Accessories" className="hover:text-brand-900">Accessories</Link></li>
              <li><Link to="/shop?category=Sale" className="hover:text-brand-900 text-red-500">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Help</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-900">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-brand-900">Size Guide</a></li>
              <li><a href="#" className="hover:text-brand-900">FAQ</a></li>
              <li><a href="#" className="hover:text-brand-900">Contact Us</a></li>
              <li><a href="#" className="hover:text-brand-900">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Stay in the loop</h4>
            <p className="text-sm text-gray-500 mb-4">Sign up for exclusive offers and style news.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 min-w-0 px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-brand-900"
              />
              <button className="bg-brand-900 text-white px-4 py-2 text-sm font-medium hover:bg-brand-800 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">&copy; 2024 Wow Stunning Fashion. All rights reserved.</p>
          <div className="flex gap-4">
             {/* Payment Icons Simulation */}
             <div className="h-6 w-10 bg-gray-200 rounded"></div>
             <div className="h-6 w-10 bg-gray-200 rounded"></div>
             <div className="h-6 w-10 bg-gray-200 rounded"></div>
             <div className="h-6 w-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};
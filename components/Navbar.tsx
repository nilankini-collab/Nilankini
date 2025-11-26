import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES, CURRENCIES } from '../constants';
import { CurrencyCode } from '../types';

export const Navbar = () => {
  const { toggleCart, cart, currency, setCurrency } = useShop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white sticky top-0 z-40 border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-brand-900 text-brand-50 text-xs py-2 px-4 text-center">
        <p>Free Worldwide Shipping on Orders Over {currency.symbol}100</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Mobile Menu & Search */}
          <div className="flex items-center lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-500">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
            <Link to="/" className="text-2xl font-serif font-semibold tracking-tight text-gray-900">
              Wow Stunning.
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:space-x-8 lg:items-center lg:justify-center flex-1">
            <Link to="/" className={`text-sm font-medium ${location.pathname === '/' ? 'text-brand-900' : 'text-gray-500'} hover:text-gray-900`}>Home</Link>
            <Link to="/shop" className={`text-sm font-medium ${location.pathname.includes('/shop') ? 'text-brand-900' : 'text-gray-500'} hover:text-gray-900`}>Shop All</Link>
            <Link to="/shop?category=Dresses" className="text-sm font-medium text-gray-500 hover:text-gray-900">Dresses</Link>
            <Link to="/shop?category=Tops" className="text-sm font-medium text-gray-500 hover:text-gray-900">Tops</Link>
            <Link to="/shop?category=Lingerie" className="text-sm font-medium text-gray-500 hover:text-gray-900">Lingerie</Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            
            {/* Currency Switcher */}
            <div className="hidden md:flex items-center gap-1 group relative">
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
                <Globe size={16} />
                <span>{currency.code}</span>
                <ChevronDown size={14} />
              </button>
              <div className="absolute top-full right-0 w-24 bg-white shadow-lg rounded-md py-1 hidden group-hover:block border border-gray-100">
                {Object.keys(CURRENCIES).map((code) => (
                  <button
                    key={code}
                    onClick={() => setCurrency(code as CurrencyCode)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>

            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Search size={20} />
            </button>

            <button onClick={toggleCart} className="p-2 text-gray-400 hover:text-gray-500 relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-800 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-4">
          {CATEGORIES.slice(0, 6).map(cat => (
             <Link 
               key={cat} 
               to={cat === 'All' ? '/shop' : `/shop?category=${cat}`}
               onClick={() => setIsMenuOpen(false)}
               className="text-base font-medium text-gray-900 py-2 border-b border-gray-50"
             >
               {cat}
             </Link>
          ))}
          <div className="pt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">Region:</span>
            <select 
              value={currency.code}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="text-sm border border-gray-300 rounded p-1"
            >
              {Object.keys(CURRENCIES).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      )}
    </nav>
  );
};
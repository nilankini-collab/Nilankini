import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';

export const Home = () => {
  const newArrivals = PRODUCTS.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-brand-100 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/1920/1080?random=hero" 
            alt="Woman in elegant dress" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-xl text-white">
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
              Effortless <br/> Elegance
            </h1>
            <p className="text-lg md:text-xl mb-8 font-light text-gray-100">
              Discover the new collection. Timeless pieces designed for the modern woman.
            </p>
            <div className="flex gap-4">
              <Link to="/shop">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Link to="/shop?category=Dresses">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-brand-900">
                  View Dresses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-semibold text-center mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/shop?category=Dresses" className="group relative h-96 overflow-hidden bg-gray-200 rounded-sm">
              <img src="https://picsum.photos/600/800?random=cat1" alt="Dresses" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-serif font-medium text-white mb-2">Dresses</h3>
                <span className="text-white text-sm border-b border-white pb-1">Explore</span>
              </div>
            </Link>
            
            <Link to="/shop?category=Tops" className="group relative h-96 overflow-hidden bg-gray-200 rounded-sm">
              <img src="https://picsum.photos/600/800?random=cat2" alt="Tops" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-serif font-medium text-white mb-2">Tops</h3>
                <span className="text-white text-sm border-b border-white pb-1">Explore</span>
              </div>
            </Link>
            
            <Link to="/shop?category=Accessories" className="group relative h-96 overflow-hidden bg-gray-200 rounded-sm">
              <img src="https://picsum.photos/600/800?random=cat3" alt="Accessories" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-serif font-medium text-white mb-2">Accessories</h3>
                <span className="text-white text-sm border-b border-white pb-1">Explore</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-serif font-semibold mb-2">New Arrivals</h2>
              <p className="text-gray-500">The latest trends fresh from the studio.</p>
            </div>
            <Link to="/shop" className="text-brand-900 font-medium hover:text-brand-700 flex items-center gap-1">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Promo */}
      <section className="py-24 bg-brand-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Join the Wow Stunning Club</h2>
          <p className="text-brand-100 mb-8 text-lg">
            Subscribe to our newsletter and receive 10% off your first order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-6 py-4 rounded-sm text-gray-900 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
            <Button variant="secondary" size="lg">Sign Up</Button>
          </div>
          <p className="mt-4 text-xs text-brand-200">
            By signing up, you agree to our Privacy Policy.
          </p>
        </div>
      </section>
    </div>
  );
};
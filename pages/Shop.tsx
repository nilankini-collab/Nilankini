import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../constants';
import { SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let result = PRODUCTS;
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    setFilteredProducts(result);
  }, [selectedCategory]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
    setShowFilters(false);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-brand-50 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900">{selectedCategory === 'All' ? 'Shop All' : selectedCategory}</h1>
          <p className="text-gray-500 mt-2">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Filters Sidebar (Desktop) */}
          <div className="hidden lg:block w-64 flex-shrink-0 space-y-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-3">
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => handleCategoryChange(cat)}
                      className={`text-sm ${selectedCategory === cat ? 'text-brand-900 font-bold underline' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>$0</span>
                <input type="range" min="0" max="500" className="w-full accent-brand-900" />
                <span>$500+</span>
              </div>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between border-b border-gray-200 pb-4">
             <button 
               onClick={() => setShowFilters(!showFilters)}
               className="flex items-center gap-2 text-sm font-medium text-gray-700"
             >
               <SlidersHorizontal size={16} /> Filters
             </button>
             <select className="text-sm border-none bg-transparent focus:ring-0 text-gray-700 font-medium">
               <option>Sort by: Newest</option>
               <option>Price: Low to High</option>
               <option>Price: High to Low</option>
             </select>
          </div>

          {showFilters && (
            <div className="lg:hidden space-y-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-3 py-1 rounded-full text-xs border ${selectedCategory === cat ? 'bg-brand-900 text-white' : 'bg-white border-gray-300'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found in this category.</p>
                <button 
                  onClick={() => handleCategoryChange('All')}
                  className="mt-4 text-brand-900 font-medium hover:underline"
                >
                  View all products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
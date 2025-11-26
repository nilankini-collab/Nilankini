import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../services/shopService';
import { Button } from '../components/Button';
import { Star, Truck, ShieldCheck, ArrowLeft, Heart } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, currency } = useShop();
  const product = PRODUCTS.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      if (product.sizes) setSelectedSize(product.sizes[0]);
      if (product.colors) setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
        <Link to="/shop">
          <Button>Return to Shop</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
  };

  return (
    <div className="bg-white min-h-screen pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/shop" className="inline-flex items-center text-gray-500 hover:text-brand-900 mb-8 text-sm">
          <ArrowLeft size={16} className="mr-2" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100 rounded-sm">
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 aspect-[3/4] flex-shrink-0 overflow-hidden border-2 ${activeImage === idx ? 'border-brand-900' : 'border-transparent'}`}
                  >
                    <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i >= Math.floor(product.rating) ? "text-gray-300" : ""} />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.reviewCount} Reviews</span>
            </div>

            <div className="text-2xl font-medium text-gray-900 mb-8">
              {product.salePrice ? (
                <div className="flex items-center gap-3">
                  <span className="text-red-600">{formatPrice(product.salePrice, currency)}</span>
                  <span className="text-gray-400 line-through text-lg">{formatPrice(product.price, currency)}</span>
                </div>
              ) : (
                formatPrice(product.price, currency)
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {product.shortDescription}
            </p>

            {/* Configurator */}
            <div className="space-y-6 mb-8">
              {product.colors && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Color: <span className="text-gray-500">{selectedColor}</span></label>
                  <div className="flex gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 text-sm border ${selectedColor === color ? 'border-brand-900 bg-brand-50 text-brand-900' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && (
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-900">Size: <span className="text-gray-500">{selectedSize}</span></label>
                    <button className="text-xs text-brand-900 underline">Size Guide</button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-sm border ${selectedSize === size ? 'border-brand-900 bg-brand-900 text-white' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4 mb-8">
              <Button onClick={handleAddToCart} size="lg" className="flex-1">Add to Bag</Button>
              <Button variant="outline" size="lg" className="px-4">
                <Heart size={20} />
              </Button>
            </div>

            {/* Value Props */}
            <div className="border-t border-gray-200 pt-8 space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="text-brand-900 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-gray-900">Free Shipping & Returns</h4>
                  <p className="text-sm text-gray-500">On all orders over {currency.symbol}100. Hassle-free returns within 30 days.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-brand-900 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-gray-900">Secure Checkout</h4>
                  <p className="text-sm text-gray-500">Protected by SSL encryption. We accept Visa, Mastercard, and Stripe.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
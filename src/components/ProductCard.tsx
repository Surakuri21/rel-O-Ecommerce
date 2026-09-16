import { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { Product } from '../data/products';
import { addToCart } from '../store/cartStore';
import { toggleWishlist, isInWishlist, wishlistStore } from '../store/wishlistStore';
import { toggleCart } from '../store/uiStore';
import { addToast } from './Shared';

interface ProductCardProps {
  product: Product;
  index?: number;
  showRank?: boolean;
}

export default function ProductCard({ product, index = 0, showRank = false }: ProductCardProps) {
  const wishlistItems = useStore(wishlistStore);
  const isWishlisted = isInWishlist(product.id);
  const [imgIndex, setImgIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toggleCart();
    addToast(null, `${product.name} added to bag`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    addToast(null, isWishlisted ? 'Removed from wishlist' : 'Added to wishlist', 'info');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setImgIndex(0); }}
    >
      {showRank && (
        <div className="absolute top-3 left-3 z-10 font-serif text-2xl text-champagne/60">
          #{String(index + 1).padStart(2, '0')}
        </div>
      )}

      {/* Badges */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
        {product.badges.includes('new') && (
          <span className="bg-obsidian text-ivory text-[9px] tracking-[0.15em] uppercase px-2 py-1">New</span>
        )}
        {product.badges.includes('sale') && product.compareAtPrice && (
          <span className="bg-red-800 text-ivory text-[9px] tracking-[0.15em] uppercase px-2 py-1">Sale</span>
        )}
        {product.badges.includes('bestseller') && (
          <span className="bg-champagne text-obsidian text-[9px] tracking-[0.15em] uppercase px-2 py-1">Bestseller</span>
        )}
        {product.badges.includes('limited') && (
          <span className="bg-graphite text-ivory text-[9px] tracking-[0.15em] uppercase px-2 py-1">Limited</span>
        )}
      </div>

      {/* Image */}
      <a href={`/product/${product.slug}`} className="block relative overflow-hidden bg-cream aspect-[3/4]">
        <img
          src={product.images[imgIndex]}
          alt={product.name}
          className="product-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onMouseOver={() => product.images.length > 1 && setImgIndex(1)}
        />
        
        {/* Hover overlay */}
        <div className="product-overlay absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 flex items-end justify-center pb-6 gap-3">
          <button onClick={handleAddToCart}
            className="bg-ivory text-obsidian p-3 rounded-full shadow-lg hover:bg-champagne transition-colors" aria-label="Add to cart">
            <ShoppingBag size={16} />
          </button>
          <a href={`/product/${product.slug}`}
            className="bg-ivory text-obsidian p-3 rounded-full shadow-lg hover:bg-champagne transition-colors" aria-label="Quick view">
            <Eye size={16} />
          </a>
          <button onClick={handleToggleWishlist}
            className={`p-3 rounded-full shadow-lg transition-colors ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-ivory text-obsidian hover:bg-champagne'}`} aria-label="Wishlist">
            <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
      </a>

      {/* Info */}
      <a href={`/product/${product.slug}`} className="block mt-4 space-y-1">
        <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray">{product.brand}</p>
        <h3 className="font-medium text-sm group-hover:text-champagne transition-colors">{product.name}</h3>
        <div className="flex items-center gap-1">
          <Star size={10} className="text-champagne fill-champagne" />
          <span className="text-xs text-warm-gray">{product.rating} ({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">${product.price.toLocaleString()}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-warm-gray line-through">${product.compareAtPrice.toLocaleString()}</span>
          )}
        </div>
      </a>
    </motion.div>
  );
}

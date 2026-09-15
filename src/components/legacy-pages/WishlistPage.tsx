import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist, useStore } from '../store/StoreContext';
import { products } from '../data/products';
import { addToast } from '../components/Shared';

export default function WishlistPage() {
  const { items: wishlistIds, dispatch } = useWishlist();
  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="pt-32 pb-24 text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Heart size={48} className="mx-auto text-warm-gray mb-6" />
          <p className="font-serif text-3xl mb-4">YOUR WISHLIST AWAITS</p>
          <p className="text-warm-gray mb-8">Save your favorite timepieces for later.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border-b border-obsidian pb-1">
            Explore Watches <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 lg:pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6">
        <h1 className="font-serif text-3xl lg:text-4xl tracking-wide mb-2">Wishlist</h1>
        <p className="text-warm-gray text-sm mb-12">{wishlistProducts.length} timepiece{wishlistProducts.length !== 1 ? 's' : ''} saved</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistProducts.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="flex gap-4 p-4 border border-gray-100 hover:border-gray-200 transition-colors">
              <Link to={`/product/${product.slug}`} className="shrink-0">
                <img src={product.images[0]} alt={product.name} className="w-24 h-24 object-cover bg-cream" />
              </Link>
              <div className="flex-1">
                <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray">{product.brand}</p>
                <Link to={`/product/${product.slug}`} className="font-medium text-sm hover:text-champagne transition-colors">{product.name}</Link>
                <p className="text-sm mt-1">${product.price.toLocaleString()}</p>
                <div className="flex gap-3 mt-3">
                  <button onClick={() => { dispatch({ type: 'ADD_TO_CART', product }); addToast(dispatch, 'Added to bag'); }}
                    className="flex items-center gap-1 text-xs bg-obsidian text-ivory px-3 py-1.5 hover:bg-charcoal transition-colors">
                    <ShoppingBag size={12} /> Add to Bag
                  </button>
                  <button onClick={() => { dispatch({ type: 'TOGGLE_WISHLIST', productId: product.id }); addToast(dispatch, 'Removed from wishlist', 'info'); }}
                    className="flex items-center gap-1 text-xs text-warm-gray hover:text-red-500 transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

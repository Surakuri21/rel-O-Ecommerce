import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, ChevronRight, Minus, Plus, Shield, Truck, RotateCcw, Award, X } from 'lucide-react';
import { products } from '../data/products';
import { useStore, useWishlist } from '../store/StoreContext';
import { addToast } from '../components/Shared';
import ProductCard from '../components/ProductCard';

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const { dispatch } = useStore();
  const { items: wishlistItems } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (product) {
      dispatch({ type: 'ADD_RECENTLY_VIEWED', productId: product.id });
    }
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center px-6">
        <h1 className="font-serif text-3xl mb-4">TIME SEEMS TO HAVE STOPPED</h1>
        <p className="text-warm-gray mb-6">The timepiece you're looking for could not be found.</p>
        <Link to="/shop" className="text-xs tracking-[0.2em] uppercase border-b border-obsidian pb-1">Return to Shop</Link>
      </div>
    );
  }

  const isWishlisted = wishlistItems.includes(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product, quantity });
    addToast(dispatch, `${product.name} added to bag`);
  };

  const handleBuyNow = () => {
    dispatch({ type: 'ADD_TO_CART', product, quantity });
    addToast(dispatch, `${product.name} added to bag`);
  };

  return (
    <div className="pt-28 lg:pt-32 pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-6 mb-8">
        <nav className="flex items-center gap-2 text-xs text-warm-gray">
          <Link to="/" className="hover:text-obsidian">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-obsidian">Shop</Link>
          <ChevronRight size={12} />
          <Link to={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-obsidian">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-obsidian">{product.name}</span>
        </nav>
      </div>

      {/* Product Layout */}
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-cream overflow-hidden cursor-zoom-in" onClick={() => setFullscreen(true)}>
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badges.includes('limited') && (
                <span className="absolute top-4 left-4 bg-obsidian text-ivory text-[9px] tracking-[0.15em] uppercase px-3 py-1.5">Limited Edition</span>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 shrink-0 border-2 transition-colors ${selectedImage === i ? 'border-obsidian' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-2">{product.brand}</p>
              <h1 className="font-serif text-3xl lg:text-4xl tracking-wide mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-champagne fill-champagne' : 'text-gray-200'} />
                  ))}
                </div>
                <span className="text-sm text-warm-gray">{product.rating} ({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-light">${product.price.toLocaleString()}</span>
                {product.compareAtPrice && (
                  <span className="text-lg text-warm-gray line-through">${product.compareAtPrice.toLocaleString()}</span>
                )}
              </div>

              <p className="text-xs text-warm-gray mb-2">or from ${Math.round(product.price / 12).toLocaleString()}/mo with financing</p>

              {/* Availability */}
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                <span className="text-sm">
                  {product.stock > 5 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                </span>
                <span className="text-xs text-warm-gray">SKU: {product.sku}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-warm-gray leading-relaxed mb-8">{product.description}</p>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center border border-gray-200">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-cream transition-colors"><Minus size={14} /></button>
                  <span className="px-4 py-3 text-sm min-w-[40px] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-cream transition-colors"><Plus size={14} /></button>
                </div>
              </div>

              <div className="flex gap-3 mb-4">
                <button onClick={handleAddToCart}
                  className="flex-1 bg-obsidian text-ivory py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-charcoal transition-colors flex items-center justify-center gap-2">
                  <ShoppingBag size={14} /> Add to Bag
                </button>
                <button onClick={() => { dispatch({ type: 'TOGGLE_WISHLIST', productId: product.id }); addToast(dispatch, isWishlisted ? 'Removed from wishlist' : 'Added to wishlist', 'info'); }}
                  className={`w-14 h-14 border flex items-center justify-center transition-colors ${isWishlisted ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 hover:border-obsidian'}`}>
                  <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              <button onClick={handleBuyNow}
                className="w-full border border-obsidian py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-obsidian hover:text-ivory transition-colors mb-8">
                Buy Now
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-100">
                {[
                  { icon: Shield, text: 'Authenticity Guaranteed' },
                  { icon: Truck, text: 'Free Shipping' },
                  { icon: RotateCcw, text: '30-Day Returns' },
                  { icon: Award, text: '5-Year Warranty' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <Icon size={14} className="text-champagne" />
                    <span className="text-[10px] tracking-wide text-warm-gray">{text}</span>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="mt-8 border-t border-gray-100">
                <div className="flex gap-8 pt-6">
                  {['details', 'specifications', 'shipping', 'warranty'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`text-[10px] tracking-[0.2em] uppercase pb-2 border-b transition-colors ${activeTab === tab ? 'border-obsidian text-obsidian' : 'border-transparent text-warm-gray hover:text-obsidian'}`}>
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="py-6 text-sm text-warm-gray leading-relaxed">
                  {activeTab === 'details' && (
                    <div>
                      <ul className="space-y-2">
                        {product.features.map((f, i) => <li key={i} className="flex items-center gap-2"><span className="w-1 h-1 bg-champagne rounded-full" />{f}</li>)}
                      </ul>
                    </div>
                  )}
                  {activeTab === 'specifications' && (
                    <div className="space-y-3">
                      {Object.entries(product.specifications).map(([key, val]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-50">
                          <span className="text-warm-gray">{key}</span>
                          <span className="text-obsidian font-medium">{val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="space-y-3">
                      <p>Complimentary express shipping on all orders over $5,000.</p>
                      <p>Standard delivery: 3–5 business days</p>
                      <p>Express delivery: 1–2 business days</p>
                      <p>White-glove delivery available for select timepieces.</p>
                    </div>
                  )}
                  {activeTab === 'warranty' && (
                    <div className="space-y-3">
                      <p>All AURELIS timepieces come with a comprehensive 5-year international warranty.</p>
                      <p>This covers manufacturing defects and movement accuracy. Our warranty is honored at any authorized AURELIS service center worldwide.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="font-serif text-2xl lg:text-3xl tracking-wide text-center mb-12">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Gallery */}
      {fullscreen && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center" onClick={() => setFullscreen(false)}>
          <img src={product.images[selectedImage]} alt="" className="max-w-full max-h-full object-contain" />
          <button onClick={() => setFullscreen(false)} className="absolute top-6 right-6 text-white"><X size={24} /></button>
          <div className="absolute bottom-6 flex gap-2">
            {product.images.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setSelectedImage(i); }}
                className={`w-3 h-3 rounded-full ${selectedImage === i ? 'bg-white' : 'bg-white/40'}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

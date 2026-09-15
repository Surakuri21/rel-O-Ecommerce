import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, Instagram, Facebook, Youtube } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { isCartOpen, isMobileMenuOpen, isSearchOpen, toggleCart, toggleMobileMenu, toggleSearch, closeAllOverlays } from '../store/uiStore';
import { cartStore, getCartItems, getTotalItems, getSubtotal, updateQuantity, removeFromCart, clearCart } from '../store/cartStore';
import { wishlistStore, getCount as getWishlistCount, toggleWishlist } from '../store/wishlistStore';
import { products } from '../data/products';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  
  // Subscribe to Nano Stores
  const $isCartOpen = useStore(isCartOpen);
  const $isMobileMenuOpen = useStore(isMobileMenuOpen);
  const $isSearchOpen = useStore(isSearchOpen);
  const cart = useStore(cartStore);
  const wishlist = useStore(wishlistStore);
  
  // Derived values
  const totalItems = getTotalItems();
  const wishlistCount = getWishlistCount();
  const items = getCartItems();
  const subtotal = getSubtotal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if ($isSearchOpen && searchRef.current) searchRef.current.focus();
  }, [$isSearchOpen]);

  const searchResults = searchQuery.length > 1
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const navLinks = [
    { label: 'Collections', path: '/collections', hasMega: true },
    { label: 'All Watches', path: '/shop' },
    { label: 'New Arrivals', path: '/new-arrivals' },
    { label: 'Best Sellers', path: '/best-sellers' },
    { label: 'Men', path: '/shop?gender=men' },
    { label: 'Women', path: '/shop?gender=women' },
    { label: 'About', path: '/about' },
    { label: 'Journal', path: '/journal' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-obsidian/95 backdrop-blur-sm text-ivory/90 text-center py-2 text-[10px] tracking-[0.25em] uppercase font-sans border-b border-white/5">
        Complimentary Express Shipping — Orders Over $5,000
      </div>

      {/* Main Header */}
      <header className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-ivory/95 backdrop-blur-md shadow-sm' : 'bg-black/20 backdrop-blur-[10px] border-b border-white/5'}`}>
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button onClick={() => toggleMobileMenu()} className="lg:hidden p-2" aria-label="Open menu">
              <Menu size={22} className={scrolled ? 'text-obsidian' : 'text-white/90'} />
            </button>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.slice(0, 4).map(link => (
                <a key={link.path} href={link.path} className={`text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:text-champagne ${scrolled ? 'text-obsidian' : 'text-white/90 hover:text-white'}`} style={!scrolled ? { textShadow: '0 1px 2px rgba(0,0,0,0.3)' } : {}}>
                  {link.label}
                  {link.hasMega && <ChevronDown size={12} className="inline ml-1" />}
                </a>
              ))}
            </nav>

            {/* Logo */}
            <a href="/" className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0">
              <h1 className={`font-serif text-2xl lg:text-3xl tracking-[0.3em] font-light transition-colors duration-300 ${scrolled ? 'text-obsidian' : 'text-white'}`} style={!scrolled ? { textShadow: '0 1px 3px rgba(0,0,0,0.4)' } : {}}>
                SURAKURI
              </h1>
            </a>

            {/* Right Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.slice(4).map(link => (
                <a key={link.path} href={link.path} className={`text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:text-champagne ${scrolled ? 'text-obsidian' : 'text-white/90 hover:text-white'}`} style={!scrolled ? { textShadow: '0 1px 2px rgba(0,0,0,0.3)' } : {}}>
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button onClick={() => toggleSearch()} className={`p-2 transition-colors ${scrolled ? 'hover:text-champagne' : 'text-white/90 hover:text-white'}`} aria-label="Search">
                <Search size={18} />
              </button>
              <a href="/account" className={`p-2 transition-colors hidden sm:block ${scrolled ? 'hover:text-champagne' : 'text-white/90 hover:text-white'}`} aria-label="Account">
                <User size={18} />
              </a>
              <a href="/wishlist" className={`p-2 transition-colors relative ${scrolled ? 'hover:text-champagne' : 'text-white/90 hover:text-white'}`} aria-label="Wishlist">
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-champagne text-obsidian text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                    {wishlistCount}
                  </span>
                )}
              </a>
              <button onClick={() => toggleCart()} className={`p-2 transition-colors relative ${scrolled ? 'hover:text-champagne' : 'text-white/90 hover:text-white'}`} aria-label="Cart">
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-champagne text-obsidian text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu - Disabled for now, needs state management */}
        {/* <AnimatePresence>
          {megaMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-ivory border-t border-gray-100 shadow-xl"
              onMouseEnter={() => setMegaMenu(true)}
              onMouseLeave={() => setMegaMenu(false)}>
              <div className="max-w-[1440px] mx-auto px-8 py-12 grid grid-cols-4 gap-8">
                <div>
                  <h3 className="font-serif text-lg mb-4">Collections</h3>
                  <ul className="space-y-2">
                    {['Signature', 'Heritage', 'Essentials', 'Sport'].map(c => (
                      <li key={c}><a href={`/collections/${c.toLowerCase()}`} className="text-sm text-warm-gray hover:text-obsidian transition-colors">{c}</a></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {['Automatic', 'Chronograph', 'Dress', 'Diver', 'Skeleton', 'GMT'].map(c => (
                      <li key={c}><a href={`/shop?category=${c.toLowerCase()}`} className="text-sm text-warm-gray hover:text-obsidian transition-colors">{c}</a></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-4">Featured</h3>
                  <ul className="space-y-2">
                    <li><a href="/new-arrivals" className="text-sm text-warm-gray hover:text-obsidian transition-colors">New Arrivals</a></li>
                    <li><a href="/best-sellers" className="text-sm text-warm-gray hover:text-obsidian transition-colors">Best Sellers</a></li>
                    <li><a href="/shop" className="text-sm text-warm-gray hover:text-obsidian transition-colors">Limited Edition</a></li>
                  </ul>
                </div>
                <div className="bg-cream rounded-lg p-6">
                  <p className="font-serif text-lg mb-2">The Sovereign Collection</p>
                  <p className="text-xs text-warm-gray mb-4">Discover our most coveted timepieces</p>
                  <a href="/shop" className="text-[10px] tracking-[0.2em] uppercase border-b border-obsidian pb-0.5">Explore</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence> --> */}
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {$isMobileMenuOpen && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-ivory">
            <div className="p-6">
              <div className="flex justify-between items-center mb-12">
                <span className="font-serif text-2xl tracking-[0.3em]">SURAKURI</span>
                <button onClick={() => toggleMobileMenu()} aria-label="Close menu"><X size={24} /></button>
              </div>
              <nav className="space-y-6">
                {navLinks.map(link => (
                  <a key={link.path} href={link.path} className="block text-xl font-serif tracking-wide">{link.label}</a>
                ))}
                <hr className="border-gray-200" />
                <a href="/account" className="block text-sm text-warm-gray">My Account</a>
                <a href="/wishlist" className="block text-sm text-warm-gray">Wishlist ({wishlistCount})</a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {$isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-ivory/98 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto pt-32 px-6">
              <div className="flex items-center gap-4 border-b-2 border-obsidian pb-4">
                <Search size={24} />
                <input
                  ref={searchRef}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search timepieces, collections..."
                  className="flex-1 bg-transparent text-2xl font-serif outline-none placeholder:text-warm-gray"
                />
                <button onClick={() => { toggleSearch(); setSearchQuery(''); }} aria-label="Close search"><X size={24} /></button>
              </div>

              {searchResults.length > 0 && (
                <div className="mt-8 space-y-4">
                  {searchResults.map(p => (
                    <a key={p.id} href={`/product/${p.slug}`} onClick={() => { toggleSearch(); setSearchQuery(''); }}
                      className="flex items-center gap-4 p-3 hover:bg-cream rounded-lg transition-colors">
                      <img src={p.images[0]} alt={p.name} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-sm text-warm-gray">{p.category} — ${p.price.toLocaleString()}</p>
                      </div>
                    </a>
                  ))}
                  <a href={`/shop?q=${searchQuery}`} onClick={() => { toggleSearch(); setSearchQuery(''); }}
                    className="block text-center text-sm tracking-[0.15em] uppercase mt-6 border-b border-obsidian pb-1 w-fit mx-auto">
                    View All Results
                  </a>
                </div>
              )}

              {searchQuery.length <= 1 && (
                <div className="mt-8">
                  <p className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-4">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Automatic', 'Chronograph', 'Limited Edition', 'Gold', 'New Arrivals'].map(s => (
                      <button key={s} onClick={() => setSearchQuery(s)}
                        className="px-4 py-2 border border-gray-200 rounded-full text-sm hover:border-champagne hover:text-champagne transition-colors">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer open={$isCartOpen} onClose={toggleCart} />
    </>
  );
}

function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = getCartItems();
  const subtotal = getSubtotal();
  const freeShippingThreshold = 5000;
  const remaining = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/40 z-[80]" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-ivory z-[90] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-serif text-xl tracking-wide">Shopping Bag ({items.length})</h2>
              <button onClick={onClose} aria-label="Close cart"><X size={20} /></button>
            </div>

            {/* Free shipping progress */}
            {remaining > 0 ? (
              <div className="px-6 py-3 bg-cream">
                <p className="text-xs text-warm-gray">You're <span className="font-semibold text-obsidian">${remaining.toLocaleString()}</span> away from complimentary shipping.</p>
                <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-champagne transition-all duration-500" style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }} />
                </div>
              </div>
            ) : (
              <div className="px-6 py-3 bg-green-50">
                <p className="text-xs text-green-800">✓ You qualify for complimentary shipping</p>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag size={48} className="mx-auto text-warm-gray mb-4" />
                  <p className="font-serif text-lg mb-2">Your bag is empty</p>
                  <p className="text-sm text-warm-gray mb-6">Discover a timepiece worthy of the moments ahead.</p>
                  <a href="/shop" onClick={onClose} className="text-xs tracking-[0.2em] uppercase border-b border-obsidian pb-1">Explore Watches</a>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.product.id} className="flex gap-4">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <p className="text-xs text-warm-gray">{item.product.brand}</p>
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center text-xs">−</button>
                        <span className="text-sm w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center text-xs">+</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">${(item.product.price * item.quantity).toLocaleString()}</p>
                      <button onClick={() => removeFromCart(item.product.id)}
                        className="text-xs text-warm-gray hover:text-red-500 mt-2">Remove</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="font-medium">${subtotal.toLocaleString()}</span>
                </div>
                <a href="/checkout" onClick={onClose}
                  className="block w-full bg-obsidian text-ivory text-center py-4 text-xs tracking-[0.2em] uppercase hover:bg-charcoal transition-colors">
                  Checkout
                </a>
                <a href="/cart" onClick={onClose}
                  className="block w-full border border-obsidian text-center py-4 text-xs tracking-[0.2em] uppercase hover:bg-obsidian hover:text-ivory transition-colors">
                  View Cart
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

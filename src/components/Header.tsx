import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, Instagram, Facebook, Youtube, Sun, Moon } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { isCartOpen, isMobileMenuOpen, isSearchOpen, toggleCart, toggleMobileMenu, toggleSearch, closeAllOverlays } from '../store/uiStore';
import { cartStore, getCartItems, getTotalItems, getSubtotal, updateQuantity, removeFromCart, clearCart } from '../store/cartStore';
import { wishlistStore, getCount as getWishlistCount, toggleWishlist } from '../store/wishlistStore';
import { products } from '../data/products';

// Dark mode store — persists to localStorage
export const isDarkMode = atom<boolean>(false);

isDarkMode.subscribe((dark) => {
  if (typeof window !== 'undefined') {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
});

// Initialize theme from localStorage
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme');
  isDarkMode.set(savedTheme === 'dark');
}

// Exported toggle for convenience
export function toggleTheme() {
  isDarkMode.set(!isDarkMode.get());
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  
  // Subscribe to Nano Stores
  const $isCartOpen = useStore(isCartOpen);
  const $isMobileMenuOpen = useStore(isMobileMenuOpen);
  const $isSearchOpen = useStore(isSearchOpen);
  const $isDarkMode = useStore(isDarkMode);
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

  const headerClasses = scrolled
    ? 'bg-ivory/95 backdrop-blur-md shadow-sm dark:bg-obsidian/95'
    : 'bg-black/20 backdrop-blur-[10px] border-b border-white/5 dark:bg-obsidian/95 dark:border-white/5';

  const textClass = scrolled ? 'text-obsidian dark:text-ivory' : 'text-white/90 hover:text-white dark:text-white/90 dark:hover:text-white';
  const textClassSolid = scrolled ? 'text-obsidian dark:text-ivory' : 'text-white dark:text-white';

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-obsidian text-ivory/90 text-center py-2 text-[10px] tracking-[0.25em] uppercase font-sans border-b border-white/5">
        Complimentary Express Shipping — Orders Over $5,000
      </div>

      {/* Main Header */}
      <header className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${headerClasses}`}>
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button + Logo (left section) */}
            <div className="flex items-center gap-4">
              <button onClick={() => toggleMobileMenu()} className="lg:hidden p-2" aria-label="Open menu">
                <Menu size={22} className={textClassSolid} />
              </button>

              {/* Brand Logo */}
              <a href="/" className="flex items-center gap-2">
                <img
                  src="{$isDarkMode ? '/logo-white.svg' : '/logo.svg'}"
                  alt="SURAKURI"
                  className="h-8 w-auto"
                />
              </a>
            </div>

            {/* Navigation - Desktop (Rubric #8: hidden on mobile) */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.slice(0, 4).map(link => (
                <a key={link.path} href={link.path} className={`text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:text-champagne ${textClass}`} style={!scrolled ? { textShadow: '0 1px 2px rgba(0,0,0,0.3)' } : {}}>
                  {link.label}
                  {link.hasMega && <ChevronDown size={12} className="inline ml-1" />}
                </a>
              ))}
            </nav>

            {/* Right Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.slice(4).map(link => (
                <a key={link.path} href={link.path} className={`text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:text-champagne ${textClass}`} style={!scrolled ? { textShadow: '0 1px 2px rgba(0,0,0,0.3)' } : {}}>
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button onClick={() => toggleSearch()} className={`p-2 transition-colors ${textClass}`} aria-label="Search">
                <Search size={18} />
              </button>
              <a href="/account" className={`p-2 transition-colors hidden sm:block ${textClass}`} aria-label="Account">
                <User size={18} />
              </a>
              <a href="/wishlist" className={`p-2 transition-colors relative ${textClass}`} aria-label="Wishlist">
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-champagne text-obsidian text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                    {wishlistCount}
                  </span>
                )}
              </a>
              <button onClick={() => toggleCart()} className={`p-2 transition-colors relative ${textClass}`} aria-label="Cart">
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-champagne text-obsidian text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Dark/Light mode toggle (Rubric #3) */}
              <button
                onClick={() => isDarkMode.set(!isDarkMode.get())}
                className={`p-2 transition-colors ${textClass}`}
                aria-label={isDarkMode.get() ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode.get() ? <Sun size={18} /> : <Moon size={18} />}
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
            className="fixed inset-0 z-[60] bg-ivory dark:bg-obsidian">
            <div className="p-6">
              <div className="flex justify-between items-center mb-12">
                <span className="font-serif text-2xl tracking-[0.3em]">SURAKURI</span>
                <button onClick={() => toggleMobileMenu()} aria-label="Close menu"><X size={24} /></button>
              </div>
              <nav className="space-y-6">
                {navLinks.map(link => (
                  <a key={link.path} href={link.path} className="block text-xl font-serif tracking-wide dark:text-ivory">{link.label}</a>
                ))}
                <hr className="border-gray-200 dark:border-gray-700" />
                <a href="/account" className="block text-sm text-warm-gray dark:text-warm-gray">My Account</a>
                <a href="/wishlist" className="block text-sm text-warm-gray dark:text-warm-gray">Wishlist ({wishlistCount})</a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {$isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-ivory/98 backdrop-blur-sm dark:bg-obsidian/98">
            <div className="max-w-3xl mx-auto pt-32 px-6">
              <div className="flex items-center gap-4 border-b-2 border-obsidian pb-4">
                <Search size={24} />
                <input
                  ref={searchRef}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search timepieces, collections..."
                  className="flex-1 bg-transparent text-2xl font-serif outline-none placeholder:text-warm-gray dark:text-ivory"
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
                        className="px-4 py-2 border border-gray-200 rounded-full text-sm hover:border-champagne hover:text-champagne transition-colors dark:border-gray-700">
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
    </>
  );
}

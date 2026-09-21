import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { cartStore, getTotalItems } from '../store/cartStore';
import { wishlistStore, getCount as getWishlistCount } from '../store/wishlistStore';

export default function MobileNav() {
  const cart = useStore(cartStore);
  const wishlist = useStore(wishlistStore);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const totalItems = getTotalItems();
  const wishlistCount = getWishlistCount();

  // Update current path on navigation (for Astro page transitions)
  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen for Astro's page navigation
    document.addEventListener('astro:after-swap', handleNavigation);

    // Also listen for popstate for browser back/forward
    window.addEventListener('popstate', handleNavigation);

    return () => {
      document.removeEventListener('astro:after-swap', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  const links = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/shop', icon: Search, label: 'Shop' },
    { path: '/wishlist', icon: Heart, label: 'Wishlist', badge: wishlistCount },
    { path: '/cart', icon: ShoppingBag, label: 'Bag', badge: totalItems },
    { path: '/account', icon: User, label: 'Account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[60] bg-ivory/95 backdrop-blur-md border-t border-gray-100 lg:hidden safe-area-pb">
      <div className="flex items-center justify-around py-2">
        {links.map(({ path, icon: Icon, label, badge }) => (
          <a
            key={path}
            href={path}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 relative ${
              currentPath === path ? 'text-obsidian' : 'text-warm-gray'
            }`}
          >
            <div className="relative">
              <Icon size={20} strokeWidth={currentPath === path ? 2 : 1.5} />
              {badge && badge > 0 ? (
                <span className="absolute -top-1.5 -right-2 bg-champagne text-obsidian text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {badge}
                </span>
              ) : null}
            </div>
            <span className="text-[9px] tracking-wider">{label}</span>
            {currentPath === path && (
              <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-champagne rounded-full" />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function PromoCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="bg-obsidian text-ivory py-3 px-6 text-center">
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <span className="text-[10px] tracking-[0.2em] uppercase">Complimentary Express Shipping — Ends in</span>
        <div className="flex gap-1">
          <span className="bg-white/10 px-2 py-0.5 text-xs font-mono">{pad(timeLeft.hours)}</span>
          <span className="text-champagne">:</span>
          <span className="bg-white/10 px-2 py-0.5 text-xs font-mono">{pad(timeLeft.minutes)}</span>
          <span className="text-champagne">:</span>
          <span className="bg-white/10 px-2 py-0.5 text-xs font-mono">{pad(timeLeft.seconds)}</span>
        </div>
      </div>
    </div>
  );
}

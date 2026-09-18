// src/store/StoreContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  cartStore, 
  addToCart as cartAddToCart, 
  removeFromCart as cartRemoveFromCart, 
  updateQuantity as cartUpdateQuantity, 
  clearCart as cartClearCart,
  getCartItems,
  getTotalItems,
  getSubtotal,
  type CartItem 
} from './cartStore';
import { 
  wishlistStore, 
  toggleWishlist as wishlistToggle, 
  isInWishlist, 
  getCount as getWishlistCount,
  clearWishlist as wishlistClearWishlist
} from './wishlistStore';
import { 
  isCartOpen, 
  isMobileMenuOpen, 
  isSearchOpen, 
  toggleCart, 
  toggleMobileMenu, 
  toggleSearch, 
  closeAllOverlays 
} from './uiStore';

// Types
interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  dispatch: (action: any) => void;
}

interface WishlistState {
  items: string[];
  count: number;
  dispatch: (action: any) => void;
}

interface UIState {
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  toggleCart: () => void;
  toggleMobileMenu: () => void;
  toggleSearch: () => void;
  closeAllOverlays: () => void;
}

// Create contexts
const CartContext = createContext<CartState | undefined>(undefined);
const WishlistContext = createContext<WishlistState | undefined>(undefined);
const UIContext = createContext<UIState | undefined>(undefined);

// Cart Provider
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [totalItems, setTotalItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const unsubscribe = cartStore.subscribe((state) => {
      setCart(state);
      setTotalItems(getTotalItems());
      setSubtotal(getSubtotal());
    });
    return () => unsubscribe();
  }, []);

  const dispatch = (action: any) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        cartAddToCart(action.payload.product, action.payload.quantity);
        break;
      case 'REMOVE_FROM_CART':
        cartRemoveFromCart(action.payload);
        break;
      case 'UPDATE_QUANTITY':
        cartUpdateQuantity(action.payload.productId, action.payload.quantity);
        break;
      case 'CLEAR_CART':
        cartClearCart();
        break;
    }
  };

  return (
    <CartContext.Provider value={{ items: getCartItems(), totalItems, subtotal, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// Wishlist Provider
export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsubscribe = wishlistStore.subscribe((state) => {
      setWishlistItems(state);
      setCount(getWishlistCount());
    });
    return () => unsubscribe();
  }, []);

  const dispatch = (action: any) => {
    switch (action.type) {
      case 'TOGGLE_WISHLIST':
        wishlistToggle(action.payload);
        break;
      case 'CLEAR_WISHLIST':
        wishlistClearWishlist();
        break;
    }
  };

  return (
    <WishlistContext.Provider value={{ items: wishlistItems, count, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
}

// UI Provider
export function UIProvider({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const unsubCart = isCartOpen.subscribe(setCartOpen);
    const unsubMenu = isMobileMenuOpen.subscribe(setMobileMenuOpen);
    const unsubSearch = isSearchOpen.subscribe(setSearchOpen);
    return () => {
      unsubCart();
      unsubMenu();
      unsubSearch();
    };
  }, []);

  return (
    <UIContext.Provider value={{ 
      isCartOpen: cartOpen, 
      isMobileMenuOpen: mobileMenuOpen, 
      isSearchOpen: searchOpen,
      toggleCart,
      toggleMobileMenu,
      toggleSearch,
      closeAllOverlays
    }}>
      {children}
    </UIContext.Provider>
  );
}

// Combined Store Provider
export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <UIProvider>
          {children}
        </UIProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

// Hooks
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}

export function useStore() {
  return {
    ...useCart(),
    ...useWishlist(),
    ...useUI()
  };
}

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  toasts: Toast[];
  searchHistory: string[];
  compareList: string[];
  newsletterPopupShown: boolean;
}

type Action =
  | { type: 'ADD_TO_CART'; product: Product; quantity?: number }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_WISHLIST'; productId: string }
  | { type: 'ADD_RECENTLY_VIEWED'; productId: string }
  | { type: 'ADD_TOAST'; toast: Toast }
  | { type: 'REMOVE_TOAST'; id: string }
  | { type: 'ADD_SEARCH_HISTORY'; query: string }
  | { type: 'TOGGLE_COMPARE'; productId: string }
  | { type: 'SET_NEWSLETTER_SHOWN' }
  | { type: 'LOAD_STATE'; state: Partial<StoreState> };

const initialState: StoreState = {
  cart: [],
  wishlist: [],
  recentlyViewed: [],
  toasts: [],
  searchHistory: [],
  compareList: [],
  newsletterPopupShown: false,
};

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(item => item.product.id === action.product.id);
      const qty = action.quantity || 1;
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + qty }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { product: action.product, quantity: qty }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.product.id !== action.productId) };
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return { ...state, cart: state.cart.filter(item => item.product.id !== action.productId) };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.productId ? { ...item, quantity: action.quantity } : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_WISHLIST': {
      const inWishlist = state.wishlist.includes(action.productId);
      return {
        ...state,
        wishlist: inWishlist
          ? state.wishlist.filter(id => id !== action.productId)
          : [...state.wishlist, action.productId],
      };
    }
    case 'ADD_RECENTLY_VIEWED': {
      const filtered = state.recentlyViewed.filter(id => id !== action.productId);
      return { ...state, recentlyViewed: [action.productId, ...filtered].slice(0, 10) };
    }
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.toast] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.id) };
    case 'ADD_SEARCH_HISTORY': {
      const filtered = state.searchHistory.filter(q => q !== action.query);
      return { ...state, searchHistory: [action.query, ...filtered].slice(0, 5) };
    }
    case 'TOGGLE_COMPARE': {
      const inList = state.compareList.includes(action.productId);
      if (inList) {
        return { ...state, compareList: state.compareList.filter(id => id !== action.productId) };
      }
      if (state.compareList.length >= 4) return state;
      return { ...state, compareList: [...state.compareList, action.productId] };
    }
    case 'SET_NEWSLETTER_SHOWN':
      return { ...state, newsletterPopupShown: true };
    case 'LOAD_STATE':
      return { ...state, ...action.state };
    default:
      return state;
  }
}

const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aurelis-store');
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', state: { ...parsed, toasts: [], newsletterPopupShown: false } });
      }
    } catch {}
  }, []);

  useEffect(() => {
    const { toasts, newsletterPopupShown, ...persist } = state;
    localStorage.setItem('aurelis-store', JSON.stringify(persist));
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export function useCart() {
  const { state, dispatch } = useStore();
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return { items: state.cart, totalItems, subtotal, dispatch };
}

export function useWishlist() {
  const { state, dispatch } = useStore();
  return { items: state.wishlist, count: state.wishlist.length, dispatch };
}

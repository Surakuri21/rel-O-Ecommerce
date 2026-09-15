// src/store/cartStore.ts
import { map } from 'nanostores';

export interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    brand: string;
    images: string[];
  };
  quantity: number;
}

// Persistent cart state stored as a map with product IDs as keys
export const cartStore = map<Record<string, CartItem>>({});

const STORAGE_KEY = 'surakuri-cart';

// Load cart from localStorage on initialization
function loadCartFromStorage(): Record<string, CartItem> {
  if (typeof window === 'undefined') return {};
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

// Save cart to localStorage
function saveCartToStorage(cart: Record<string, CartItem>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

// Initialize cart from storage
cartStore.set(loadCartFromStorage());

// Subscribe to changes and persist
cartStore.subscribe((cart) => {
  saveCartToStorage(cart);
});

// Cart actions
export function addToCart(product: CartItem['product'], quantity: number = 1) {
  const current = cartStore.get();
  const existing = current[product.id];
  
  if (existing) {
    cartStore.setKey(product.id, {
      ...existing,
      quantity: existing.quantity + quantity,
    });
  } else {
    cartStore.setKey(product.id, { product, quantity });
  }
}

export function removeFromCart(productId: string) {
  const current = cartStore.get();
  const { [productId]: removed, ...rest } = current;
  cartStore.set(rest);
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const current = cartStore.get();
  if (current[productId]) {
    cartStore.setKey(productId, { ...current[productId], quantity });
  }
}

export function clearCart() {
  cartStore.set({});
}

// Helper to get cart items as an array
export function getCartItems(): CartItem[] {
  return Object.values(cartStore.get());
}

// Helper to get total items count
export function getTotalItems(): number {
  const cart = cartStore.get();
  return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
}

// Helper to get subtotal
export function getSubtotal(): number {
  const cart = cartStore.get();
  return Object.values(cart).reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
}

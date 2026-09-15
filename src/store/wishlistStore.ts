// src/store/wishlistStore.ts
import { map } from 'nanostores';

// Wishlist stores product IDs as an array
export const wishlistStore = map<string[]>([]);

const STORAGE_KEY = 'surakuri-wishlist';

// Load wishlist from localStorage on initialization
function loadWishlistFromStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// Save wishlist to localStorage
function saveWishlistToStorage(wishlist: string[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
}

// Initialize wishlist from storage
wishlistStore.set(loadWishlistFromStorage());

// Subscribe to changes and persist
wishlistStore.subscribe((wishlist) => {
  saveWishlistToStorage(wishlist);
});

// Toggle product in wishlist
export function toggleWishlist(productId: string) {
  const current = wishlistStore.get();
  if (current.includes(productId)) {
    wishlistStore.set(current.filter(id => id !== productId));
  } else {
    wishlistStore.set([...current, productId]);
  }
}

// Check if product is in wishlist
export function isInWishlist(productId: string): boolean {
  return wishlistStore.get().includes(productId);
}

// Get wishlist count
export function getCount(): number {
  return wishlistStore.get().length;
}

// Clear wishlist
export function clearWishlist() {
  wishlistStore.set([]);
}

// src/store/uiStore.ts
import { atom } from 'nanostores';

// UI State atoms for transient UI states
export const isCartOpen = atom<boolean>(false);
export const isMobileMenuOpen = atom<boolean>(false);
export const isSearchOpen = atom<boolean>(false);

// Toggle functions
export function toggleCart() {
  isCartOpen.set(!isCartOpen.get());
}

export function toggleMobileMenu() {
  isMobileMenuOpen.set(!isMobileMenuOpen.get());
}

export function toggleSearch() {
  isSearchOpen.set(!isSearchOpen.get());
}

// Close all UI overlays
export function closeAllOverlays() {
  isCartOpen.set(false);
  isMobileMenuOpen.set(false);
  isSearchOpen.set(false);
}

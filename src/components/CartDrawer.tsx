// src/components/CartDrawer.tsx
import { useStore } from '@nanostores/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { isCartOpen, toggleCart } from '../store/uiStore';
import { cartStore, getCartItems, getSubtotal, updateQuantity, removeFromCart } from '../store/cartStore';

export default function CartDrawer() {
  const $isCartOpen = useStore(isCartOpen);
  const items = getCartItems();
  const subtotal = getSubtotal();
  const freeShippingThreshold = 5000;
  const remaining = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      {$isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/40 z-[80]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-ivory z-[90] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-serif text-xl tracking-wide">Shopping Bag ({items.length})</h2>
              <button onClick={toggleCart} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {/* Free shipping progress */}
            {remaining > 0 ? (
              <div className="px-6 py-3 bg-cream">
                <p className="text-xs text-warm-gray">
                  You're <span className="font-semibold text-obsidian">${remaining.toLocaleString()}</span> away from complimentary shipping.
                </p>
                <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-champagne transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
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
                  <a href="/shop" onClick={toggleCart} className="text-xs tracking-[0.2em] uppercase border-b border-obsidian pb-1">
                    Explore Watches
                  </a>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.product.id} className="flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-xs text-warm-gray">{item.product.brand}</p>
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center text-xs"
                        >
                          −
                        </button>
                        <span className="text-sm w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-xs text-warm-gray hover:text-red-500 mt-2"
                      >
                        Remove
                      </button>
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
                <a
                  href="/checkout"
                  onClick={toggleCart}
                  className="block w-full bg-obsidian text-ivory text-center py-4 text-xs tracking-[0.2em] uppercase hover:bg-charcoal transition-colors"
                >
                  Checkout
                </a>
                <a
                  href="/cart"
                  onClick={toggleCart}
                  className="block w-full border border-obsidian text-center py-4 text-xs tracking-[0.2em] uppercase hover:bg-obsidian hover:text-ivory transition-colors"
                >
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

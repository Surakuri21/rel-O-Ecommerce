import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, Tag, ArrowRight } from 'lucide-react';
import { useCart, useStore } from '../store/StoreContext';
import { products } from '../data/products';
import { addToast } from '../components/Shared';
import ProductCard from '../components/ProductCard';

export default function CartPage() {
  const { items, subtotal, dispatch } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const recommended = products.filter(p => !items.some(i => i.product.id === p.id)).slice(0, 4);

  const shipping = subtotal >= 5000 ? 0 : 50;
  const tax = Math.round((subtotal - discount) * 0.08);
  const total = subtotal - discount + shipping + tax;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'AURELIS10') {
      setDiscount(Math.round(subtotal * 0.1));
      addToast(dispatch, 'Coupon applied: 10% off', 'success');
    } else {
      addToast(dispatch, 'Invalid coupon code', 'error');
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-serif text-3xl mb-4">YOUR COLLECTION AWAITS</p>
          <p className="text-warm-gray mb-8">Discover a timepiece worthy of the moments ahead.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border-b border-obsidian pb-1">
            Explore Watches <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 lg:pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6">
        <h1 className="font-serif text-3xl lg:text-4xl tracking-wide mb-12">Shopping Bag</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map(item => (
              <motion.div key={item.product.id} layout className="flex gap-6 pb-6 border-b border-gray-100">
                <Link to={`/product/${item.product.slug}`} className="shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 lg:w-32 lg:h-32 object-cover bg-cream" />
                </Link>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray">{item.product.brand}</p>
                      <Link to={`/product/${item.product.slug}`} className="font-medium hover:text-champagne transition-colors">{item.product.name}</Link>
                      <p className="text-xs text-warm-gray mt-1">{item.product.movement} · {item.product.caseSize}</p>
                    </div>
                    <p className="font-medium">${(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-200">
                      <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', productId: item.product.id, quantity: item.quantity - 1 })}
                        className="px-3 py-2 hover:bg-cream"><Minus size={12} /></button>
                      <span className="px-3 py-2 text-sm">{item.quantity}</span>
                      <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', productId: item.product.id, quantity: item.quantity + 1 })}
                        className="px-3 py-2 hover:bg-cream"><Plus size={12} /></button>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => { dispatch({ type: 'TOGGLE_WISHLIST', productId: item.product.id }); dispatch({ type: 'REMOVE_FROM_CART', productId: item.product.id }); addToast(dispatch, 'Saved for later'); }}
                        className="text-xs text-warm-gray hover:text-obsidian">Save for later</button>
                      <button onClick={() => { dispatch({ type: 'REMOVE_FROM_CART', productId: item.product.id }); addToast(dispatch, 'Removed from bag', 'info'); }}
                        className="text-xs text-warm-gray hover:text-red-500 flex items-center gap-1"><Trash2 size={12} /> Remove</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Coupon */}
            <div className="flex gap-2 pt-4">
              <div className="flex-1 flex items-center border border-gray-200 px-4">
                <Tag size={14} className="text-warm-gray mr-2" />
                <input type="text" value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Coupon code" className="flex-1 py-3 text-sm outline-none bg-transparent" />
              </div>
              <button onClick={applyCoupon} className="px-6 py-3 border border-obsidian text-xs tracking-[0.15em] uppercase hover:bg-obsidian hover:text-ivory transition-colors">Apply</button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-cream p-8 h-fit sticky top-32">
            <h2 className="font-serif text-xl mb-6">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-warm-gray">Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-700"><span>Discount</span><span>-${discount.toLocaleString()}</span></div>}
              <div className="flex justify-between"><span className="text-warm-gray">Shipping</span><span>{shipping === 0 ? 'Complimentary' : `$${shipping}`}</span></div>
              <div className="flex justify-between"><span className="text-warm-gray">Tax (est.)</span><span>${tax.toLocaleString()}</span></div>
              <hr className="border-gray-200" />
              <div className="flex justify-between font-medium text-lg"><span>Total</span><span>${total.toLocaleString()}</span></div>
            </div>
            <Link to="/checkout" className="block w-full bg-obsidian text-ivory text-center py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-charcoal transition-colors mt-6">
              Proceed to Checkout
            </Link>
            <p className="text-[10px] text-warm-gray text-center mt-4">Secure checkout · SSL encrypted</p>
          </div>
        </div>

        {/* Recommended */}
        <div className="mt-24">
          <h2 className="font-serif text-2xl tracking-wide text-center mb-12">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommended.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard, Lock, ArrowLeft } from 'lucide-react';
import { useCart, useStore } from '../store/StoreContext';
import { addToast } from '../components/Shared';

export default function CheckoutPage() {
  const { items, subtotal, dispatch } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', postal: '', country: 'US' });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [orderComplete, setOrderComplete] = useState(false);

  const shipping = shippingMethod === 'express' ? 75 : shippingMethod === 'whiteglove' ? 250 : subtotal >= 5000 ? 0 : 50;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const steps = ['Information', 'Shipping', 'Payment', 'Review'];

  const handleComplete = () => {
    setOrderComplete(true);
    dispatch({ type: 'CLEAR_CART' });
    addToast(dispatch, 'Order placed successfully!', 'success');
  };

  if (orderComplete) {
    return (
      <div className="pt-32 pb-24 px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check size={32} className="text-green-600" />
          </div>
          <h1 className="font-serif text-3xl lg:text-4xl tracking-wide mb-4">YOUR TIMEPIECE IS ON ITS WAY</h1>
          <p className="text-warm-gray mb-8">Thank you for your order. A confirmation has been sent to {formData.email || 'your email'}.</p>
          <div className="bg-cream p-6 text-left space-y-3 mb-8">
            <div className="flex justify-between text-sm"><span className="text-warm-gray">Order Number</span><span className="font-medium">#AUR-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span></div>
            <div className="flex justify-between text-sm"><span className="text-warm-gray">Total</span><span className="font-medium">${total.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span className="text-warm-gray">Estimated Delivery</span><span className="font-medium">{shippingMethod === 'express' ? '1-2 business days' : '3-5 business days'}</span></div>
          </div>
          <Link to="/shop" className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border-b border-obsidian pb-1">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 text-center px-6">
        <p className="font-serif text-2xl mb-4">Your bag is empty</p>
        <Link to="/shop" className="text-xs tracking-[0.2em] uppercase border-b border-obsidian pb-1">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 lg:pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <Link to="/cart" className="flex items-center gap-2 text-sm text-warm-gray hover:text-obsidian mb-8">
          <ArrowLeft size={14} /> Back to cart
        </Link>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-12">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${i <= step ? 'bg-obsidian text-ivory' : 'bg-gray-100 text-warm-gray'}`}>
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-xs tracking-wider hidden sm:block ${i <= step ? 'text-obsidian' : 'text-warm-gray'}`}>{s}</span>
              {i < steps.length - 1 && <div className={`w-8 lg:w-16 h-px ${i < step ? 'bg-obsidian' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="info" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-serif text-2xl mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input placeholder="First name" value={formData.firstName} onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
                        className="border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" />
                      <input placeholder="Last name" value={formData.lastName} onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))}
                        className="border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" />
                    </div>
                    <input placeholder="Email" type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" />
                    <input placeholder="Phone" type="tel" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" />
                  </div>
                  <button onClick={() => setStep(1)} className="mt-8 bg-obsidian text-ivory px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-charcoal transition-colors">
                    Continue to Shipping
                  </button>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-serif text-2xl mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <input placeholder="Address" value={formData.address} onChange={e => setFormData(p => ({ ...p, address: e.target.value }))}
                      className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" />
                    <div className="grid grid-cols-3 gap-4">
                      <input placeholder="City" value={formData.city} onChange={e => setFormData(p => ({ ...p, city: e.target.value }))}
                        className="border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" />
                      <input placeholder="State" value={formData.state} onChange={e => setFormData(p => ({ ...p, state: e.target.value }))}
                        className="border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" />
                      <input placeholder="Postal code" value={formData.postal} onChange={e => setFormData(p => ({ ...p, postal: e.target.value }))}
                        className="border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl mt-10 mb-4">Shipping Method</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'standard', label: 'Standard Shipping', desc: '3-5 business days', price: subtotal >= 5000 ? 'Free' : '$50' },
                      { id: 'express', label: 'Express Shipping', desc: '1-2 business days', price: '$75' },
                      { id: 'whiteglove', label: 'White-Glove Delivery', desc: 'Scheduled, insured delivery', price: '$250' },
                    ].map(method => (
                      <label key={method.id} className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${shippingMethod === method.id ? 'border-obsidian bg-cream' : 'border-gray-200'}`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="shipping" checked={shippingMethod === method.id} onChange={() => setShippingMethod(method.id)} className="accent-obsidian" />
                          <div>
                            <p className="text-sm font-medium">{method.label}</p>
                            <p className="text-xs text-warm-gray">{method.desc}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium">{method.price}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button onClick={() => setStep(0)} className="border border-gray-200 px-6 py-4 text-[11px] tracking-[0.2em] uppercase hover:border-obsidian transition-colors">Back</button>
                    <button onClick={() => setStep(2)} className="bg-obsidian text-ivory px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-charcoal transition-colors">Continue to Payment</button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-serif text-2xl mb-6">Payment</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 border border-obsidian bg-cream">
                      <CreditCard size={20} />
                      <span className="text-sm font-medium">Credit / Debit Card</span>
                    </div>
                    <input placeholder="Card number" className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" />
                    <div className="grid grid-cols-2 gap-4">
                      <input placeholder="MM / YY" className="border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" />
                      <input placeholder="CVC" className="border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" />
                    </div>
                    <input placeholder="Name on card" className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" />
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-xs text-warm-gray">
                    <Lock size={12} /> Your payment information is encrypted and secure
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={() => setStep(1)} className="border border-gray-200 px-6 py-4 text-[11px] tracking-[0.2em] uppercase hover:border-obsidian transition-colors">Back</button>
                    <button onClick={() => setStep(3)} className="bg-obsidian text-ivory px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-charcoal transition-colors">Review Order</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-serif text-2xl mb-6">Review Your Order</h2>
                  <div className="space-y-6">
                    <div className="p-4 bg-cream">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray mb-2">Contact</p>
                      <p className="text-sm">{formData.email || 'Not provided'}</p>
                    </div>
                    <div className="p-4 bg-cream">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray mb-2">Shipping to</p>
                      <p className="text-sm">{formData.address || 'Not provided'}, {formData.city} {formData.state} {formData.postal}</p>
                    </div>
                    <div className="p-4 bg-cream">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray mb-2">Items</p>
                      {items.map(item => (
                        <div key={item.product.id} className="flex justify-between text-sm py-1">
                          <span>{item.product.name} × {item.quantity}</span>
                          <span>${(item.product.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={() => setStep(2)} className="border border-gray-200 px-6 py-4 text-[11px] tracking-[0.2em] uppercase hover:border-obsidian transition-colors">Back</button>
                    <button onClick={handleComplete} className="bg-obsidian text-ivory px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-charcoal transition-colors flex items-center gap-2">
                      <Lock size={12} /> Place Order — ${total.toLocaleString()}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-cream p-6 sticky top-32">
              <h3 className="font-serif text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <img src={item.product.images[0]} alt="" className="w-14 h-14 object-cover rounded" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">{item.product.name}</p>
                      <p className="text-xs text-warm-gray">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-medium">${(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <hr className="border-gray-200 my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-warm-gray">Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-warm-gray">Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping}`}</span></div>
                <div className="flex justify-between"><span className="text-warm-gray">Tax</span><span>${tax.toLocaleString()}</span></div>
                <hr className="border-gray-200" />
                <div className="flex justify-between font-medium text-lg"><span>Total</span><span>${total.toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

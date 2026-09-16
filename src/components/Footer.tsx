import { useState } from 'react';
import { Instagram, Facebook, Youtube, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-obsidian text-ivory">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-16 text-center">
          <h2 className="font-serif text-2xl lg:text-3xl tracking-[0.15em] mb-3">JOIN THE INNER CIRCLE</h2>
          <p className="text-warm-gray text-sm max-w-lg mx-auto mb-8">
            Receive private access to new collections, limited editions and stories from the world of watchmaking.
          </p>
          {subscribed ? (
            <p className="text-champagne text-sm tracking-wide">Welcome to the Inner Circle.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-transparent border border-white/20 px-4 py-3 text-sm outline-none focus:border-champagne transition-colors placeholder:text-warm-gray"
                required
              />
              <button type="submit" className="bg-champagne text-obsidian px-6 py-3 hover:bg-gold-light transition-colors">
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <h3 className="text-[10px] tracking-[0.25em] uppercase mb-6 text-champagne">Shop</h3>
            <ul className="space-y-3">
              {['All Watches', 'New Arrivals', 'Best Sellers', 'Collections', "Men's", "Women's"].map(item => (
                <li key={item}><a href="/shop" className="text-sm text-soft-gray hover:text-ivory transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] tracking-[0.25em] uppercase mb-6 text-champagne">Customer Care</h3>
            <ul className="space-y-3">
              {['Contact Us', 'Shipping', 'Returns', 'Warranty', 'Size Guide', 'Care Guide', 'FAQ'].map(item => (
                <li key={item}><a href="/about" className="text-sm text-soft-gray hover:text-ivory transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] tracking-[0.25em] uppercase mb-6 text-champagne">Company</h3>
            <ul className="space-y-3">
              {[{ label: 'About', path: '/about' }, { label: 'Our Story', path: '/about' }, { label: 'Journal', path: '/journal' }, { label: 'Careers', path: '/about' }].map(item => (
                <li key={item.label}><a href={item.path} className="text-sm text-soft-gray hover:text-ivory transition-colors">{item.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] tracking-[0.25em] uppercase mb-6 text-champagne">Legal</h3>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                <li key={item}><a href="/" className="text-sm text-soft-gray hover:text-ivory transition-colors">{item}</a></li>
              ))}
            </ul>
            <div className="flex gap-4 mt-8">
              <a href="#" className="text-soft-gray hover:text-champagne transition-colors" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" className="text-soft-gray hover:text-champagne transition-colors" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" className="text-soft-gray hover:text-champagne transition-colors" aria-label="YouTube"><Youtube size={18} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-serif text-lg tracking-[0.3em]">SURAKURI</p>
          <p className="text-xs text-warm-gray">© 2024 SURAKURI. All rights reserved. Time, Refined.</p>
          <div className="flex items-center gap-4 text-xs text-warm-gray">
            <span>Secure Checkout</span>
            <span>•</span>
            <span>SSL Encrypted</span>
            <span>•</span>
            <span>Authenticity Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

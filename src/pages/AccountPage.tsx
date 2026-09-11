import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut } from 'lucide-react';

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isRegister, setIsRegister] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="pt-28 lg:pt-32 pb-24">
        <div className="max-w-md mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="font-serif text-3xl tracking-wide">{isRegister ? 'Create Account' : 'Welcome Back'}</h1>
            <p className="text-warm-gray text-sm mt-2">{isRegister ? 'Join the AURELIS community' : 'Sign in to your account'}</p>
          </motion.div>

          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4">
            {isRegister && (
              <input type="text" placeholder="Full name" className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" required />
            )}
            <input type="email" placeholder="Email address" className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" required />
            <input type="password" placeholder="Password" className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" required />
            
            {!isRegister && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-obsidian" />
                  <span className="text-warm-gray">Remember me</span>
                </label>
                <button type="button" className="text-warm-gray hover:text-obsidian underline">Forgot password?</button>
              </div>
            )}

            <button type="submit" className="w-full bg-obsidian text-ivory py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-charcoal transition-colors">
              {isRegister ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => setIsRegister(!isRegister)} className="text-sm text-warm-gray hover:text-obsidian">
              {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-xs text-warm-gray text-center mb-4">Or continue with</p>
            <div className="grid grid-cols-2 gap-3">
              <button className="border border-gray-200 py-3 text-sm hover:border-obsidian transition-colors">Google</button>
              <button className="border border-gray-200 py-3 text-sm hover:border-obsidian transition-colors">Apple</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="pt-28 lg:pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center">
                <User size={20} className="text-warm-gray" />
              </div>
              <div>
                <p className="font-medium text-sm">Alexandra Chen</p>
                <p className="text-xs text-warm-gray">Member since 2023</p>
              </div>
            </div>
            <nav className="space-y-1">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors ${activeTab === tab.id ? 'bg-cream text-obsidian font-medium' : 'text-warm-gray hover:text-obsidian'}`}>
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
              <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-warm-gray hover:text-red-500 transition-colors mt-4">
                <LogOut size={16} /> Sign Out
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div>
                <h2 className="font-serif text-2xl mb-6">Profile</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-warm-gray block mb-1">First Name</label>
                      <input defaultValue="Alexandra" className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" />
                    </div>
                    <div>
                      <label className="text-xs text-warm-gray block mb-1">Last Name</label>
                      <input defaultValue="Chen" className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-warm-gray block mb-1">Email</label>
                    <input defaultValue="alexandra@example.com" className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-champagne" />
                  </div>
                  <button className="bg-obsidian text-ivory px-6 py-3 text-xs tracking-[0.15em] uppercase hover:bg-charcoal transition-colors">Save Changes</button>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="font-serif text-2xl mb-6">Order History</h2>
                <div className="space-y-4">
                  {[
                    { id: 'AUR-7829', date: 'Nov 15, 2024', total: '$12,500', status: 'Delivered', items: 'Sovereign Chronograph' },
                    { id: 'AUR-6541', date: 'Sep 22, 2024', total: '$8,900', status: 'Delivered', items: 'Meridian GMT' },
                    { id: 'AUR-5123', date: 'Jul 8, 2024', total: '$18,500', status: 'Delivered', items: 'Étoile Diamond' },
                  ].map(order => (
                    <div key={order.id} className="border border-gray-100 p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">#{order.id}</p>
                        <p className="text-xs text-warm-gray">{order.date} · {order.items}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{order.total}</p>
                        <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5">{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 className="font-serif text-2xl mb-6">Wishlist</h2>
                <Link to="/wishlist" className="text-sm text-champagne hover:underline">View full wishlist →</Link>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <h2 className="font-serif text-2xl mb-6">Saved Addresses</h2>
                <div className="border border-gray-100 p-6">
                  <p className="font-medium text-sm">Home</p>
                  <p className="text-sm text-warm-gray mt-1">123 Park Avenue, Apt 4B<br />New York, NY 10017<br />United States</p>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div>
                <h2 className="font-serif text-2xl mb-6">Payment Methods</h2>
                <div className="border border-gray-100 p-6 flex items-center gap-4">
                  <CreditCard size={24} className="text-warm-gray" />
                  <div>
                    <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                    <p className="text-xs text-warm-gray">Expires 12/26</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="font-serif text-2xl mb-6">Preferences</h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between">
                    <span className="text-sm">Email notifications</span>
                    <input type="checkbox" defaultChecked className="accent-obsidian" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm">New collection alerts</span>
                    <input type="checkbox" defaultChecked className="accent-obsidian" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm">Marketing communications</span>
                    <input type="checkbox" className="accent-obsidian" />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useStore } from '../store/StoreContext';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ToastContainer() {
  const { state, dispatch } = useStore();

  useEffect(() => {
    if (state.toasts.length > 0) {
      const timer = setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', id: state.toasts[0].id });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [state.toasts, dispatch]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] space-y-3">
      <AnimatePresence>
        {state.toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            className="flex items-center gap-3 bg-obsidian text-ivory px-5 py-4 rounded-lg shadow-2xl min-w-[300px] max-w-sm"
          >
            {toast.type === 'success' && <CheckCircle size={18} className="text-green-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle size={18} className="text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info size={18} className="text-blue-400 shrink-0" />}
            <p className="text-sm flex-1">{toast.message}</p>
            <button onClick={() => dispatch({ type: 'REMOVE_TOAST', id: toast.id })} className="shrink-0 hover:text-champagne">
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function addToast(dispatch: React.Dispatch<any>, message: string, type: 'success' | 'error' | 'info' = 'success') {
  const id = Date.now().toString();
  dispatch({ type: 'ADD_TOAST', toast: { id, message, type } });
}

export function NewsletterPopup() {
  const { state, dispatch } = useStore();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (state.newsletterPopupShown) return;
    const timer = setTimeout(() => setShow(true), 30000);
    return () => clearTimeout(timer);
  }, [state.newsletterPopupShown]);

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_NEWSLETTER_SHOWN' });
    setShow(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 left-6 z-[90] bg-ivory shadow-2xl rounded-lg p-8 max-w-sm border border-gray-100"
    >
      <button onClick={() => { dispatch({ type: 'SET_NEWSLETTER_SHOWN' }); setShow(false); }}
        className="absolute top-4 right-4 text-warm-gray hover:text-obsidian">
        <X size={16} />
      </button>
      <h3 className="font-serif text-xl tracking-wide mb-2">WELCOME TO THE WORLD OF TIME</h3>
      <p className="text-sm text-warm-gray mb-4">Be the first to discover new releases, limited editions and private events.</p>
      <form onSubmit={handleSubmit} className="flex">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email"
          className="flex-1 border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-champagne" required />
        <button type="submit" className="bg-obsidian text-ivory px-5 py-2.5 text-xs tracking-wider uppercase hover:bg-charcoal transition-colors">
          Join
        </button>
      </form>
    </motion.div>
  );
}

export function SupportWidget() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 left-6 z-[80]">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-16 left-0 bg-ivory shadow-2xl rounded-lg p-6 w-72 border border-gray-100 mb-2">
            <h3 className="font-serif text-lg mb-4">How can we help?</h3>
            <ul className="space-y-3">
              {['Track my order', 'Product question', 'Shipping info', 'Returns', 'Warranty', 'Contact support'].map(item => (
                <li key={item}>
                  <button className="text-sm text-warm-gray hover:text-obsidian transition-colors text-left w-full">{item}</button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen(!open)}
        className="w-12 h-12 bg-obsidian text-ivory rounded-full shadow-lg flex items-center justify-center hover:bg-charcoal transition-colors">
        <span className="text-lg">💬</span>
      </button>
    </div>
  );
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px]">
      <div className="h-full bg-champagne transition-all duration-150" style={{ width: `${progress}%` }} />
    </div>
  );
}

export function SkeletonLoader({ className = '' }: { className?: string }) {
  return <div className={`skeleton rounded ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <SkeletonLoader className="aspect-[3/4] w-full" />
      <SkeletonLoader className="h-4 w-3/4" />
      <SkeletonLoader className="h-3 w-1/2" />
      <SkeletonLoader className="h-4 w-1/3" />
    </div>
  );
}

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export function NewArrivalsPage() {
  const newArrivals = products.filter(p => p.badges.includes('new'));

  return (
    <div className="pt-28 lg:pt-32 pb-24">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mb-16">
        <motion.img
          initial={{ scale: 1.03 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Layered Gradients */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.30) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.35) 100%)' }} />
        <div className="relative z-10 text-center text-white px-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-[10px] tracking-[0.45em] uppercase text-champagne/90 mb-4" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
            The Latest
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1 }} className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-[0.12em] font-light text-white/95" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            THE NEXT ERA OF TIME
          </motion.h1>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6">
        <p className="text-warm-gray text-sm mb-8">{newArrivals.length} new timepieces</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BestSellersPage() {
  const bestSellers = products.filter(p => p.badges.includes('bestseller')).sort((a, b) => b.reviewCount - a.reviewCount);

  return (
    <div className="pt-28 lg:pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-4">Most Coveted</p>
          <h1 className="font-serif text-4xl lg:text-5xl tracking-wide">Best Sellers</h1>
          <p className="text-warm-gray mt-4 max-w-lg mx-auto">The timepieces our collectors love most.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} showRank />
          ))}
        </div>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="pt-32 pb-24 text-center px-6 min-h-[60vh] flex flex-col items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="font-serif text-6xl text-champagne mb-4">404</p>
        <h1 className="font-serif text-3xl tracking-wide mb-4">TIME SEEMS TO HAVE STOPPED</h1>
        <p className="text-warm-gray mb-8">The page you're looking for could not be found.</p>
        <Link to="/" className="text-[11px] tracking-[0.2em] uppercase border-b border-obsidian pb-1 hover:text-champagne hover:border-champagne transition-colors">
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}

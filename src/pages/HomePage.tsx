import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Shield, Truck, Award, Clock } from 'lucide-react';
import { products, collections } from '../data/products';
import ProductCard from '../components/ProductCard';
import { PromoCountdown } from '../components/MobileNav';

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredProducts = products.filter(p => p.badges.includes('bestseller')).slice(0, 4);
  const newArrivals = products.filter(p => p.badges.includes('new')).slice(0, 4);
  const limitedEdition = products.filter(p => p.badges.includes('limited')).slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div ref={heroRef} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1920&q=80"
            alt="Luxury watch"
            className="w-full h-full object-cover scale-110"
            style={{ objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[10px] tracking-[0.4em] uppercase mb-6 text-champagne"
          >
            Introducing the 2024 Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-[0.1em] mb-6 font-light"
          >
            TIME, REFINED.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm md:text-base text-white/80 max-w-xl mx-auto mb-10 leading-relaxed font-light"
          >
            Exceptional craftsmanship. Timeless design. Precision engineered for those who appreciate every second.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/shop" className="bg-white text-obsidian px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-champagne transition-colors duration-300">
              Explore Collection
            </Link>
            <Link to="/about" className="border border-white/50 text-white px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-white hover:text-obsidian transition-colors duration-300">
              Discover Our Story
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60"
        >
          <ChevronDown size={24} className="animate-bounce" />
        </motion.div>
      </section>

      {/* Promo Countdown */}
      <PromoCountdown />

      {/* Trust Bar */}
      <section className="bg-obsidian text-ivory py-8">
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Shield, text: 'Authenticity Guaranteed' },
            { icon: Truck, text: 'Complimentary Shipping' },
            { icon: Award, text: '5-Year Warranty' },
            { icon: Clock, text: 'Lifetime Service' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center justify-center gap-3">
              <Icon size={18} className="text-champagne" />
              <span className="text-[10px] tracking-[0.15em] uppercase">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* The Art of Time - Featured Collection */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-4">Curated Selection</p>
            <h2 className="font-serif text-4xl lg:text-5xl tracking-wide">The Art of Time</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop" className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border-b border-obsidian pb-1 hover:text-champagne hover:border-champagne transition-colors">
              View All Timepieces <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Split Section */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80"
              alt="Watch craftsmanship"
              className="w-full aspect-[4/5] object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-champagne">Our Philosophy</p>
            <h2 className="font-serif text-4xl lg:text-5xl leading-tight">Where Precision Meets Artistry</h2>
            <p className="text-warm-gray leading-relaxed">
              Each AURELIS timepiece is the culmination of hundreds of hours of meticulous craftsmanship. 
              From the hand-finished movement to the perfectly polished case, every detail is considered, 
              every surface refined to perfection.
            </p>
            <p className="text-warm-gray leading-relaxed">
              Our master watchmakers train for years before they are entrusted with the creation of a single 
              timepiece, ensuring that every watch that bears the AURELIS name meets our exacting standards.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border-b border-obsidian pb-1 hover:text-champagne hover:border-champagne transition-colors pt-4">
              Our Heritage <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-4">Explore</p>
            <h2 className="font-serif text-4xl lg:text-5xl tracking-wide">Our Collections</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.map((col, i) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Link to={`/collections/${col.slug}`} className="group block relative overflow-hidden aspect-[16/10]">
                  <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="font-serif text-2xl lg:text-3xl text-white mb-2">{col.name}</h3>
                    <p className="text-white/70 text-sm">{col.description}</p>
                    <span className="inline-flex items-center gap-2 mt-4 text-[10px] tracking-[0.2em] uppercase text-white border-b border-white/40 pb-0.5 group-hover:border-champagne group-hover:text-champagne transition-colors">
                      Discover <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 lg:py-32 bg-obsidian text-ivory px-6">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-4">Just Arrived</p>
            <h2 className="font-serif text-4xl lg:text-5xl tracking-wide">New Arrivals</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {newArrivals.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/new-arrivals" className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border-b border-ivory/40 pb-1 hover:text-champagne hover:border-champagne transition-colors">
              View All New Arrivals <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Limited Edition Banner */}
      <section className="relative py-32 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=1920&q=80"
          alt="Limited edition"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-4">Exclusive</p>
            <h2 className="font-serif text-4xl lg:text-6xl tracking-wide mb-6">Limited Edition</h2>
            <p className="text-white/70 max-w-lg mx-auto mb-8">
              Only a select few will own these masterpieces. Each piece is individually numbered and comes with a certificate of authenticity.
            </p>
            <Link to="/shop?badge=limited" className="bg-champagne text-obsidian px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-gold-light transition-colors">
              Discover Limited Editions
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32 px-6 bg-cream">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-4">Client Stories</p>
            <h2 className="font-serif text-4xl lg:text-5xl tracking-wide">Customer Love</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'James W.', text: 'The Sovereign Chronograph is a masterpiece. The finishing is impeccable and the movement is remarkably smooth.', rating: 5 },
              { name: 'Sarah M.', text: 'I have been collecting for 20 years. AURELIS represents the pinnacle of modern watchmaking. Extraordinary attention to detail.', rating: 5 },
              { name: 'David L.', text: 'The GMT function is incredibly intuitive. Perfect for my travels between continents. A true companion.', rating: 5 },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-ivory p-8 text-center"
              >
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} className="text-champagne">★</span>
                  ))}
                </div>
                <p className="text-warm-gray text-sm leading-relaxed mb-4 italic">"{review.text}"</p>
                <p className="font-medium text-sm">{review.name}</p>
                <p className="text-xs text-warm-gray">Verified Purchase</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-4">Begin Your Journey</p>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-wide mb-6">Find Your Timepiece</h2>
          <p className="text-warm-gray max-w-lg mx-auto mb-8">
            Whether you seek a daily companion or a collector's treasure, discover the AURELIS that speaks to you.
          </p>
          <Link to="/shop" className="bg-obsidian text-ivory px-10 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-charcoal transition-colors">
            Shop All Watches
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

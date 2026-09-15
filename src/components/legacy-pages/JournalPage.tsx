import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { blogPosts } from '../data/products';

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Watchmaking', 'Style', 'Heritage', 'Guides', 'Stories', 'Interviews'];
  const filtered = activeCategory === 'All' ? blogPosts : blogPosts.filter(p => p.category === activeCategory);

  return (
    <div className="pt-28 lg:pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-4">The Journal</p>
          <h1 className="font-serif text-4xl lg:text-5xl tracking-wide">Stories & Insights</h1>
          <p className="text-warm-gray mt-4 max-w-lg mx-auto">Exploring the art, craft, and culture of fine watchmaking.</p>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs tracking-wider transition-colors ${activeCategory === cat ? 'bg-obsidian text-ivory' : 'border border-gray-200 hover:border-obsidian'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {filtered.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <Link to="#" className="group grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={filtered[0].image} alt={filtered[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] tracking-[0.2em] uppercase text-champagne mb-3">{filtered[0].category}</span>
                <h2 className="font-serif text-3xl lg:text-4xl tracking-wide mb-4 group-hover:text-champagne transition-colors">{filtered[0].title}</h2>
                <p className="text-warm-gray leading-relaxed mb-4">{filtered[0].excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-warm-gray">
                  <span>{new Date(filtered[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {filtered[0].readTime}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.slice(1).map((post, i) => (
            <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to="#" className="group block">
                <div className="aspect-[16/10] overflow-hidden mb-4">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-champagne">{post.category}</span>
                <h3 className="font-serif text-xl tracking-wide mt-2 mb-2 group-hover:text-champagne transition-colors">{post.title}</h3>
                <p className="text-sm text-warm-gray line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-warm-gray">
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

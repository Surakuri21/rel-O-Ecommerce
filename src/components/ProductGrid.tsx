import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { Product } from '../data/products';

interface ProductGridProps {
  title: string;
  subtitle: string;
  tag?: string;
  products: Product[];
  viewAllHref: string;
  viewAllLabel: string;
  bgClass?: string;
}

export default function ProductGrid({
  title,
  subtitle,
  tag = 'champagne',
  products,
  viewAllHref,
  viewAllLabel,
  bgClass = '',
}: ProductGridProps) {
  return (
    <section className={`py-24 lg:py-32 px-6 ${bgClass || 'bg-ivory'}`}>
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className={`text-[10px] tracking-[0.3em] uppercase text-${tag} mb-4`}>{subtitle}</p>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-wide">{title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={viewAllHref}
            className={`inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border-b border-obsidian pb-1 hover:text-champagne hover:border-champagne transition-colors ${
              bgClass.includes('obsidian') ? 'border-ivory/40' : ''
            }`}
          >
            {viewAllLabel} <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

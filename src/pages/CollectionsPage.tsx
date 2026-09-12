import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products, collections } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function CollectionsPage() {
  const { slug } = useParams();

  if (!slug) {
    return (
      <div className="pt-28 lg:pt-32 pb-24">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-4">Explore</p>
            <h1 className="font-serif text-4xl lg:text-5xl tracking-wide">Our Collections</h1>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.map((col, i) => (
              <motion.div key={col.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={`/collections/${col.slug}`} className="group block relative overflow-hidden aspect-[16/9]">
                  <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h2 className="font-serif text-2xl lg:text-3xl text-white mb-2">{col.name}</h2>
                    <p className="text-white/70 text-sm">{col.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const collection = collections.find(c => c.slug === slug);
  const collectionProducts = products.filter(p => p.collection.toLowerCase() === slug);

  return (
    <div className="pt-28 lg:pt-32 pb-24">
      {/* Collection Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mb-16">
        <motion.img
          initial={{ scale: 1.03 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
          src={collection?.image || collections[0].image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Layered Gradients */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.30) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.35) 100%)' }} />
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="font-serif text-4xl lg:text-6xl tracking-[0.12em] mb-4 font-light text-white/95" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            {collection?.name || slug}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-white/75 max-w-lg mx-auto leading-[1.7]" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
            {collection?.description}
          </motion.p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collectionProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        {collectionProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="font-serif text-xl text-warm-gray">Coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}

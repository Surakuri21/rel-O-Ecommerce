import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart } from 'lucide-react';
import { useStore } from '../store/StoreContext';
import { products } from '../data/products';
import { addToast } from './Shared';

export default function CompareDrawer() {
  const { state, dispatch } = useStore();
  const compareProducts = products.filter(p => state.compareList.includes(p.id));

  if (compareProducts.length === 0) return null;

  const specs = [
    { key: 'price', label: 'Price', format: (v: number) => `$${v.toLocaleString()}` },
    { key: 'movement', label: 'Movement' },
    { key: 'caseMaterial', label: 'Case Material' },
    { key: 'caseSize', label: 'Case Size' },
    { key: 'waterResistance', label: 'Water Resistance' },
    { key: 'powerReserve', label: 'Power Reserve' },
    { key: 'strapMaterial', label: 'Strap' },
    { key: 'dialColor', label: 'Dial Color' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="fixed bottom-0 left-0 right-0 z-[70] bg-ivory border-t border-gray-200 shadow-2xl max-h-[60vh] overflow-y-auto"
      >
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg">Compare ({compareProducts.length}/4)</h3>
            <button onClick={() => compareProducts.forEach(p => dispatch({ type: 'TOGGLE_COMPARE', productId: p.id }))} className="text-xs text-warm-gray hover:text-obsidian">
              Clear all
            </button>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr>
                  <th className="w-32" />
                  {compareProducts.map(p => (
                    <th key={p.id} className="px-4 pb-4 text-center relative">
                      <button onClick={() => dispatch({ type: 'TOGGLE_COMPARE', productId: p.id })}
                        className="absolute top-0 right-2 text-warm-gray hover:text-obsidian">
                        <X size={14} />
                      </button>
                      <Link to={`/product/${p.slug}`}>
                        <img src={p.images[0]} alt={p.name} className="w-20 h-20 object-cover mx-auto mb-2 bg-cream" />
                        <p className="text-xs font-medium">{p.name}</p>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specs.map(spec => (
                  <tr key={spec.key} className="border-t border-gray-50">
                    <td className="py-3 text-xs text-warm-gray font-medium">{spec.label}</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="px-4 py-3 text-center text-sm">
                        {spec.format ? spec.format((p as any)[spec.key]) : (p as any)[spec.key]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-gray-100">
                  <td className="py-4" />
                  {compareProducts.map(p => (
                    <td key={p.id} className="px-4 py-4 text-center">
                      <button onClick={() => { dispatch({ type: 'ADD_TO_CART', product: p }); addToast(dispatch, `${p.name} added to bag`); }}
                        className="bg-obsidian text-ivory px-4 py-2 text-[10px] tracking-wider uppercase hover:bg-charcoal transition-colors inline-flex items-center gap-1">
                        <ShoppingCart size={10} /> Add to Bag
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

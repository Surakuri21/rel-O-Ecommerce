import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, Grid3X3, Grid2X2 } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState(4);
  const [page, setPage] = useState(1);
  const perPage = 12;

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    collection: '',
    gender: searchParams.get('gender') || '',
    priceMin: '',
    priceMax: '',
    movement: '',
    caseMaterial: '',
    badge: searchParams.get('badge') || '',
  });

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category) result = result.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
    if (filters.collection) result = result.filter(p => p.collection.toLowerCase() === filters.collection.toLowerCase());
    if (filters.gender) result = result.filter(p => p.gender === filters.gender);
    if (filters.movement) result = result.filter(p => p.movement.toLowerCase() === filters.movement.toLowerCase());
    if (filters.caseMaterial) result = result.filter(p => p.caseMaterial.toLowerCase().includes(filters.caseMaterial.toLowerCase()));
    if (filters.badge) result = result.filter(p => p.badges.includes(filters.badge));
    if (filters.priceMin) result = result.filter(p => p.price >= Number(filters.priceMin));
    if (filters.priceMax) result = result.filter(p => p.price <= Number(filters.priceMax));

    switch (sortBy) {
      case 'newest': result.sort((a, b) => (b.badges.includes('new') ? 1 : 0) - (a.badges.includes('new') ? 1 : 0)); break;
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'bestselling': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }

    return result;
  }, [filters, sortBy]);

  const paginatedProducts = filteredProducts.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filteredProducts.length / perPage);

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: prev[key] === value ? '' : value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ category: '', collection: '', gender: '', priceMin: '', priceMax: '', movement: '', caseMaterial: '', badge: '' });
    setPage(1);
  };

  const activeFilterCount = Object.values(filters).filter(v => v).length;

  const categories = [...new Set(products.map(p => p.category))];
  const collections = [...new Set(products.map(p => p.collection))];
  const movements = [...new Set(products.map(p => p.movement))];

  return (
    <div className="pt-28 lg:pt-32 pb-24">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-6 mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-2">AURELIS</p>
          <h1 className="font-serif text-4xl lg:text-5xl tracking-wide">All Timepieces</h1>
          <p className="text-warm-gray mt-2 text-sm">{filteredProducts.length} timepieces</p>
        </motion.div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-between lg:hidden">
            <button onClick={() => setFiltersOpen(true)} className="flex items-center gap-2 border border-gray-200 px-4 py-2 text-sm">
              <SlidersHorizontal size={14} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border border-gray-200 px-4 py-2 text-sm bg-transparent">
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="bestselling">Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 space-y-8">
              {/* Sort */}
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-warm-gray block mb-3">Sort By</label>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full border border-gray-200 px-3 py-2 text-sm bg-transparent">
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="bestselling">Best Selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <h3 className="text-[10px] tracking-[0.2em] uppercase mb-3">Category</h3>
                <ul className="space-y-2">
                  {categories.map(cat => (
                    <li key={cat}>
                      <button onClick={() => updateFilter('category', cat)}
                        className={`text-sm transition-colors ${filters.category === cat ? 'text-obsidian font-medium' : 'text-warm-gray hover:text-obsidian'}`}>
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Collection */}
              <div>
                <h3 className="text-[10px] tracking-[0.2em] uppercase mb-3">Collection</h3>
                <ul className="space-y-2">
                  {collections.map(col => (
                    <li key={col}>
                      <button onClick={() => updateFilter('collection', col)}
                        className={`text-sm transition-colors ${filters.collection === col ? 'text-obsidian font-medium' : 'text-warm-gray hover:text-obsidian'}`}>
                        {col}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gender */}
              <div>
                <h3 className="text-[10px] tracking-[0.2em] uppercase mb-3">Gender</h3>
                <ul className="space-y-2">
                  {['men', 'women', 'unisex'].map(g => (
                    <li key={g}>
                      <button onClick={() => updateFilter('gender', g)}
                        className={`text-sm capitalize transition-colors ${filters.gender === g ? 'text-obsidian font-medium' : 'text-warm-gray hover:text-obsidian'}`}>
                        {g === 'unisex' ? 'Unisex' : g === 'men' ? "Men's" : "Women's"}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Movement */}
              <div>
                <h3 className="text-[10px] tracking-[0.2em] uppercase mb-3">Movement</h3>
                <ul className="space-y-2">
                  {movements.map(m => (
                    <li key={m}>
                      <button onClick={() => updateFilter('movement', m)}
                        className={`text-sm transition-colors ${filters.movement === m ? 'text-obsidian font-medium' : 'text-warm-gray hover:text-obsidian'}`}>
                        {m}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-[10px] tracking-[0.2em] uppercase mb-3">Price Range</h3>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" value={filters.priceMin}
                    onChange={e => { setFilters(p => ({ ...p, priceMin: e.target.value })); setPage(1); }}
                    className="w-full border border-gray-200 px-3 py-2 text-sm" />
                  <input type="number" placeholder="Max" value={filters.priceMax}
                    onChange={e => { setFilters(p => ({ ...p, priceMax: e.target.value })); setPage(1); }}
                    className="w-full border border-gray-200 px-3 py-2 text-sm" />
                </div>
              </div>

              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-xs text-warm-gray hover:text-obsidian underline">
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Desktop grid toggle */}
            <div className="hidden lg:flex justify-end mb-6 gap-2">
              <button onClick={() => setGridCols(3)} className={`p-2 ${gridCols === 3 ? 'text-obsidian' : 'text-warm-gray'}`}><Grid3X3 size={16} /></button>
              <button onClick={() => setGridCols(4)} className={`p-2 ${gridCols === 4 ? 'text-obsidian' : 'text-warm-gray'}`}><Grid2X2 size={16} /></button>
            </div>

            {paginatedProducts.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-serif text-2xl mb-2">No timepieces found</p>
                <p className="text-warm-gray text-sm mb-6">Try adjusting your filters</p>
                <button onClick={clearFilters} className="text-xs tracking-[0.2em] uppercase border-b border-obsidian pb-1">Clear Filters</button>
              </div>
            ) : (
              <>
                <div className={`grid grid-cols-2 ${gridCols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-4'} gap-4 lg:gap-6`}>
                  {paginatedProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-12">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button key={i} onClick={() => setPage(i + 1)}
                        className={`w-10 h-10 flex items-center justify-center text-sm border transition-colors ${page === i + 1 ? 'bg-obsidian text-ivory border-obsidian' : 'border-gray-200 hover:border-obsidian'}`}>
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <motion.div
        initial={false}
        animate={{ x: filtersOpen ? 0 : '100%' }}
        className={`fixed inset-0 z-[70] lg:hidden ${filtersOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-80 bg-ivory p-6 overflow-y-auto transition-transform ${filtersOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-xl">Filters</h2>
            <button onClick={() => setFiltersOpen(false)}><X size={20} /></button>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-[10px] tracking-[0.2em] uppercase mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button key={cat} onClick={() => updateFilter('category', cat)}
                    className={`px-3 py-1.5 border text-xs ${filters.category === cat ? 'border-obsidian bg-obsidian text-ivory' : 'border-gray-200'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[10px] tracking-[0.2em] uppercase mb-3">Gender</h3>
              <div className="flex flex-wrap gap-2">
                {['men', 'women', 'unisex'].map(g => (
                  <button key={g} onClick={() => updateFilter('gender', g)}
                    className={`px-3 py-1.5 border text-xs capitalize ${filters.gender === g ? 'border-obsidian bg-obsidian text-ivory' : 'border-gray-200'}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[10px] tracking-[0.2em] uppercase mb-3">Price</h3>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" value={filters.priceMin}
                  onChange={e => { setFilters(p => ({ ...p, priceMin: e.target.value })); setPage(1); }}
                  className="w-full border border-gray-200 px-3 py-2 text-sm" />
                <input type="number" placeholder="Max" value={filters.priceMax}
                  onChange={e => { setFilters(p => ({ ...p, priceMax: e.target.value })); setPage(1); }}
                  className="w-full border border-gray-200 px-3 py-2 text-sm" />
              </div>
            </div>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-xs underline text-warm-gray">Clear all filters</button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

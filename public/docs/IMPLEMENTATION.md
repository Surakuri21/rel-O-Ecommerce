# SURAKURI — Implementation Guide

> Technical implementation details and development guidelines for the SURAKURI luxury watch ecommerce platform.

---

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 24.14.0
npm >= 11.9.0
```

### Installation

```bash
# Clone the repository
git clone https://github.com/Surakuri21/rel-O-Ecommerce.git
cd rel-O-Ecommerce

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
Surakuri-rel-O/
├── docs/
    public/                 # Static assets
│   └── images/            # Image assets
│       ├── hero/          # Hero section images
│       ├── editorial/     # Editorial content images
│       ├── collections/   # Collection images
│       ├── blog/          # Blog post images
│       └── watches/       # Product images (if using local)
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CompareDrawer.tsx
│   │   ├── MobileNav.tsx
│   │   └── Shared.tsx
│   ├── pages/             # Route-level components
│   │   ├── HomePage.tsx
│   │   ├── ShopPage.tsx
│   │   ├── ProductPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── WishlistPage.tsx
│   │   ├── AccountPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── JournalPage.tsx
│   │   ├── CollectionsPage.tsx
│   │   └── OtherPages.tsx
│   ├── store/             # State management
│   │   └── StoreContext.tsx
│   ├── data/              # Static data & types
│   │   └── products.ts
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite config
└── tailwind.config.js     # Tailwind config
```

---

## 🛠️ Technology Stack

### Core Technologies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "typescript": "^5.7.0",
  "vite": "^6.3.5",
  "tailwindcss": "^4.1.7",
  "framer-motion": "^11.16.1",
  "lucide-react": "^0.294.0"
}
```

### Key Libraries

- **React 18** - UI framework with concurrent features
- **React Router v6** - Client-side routing
- **TypeScript** - Type safety and better DX
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

---

## 🎨 Design System Implementation

### Color Tokens

```typescript
// src/index.css
@theme {
  --color-obsidian: #0a0a0a;
  --color-charcoal: #1a1a1a;
  --color-ivory: #faf8f5;
  --color-cream: #f5f0ea;
  --color-champagne: #d4af37;
  --color-gold: #c9a96e;
  --color-warm-gray: #8a8580;
  --color-soft-gray: #b5b0aa;
}
```

### Typography

```typescript
// Google Fonts
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

// Usage
<h1 className="font-serif text-4xl tracking-[0.15em] font-light">
<p className="font-sans text-sm text-warm-gray">
```

### Spacing Scale

```typescript
// Tailwind default spacing (8px grid)
// Use: p-4, m-6, gap-8, etc.

// Custom spacing in tailwind.config.js
theme: {
  extend: {
    spacing: {
      '18': '4.5rem',
      '88': '22rem',
    }
  }
}
```

---

## 🔄 State Management

### Store Structure

```typescript
// src/store/StoreContext.tsx
interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  toasts: Toast[];
  searchHistory: string[];
  compareList: string[];
  newsletterPopupShown: boolean;
}

type Action =
  | { type: "ADD_TO_CART"; product: Product; quantity?: number }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_WISHLIST"; productId: string }
  | { type: "ADD_RECENTLY_VIEWED"; productId: string }
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "REMOVE_TOAST"; id: string }
  | { type: "ADD_SEARCH_HISTORY"; query: string }
  | { type: "TOGGLE_COMPARE"; productId: string }
  | { type: "SET_NEWSLETTER_SHOWN" }
  | { type: "LOAD_STATE"; state: Partial<StoreState> };
```

### Usage Example

```typescript
// In component
import { useStore, useCart, useWishlist } from '../store/StoreContext';

function MyComponent() {
  const { state, dispatch } = useStore();
  const { items: cartItems, totalItems, subtotal } = useCart();
  const { items: wishlistItems, count: wishlistCount } = useWishlist();

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  return (
    <div>
      <p>Cart items: {totalItems}</p>
      <p>Wishlist items: {wishlistCount}</p>
    </div>
  );
}
```

---

## 🧭 Routing Architecture

### Astro File-Based Routing

Do NOT use `react-router-dom`. All pages are built using Astro's directory structure.

````typescript
// Navigation
<a href="/shop">Shop</a>
<a href={`/product/${product.slug}`}>{product.name}</a>

// Programmatic Navigation (Client-side islands only)
window.location.href = '/cart';

### Navigation

```typescript
import { Link, useNavigate, useParams } from 'react-router-dom';

// Link component
<Link to="/shop">Shop</Link>
<Link to={`/product/${product.slug}`}>{product.name}</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate('/cart');

// URL parameters
const { slug } = useParams();
````

---

## 🖼️ Image Handling

### Product Images (Unsplash CDN)

```typescript
// src/data/products.ts
const U = (id: string) => `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`;

const WATCH_PHOTOS = {
  chronograph: [
    U('photo-1600003014637-ff82a275e191'),
    U('photo-1587925358603-c2eea5305bbc'),
    U('photo-1548169874-53e85f753f1e'),
    U('photo-4R_WEmhx8og'),
  ],
  // ... other categories
};

// Usage in product
{
  id: '1',
  name: 'Sovereign Chronograph',
  images: pick(WATCH_PHOTOS.chronograph, 4),
}
```

### Local Images

```typescript
// Hero/Editorial images
<img src="/images/hero/watch.jpg" alt="Luxury watch" />
<img src="/images/editorial/craftsmanship.jpg" alt="Watch craftsmanship" />

// Collections
<img src="/images/collections/signature.jpg" alt="Signature Collection" />
```

### Image Optimization

```tsx
// Lazy loading
<img loading="lazy" src="..." alt="..." />

// Responsive images
<img
  src="image-800w.jpg"
  srcSet="image-400w.jpg 400w, image-800w.jpg 800w, image-1200w.jpg 1200w"
  sizes="(max-width: 768px) 400px, (max-width: 1024px) 800px, 1200px"
  alt="..."
/>
```

---

## 🎬 Animations

### Framer Motion

```typescript
import { motion, AnimatePresence } from 'framer-motion';

// Page load animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {/* Content */}
</motion.div>

// Staggered list
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    {/* Item */}
  </motion.div>
))}

// Modal/Drawer
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      {/* Modal content */}
    </motion.div>
  )}
</AnimatePresence>

// Hover effects
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.2 }}
>
  {/* Content */}
</motion.div>
```

### CSS Transitions

```tsx
// Simple hover
<div className="transition-all duration-300 hover:scale-105 hover:shadow-xl">
  {/* Content */}
</div>

// Color transition
<button className="transition-colors duration-300 hover:bg-champagne">
  {/* Content */}
</button>
```

---

## 📱 Responsive Design

### Breakpoints

```typescript
// Tailwind default breakpoints
// sm:  640px
// md:  768px
// lg:  1024px
// xl:  1280px
// 2xl: 1536px

// Usage
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
<div className="hidden lg:block">
<div className="lg:hidden">
```

### Mobile-First Approach

```tsx
// Start with mobile, enhance for larger screens
<div
  className="
  px-4 py-6        /* Mobile */
  md:px-8 md:py-12 /* Tablet */
  lg:px-12 lg:py-16 /* Desktop */
"
>
  <h1 className="text-3xl md:text-5xl lg:text-7xl">Title</h1>
</div>
```

---

## ♿ Accessibility

### ARIA Labels

```tsx
// Icon buttons
<button aria-label="Add to cart">
  <ShoppingBag size={18} />
</button>

// Images
<img src="..." alt="Luxury watch" />

// Form inputs
<label htmlFor="email">Email</label>
<input id="email" type="email" aria-required="true" />
```

### Keyboard Navigation

```tsx
// Focus management
<button
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  }}
>
  Click me
</button>;

// Focus trap in modals
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }
}, [isOpen]);
```

### Reduced Motion

```css
/* src/index.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## ⚡ Performance

### Code Splitting

```typescript
// Lazy load routes
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));

// Use Suspense
<Suspense fallback={<div>Loading...</div>}>
  <ShopPage />
</Suspense>
```

### Image Optimization

```tsx
// Lazy load images
<img loading="lazy" src="..." alt="..." />

// Use modern formats
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <source srcSet="image.jpg" type="image/jpeg" />
  <img src="image.jpg" alt="..." />
</picture>
```

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react';

// Memoize components
const ProductCard = memo(({ product }) => {
  return <div>{product.name}</div>;
});

// Memoize calculations
const filteredProducts = useMemo(() => {
  return products.filter(p => p.category === category);
}, [products, category]);

// Memoize callbacks
const handleClick = useCallback(() => {
  dispatch({ type: 'ADD_TO_CART', product });
}, [dispatch, product]);
```

---

## 🧪 Testing

### Manual Testing Checklist

```bash
# Build the project
npm run build

# Start dev server
npm run dev

# Test these flows:
- [ ] Add to cart
- [ ] Remove from cart
- [ ] Update quantity
- [ ] Checkout flow
- [ ] Wishlist toggle
- [ ] Product filtering
- [ ] Product sorting
- [ ] Search functionality
- [ ] Mobile navigation
- [ ] Image gallery
- [ ] Responsive design
- [ ] Accessibility
- [ ] Performance
```

### Browser Testing

```
Desktop:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

Mobile:
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Samsung Internet

Tablet:
- [ ] iPad Safari
- [ ] Android Chrome
```

---

## 🚀 Deployment

### Build for Production

```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

### Environment Variables

```bash
# .env
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=UA-XXXXX
```

### Deployment Platforms

**Vercel:**

```bash
npm install -g vercel
vercel
```

**Netlify:**

```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Manual:**

```bash
npm run build
# Upload dist/ folder to your hosting
```

---

## 🐛 Troubleshooting

### Common Issues

**Build fails:**

```bash
# Clear cache
rm -rf node_modules
rm -rf dist
npm install
npm run build
```

**Images not loading:**

```bash
# Check image paths
# Ensure images are in public/images/
# Verify URLs are correct
```

**State not persisting:**

```bash
# Check localStorage
# Verify reducer logic
# Check dispatch actions
```

**Responsive issues:**

```bash
# Check breakpoint classes
# Test on actual devices
# Check for overflow issues
```

---

## 📚 Additional Resources

### Documentation

- [React](https://react.dev)
- [React Router](https://reactrouter.com)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)

### Tools

- [Chrome DevTools](https://developer.chrome.com/docs/devtools)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)

---

**Last Updated:** 2026
**Version:** 1.0
**Maintained By:** SURAKURI

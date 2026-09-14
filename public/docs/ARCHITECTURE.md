# SURAKURI — Architecture

> System architecture and technical design for the AURELIS luxury watch ecommerce platform.

---

## 🏗️ Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   React UI   │  │   Routing    │  │   State Mgmt │      │
│  │  (Components)│  │(React Router)│  │  (Context)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Product Data│  │   Local      │  │   External   │      │
│  │  (Static)    │  │   Storage    │  │   APIs       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Unsplash   │  │   Google     │  │   Payment    │      │
│  │   (Images)   │  │   Fonts      │  │   (Future)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
aurelis/
├── public/                    # Static assets
│   └── images/               # Image assets
│       ├── hero/             # Hero section images
│       ├── editorial/        # Editorial content images
│       ├── collections/      # Collection images
│       ├── blog/             # Blog post images
│       └── watches/          # Product images (if local)
│
├── src/                      # Source code
│   ├── components/           # Reusable UI components
│   │   ├── Header.tsx        # Site header with navigation
│   │   ├── Footer.tsx        # Site footer
│   │   ├── ProductCard.tsx   # Product display card
│   │   ├── CompareDrawer.tsx # Product comparison UI
│   │   ├── MobileNav.tsx     # Mobile navigation
│   │   └── Shared.tsx        # Shared components (Toast, etc.)
│   │
│   ├── pages/                # Route-level components
│   │   ├── HomePage.tsx      # Landing page
│   │   ├── ShopPage.tsx      # Product catalog
│   │   ├── ProductPage.tsx   # Product detail
│   │   ├── CartPage.tsx      # Shopping cart
│   │   ├── CheckoutPage.tsx  # Checkout flow
│   │   ├── WishlistPage.tsx  # Wishlist
│   │   ├── AccountPage.tsx   # User account
│   │   ├── AboutPage.tsx     # About/brand story
│   │   ├── JournalPage.tsx   # Blog/editorial
│   │   ├── CollectionsPage.tsx # Collections
│   │   └── OtherPages.tsx    # New arrivals, bestsellers, 404
│   │
│   ├── store/                # State management
│   │   └── StoreContext.tsx  # Global state context
│   │
│   ├── data/                 # Static data & types
│   │   └── products.ts       # Product data & types
│   │
│   ├── App.tsx               # Root component & routing
│   ├── main.tsx              # App entry point
│   └── index.css             # Global styles & Tailwind
│
├── index.html                # HTML template
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── tailwind.config.js        # Tailwind configuration
```

---

## 🔄 Data Flow

### State Management Architecture

```
┌─────────────────────────────────────────┐
│         StoreContext (Provider)          │
│  ┌───────────────────────────────────┐  │
│  │         Global State              │  │
│  │  ┌─────────┐  ┌──────────────┐  │  │
│  │  │  Cart   │  │  Wishlist    │  │  │
│  │  └─────────┘  └──────────────┘  │  │
│  │  ┌─────────┐  ┌──────────────┐  │  │
│  │  │Recently │  │   Compare    │  │  │
│  │  │ Viewed  │  │    List      │  │  │
│  │  └─────────┘  └──────────────┘  │  │
│  │  ┌─────────┐  ┌──────────────┐  │  │
│  │  │ Search  │  │   Toasts     │  │  │
│  │  │ History │  │              │  │  │
│  │  └─────────┘  └──────────────┘  │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │        useReducer                 │  │
│  │   (State + Actions → New State)   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      localStorage (Persistence)   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Data Flow Pattern

```
User Action
    ↓
Component dispatch(action)
    ↓
Reducer processes action
    ↓
New state created
    ↓
Context updates
    ↓
Components re-render
    ↓
localStorage updated (if persistent)
```

---

## 🧭 Routing Architecture

### Route Structure

```typescript
/                           → HomePage
/shop                       → ShopPage
/product/:slug              → ProductPage
/cart                       → CartPage
/checkout                   → CheckoutPage
/wishlist                   → WishlistPage
/account                    → AccountPage
/collections                → CollectionsPage (index)
/collections/:slug          → CollectionsPage (detail)
/new-arrivals               → NewArrivalsPage
/best-sellers               → BestSellersPage
/about                      → AboutPage
/journal                    → JournalPage
*                           → NotFoundPage (404)
```

### Route Hierarchy

```
App (BrowserRouter)
├── Header (persistent)
├── Routes
│   ├── HomePage
│   ├── ShopPage
│   ├── ProductPage
│   ├── CartPage
│   ├── CheckoutPage
│   ├── WishlistPage
│   ├── AccountPage
│   ├── CollectionsPage
│   ├── NewArrivalsPage
│   ├── BestSellersPage
│   ├── AboutPage
│   ├── JournalPage
│   └── NotFoundPage
├── Footer (persistent)
├── CompareDrawer (conditional)
├── MobileNav (conditional)
├── ToastContainer (persistent)
├── NewsletterPopup (conditional)
└── SupportWidget (persistent)
```

---

## 🎨 Component Architecture

### Component Hierarchy

```
App
├── Header
│   ├── AnnouncementBar
│   ├── Navigation
│   │   ├── Logo
│   │   ├── NavLinks
│   │   └── IconButtons (Search, Account, Wishlist, Cart)
│   ├── MegaMenu (conditional)
│   ├── SearchOverlay (conditional)
│   └── CartDrawer (conditional)
│
├── Pages
│   ├── HomePage
│   │   ├── HeroSection
│   │   ├── TrustBar
│   │   ├── FeaturedCollection
│   │   ├── EditorialSection
│   │   ├── CollectionsGrid
│   │   ├── NewArrivals
│   │   ├── LimitedEditionBanner
│   │   ├── Testimonials
│   │   └── CTASection
│   │
│   ├── ShopPage
│   │   ├── FilterSidebar
│   │   ├── ProductGrid
│   │   │   └── ProductCard[]
│   │   ├── SortControls
│   │   └── Pagination
│   │
│   ├── ProductPage
│   │   ├── Breadcrumbs
│   │   ├── ImageGallery
│   │   ├── ProductInfo
│   │   ├── AddToCartControls
│   │   ├── Specifications
│   │   ├── Reviews
│   │   └── RelatedProducts
│   │
│   └── ... (other pages)
│
├── Footer
│   ├── NewsletterSection
│   ├── FooterColumns
│   └── BottomBar
│
└── GlobalComponents
    ├── CompareDrawer
    ├── MobileNav
    ├── ToastContainer
    ├── NewsletterPopup
    └── SupportWidget
```

---

## 💾 State Management

### State Structure

```typescript
interface StoreState {
  // Cart
  cart: CartItem[];

  // Wishlist
  wishlist: string[];

  // Recently Viewed
  recentlyViewed: string[];

  // Compare List
  compareList: string[];

  // Search History
  searchHistory: string[];

  // UI State
  toasts: Toast[];
  newsletterPopupShown: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}
```

### Action Types

```typescript
type Action =
  // Cart Actions
  | { type: "ADD_TO_CART"; product: Product; quantity?: number }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }

  // Wishlist Actions
  | { type: "TOGGLE_WISHLIST"; productId: string }

  // Recently Viewed Actions
  | { type: "ADD_RECENTLY_VIEWED"; productId: string }

  // Compare Actions
  | { type: "TOGGLE_COMPARE"; productId: string }

  // Search Actions
  | { type: "ADD_SEARCH_HISTORY"; query: string }

  // Toast Actions
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "REMOVE_TOAST"; id: string }

  // UI Actions
  | { type: "SET_NEWSLETTER_SHOWN" }

  // Initialization
  | { type: "LOAD_STATE"; state: Partial<StoreState> };
```

---

## 🖼️ Image Architecture

### Image Sources

```typescript
// 1. Unsplash CDN (Products)
const U = (id: string) =>
  `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`;

// 2. Local Images (Hero/Editorial)
const localImage = "/images/hero/watch.jpg";

// 3. Unsplash CDN (Collections/Blog)
const collectionImage = "https://images.unsplash.com/photo-[ID]?w=1200&q=80";
```

### Image Organization

```
public/images/
├── hero/              # Hero section backgrounds
│   ├── watch.jpg      # Main hero image
│   └── ...
├── editorial/         # Editorial content
│   ├── craftsmanship.jpg
│   └── ...
├── collections/       # Collection images
│   ├── signature.jpg
│   └── ...
├── blog/              # Blog post images
│   ├── blog-1.jpg
│   └── ...
└── watches/           # Product images (if local)
    ├── sovereign-1.jpg
    └── ...
```

---

## 🎬 Animation Architecture

### Animation Strategy

```typescript
// 1. Framer Motion (Complex animations)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  {/* Content */}
</motion.div>

// 2. CSS Transitions (Simple hover effects)
<div className="transition-all duration-300 hover:scale-105">
  {/* Content */}
</div>

// 3. CSS Animations (Loading states)
<div className="animate-spin">
  {/* Content */}
</div>
```

### Animation Timing

```typescript
const TIMING = {
  fast: 200, // Hover effects
  medium: 300, // Modals, dropdowns
  slow: 500, // Page transitions
  verySlow: 800, // Hero animations
};

const EASING = {
  easeOut: [0.0, 0.0, 0.2, 1],
  easeIn: [0.4, 0.0, 1, 1],
  easeInOut: [0.4, 0.0, 0.2, 1],
};
```

---

## 📱 Responsive Architecture

### Breakpoint Strategy

```typescript
const BREAKPOINTS = {
  mobile: '0px',      // Default
  tablet: '768px',    // md
  desktop: '1024px',  // lg
};

// Mobile-first approach
<div className="
  grid-cols-2      // Mobile
  md:grid-cols-3   // Tablet
  lg:grid-cols-4   // Desktop
">
```

### Layout Patterns

```typescript
// Mobile: Single column, bottom nav
// Tablet: 2-3 columns, condensed nav
// Desktop: 4 columns, full nav, sidebar
```

---

## ⚡ Performance Architecture

### Optimization Strategies

```typescript
// 1. Code Splitting
const ShopPage = lazy(() => import('./pages/ShopPage'));

// 2. Memoization
const ProductCard = memo(({ product }) => {
  return <div>{product.name}</div>;
});

// 3. Lazy Loading
<img loading="lazy" src="..." alt="..." />

// 4. Image Optimization
<img
  src="image-800w.jpg"
  srcSet="image-400w.jpg 400w, image-800w.jpg 800w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="..."
/>
```

### Bundle Structure

```
dist/
├── index.html              (1.5 KB)
└── assets/
    ├── index-*.css         (42 KB / 8 KB gzipped)
    └── index-*.js          (422 KB / 122 KB gzipped)
```

---

## 🔐 Security Architecture

### Security Measures

```typescript
// 1. Input Validation
const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// 2. XSS Protection
// React automatically escapes content
<div>{userInput}</div>

// 3. CSRF Protection (Future)
// Implement CSRF tokens for API calls

// 4. Content Security Policy
// Configure CSP headers in deployment
```

---

## 🧪 Testing Architecture

### Testing Strategy

```typescript
// 1. Unit Tests (Components)
describe('ProductCard', () => {
  it('renders product name', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Product Name')).toBeInTheDocument();
  });
});

// 2. Integration Tests (Flows)
describe('Cart Flow', () => {
  it('adds product to cart', () => {
    // Test complete flow
  });
});

// 3. E2E Tests (Critical Paths)
describe('Checkout', () => {
  it('completes purchase', () => {
    // Test end-to-end
  });
});
```

---

## 🚀 Deployment Architecture

### Build Process

```bash
# 1. Development
npm run dev          # Start dev server

# 2. Build
npm run build        # Build for production

# 3. Deploy
# Upload dist/ to hosting platform
```

### Hosting Options

```
Option 1: Vercel
- Automatic deployments
- Edge network
- Serverless functions

Option 2: Netlify
- Automatic deployments
- Edge network
- Serverless functions

Option 3: AWS S3 + CloudFront
- Manual deployments
- Global CDN
- Custom configuration
```

---

## 📊 Future Architecture (Phase 2+)

### Backend Integration

```
┌─────────────────────────────────────────┐
│           Frontend (React)              │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│           API Layer (REST/GraphQL)      │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│        Backend Services                 │
│  ┌──────────┐  ┌──────────┐           │
│  │ Products │  │   Cart   │           │
│  │  Service │  │  Service │           │
│  └──────────┘  └──────────┘           │
│  ┌──────────┐  ┌──────────┐           │
│  │  Orders  │  │   Users  │           │
│  │  Service │  │  Service │           │
│  └──────────┘  └──────────┘           │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│           Database Layer                │
│  ┌──────────┐  ┌──────────┐           │
│  │PostgreSQL│  │  Redis   │           │
│  │ (Primary)│  │  (Cache) │           │
│  └──────────┘  └──────────┘           │
└─────────────────────────────────────────┘
```

---

## 📚 Resources

### Documentation

- [React Architecture](https://react.dev/learn/thinking-in-react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Tools

- [React DevTools](https://react.dev/learn/react-developer-tools)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Bundle Analyzer](https://www.npmjs.com/package/rollup-plugin-visualizer)

---

**Last Updated:** 2026
**Version:** 1.0
**Maintained By:** SURAKURI

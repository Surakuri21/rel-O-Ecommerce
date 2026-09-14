# SURAKURI — Time, Refined.

> A premium luxury watch ecommerce platform built with React, TypeScript, and Tailwind CSS.

![SURAKURI](https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=80&auto=format&fit=crop)

---

## 🎯 Overview

SURAKURI is a sophisticated luxury watch ecommerce platform that delivers an editorial, cinematic shopping experience. Built with modern web technologies, it combines the elegance of Swiss watchmaking with cutting-edge digital craftsmanship.

### ✨ Key Features

- 🛍️ **Complete Ecommerce Experience** - Product catalog, cart, checkout, wishlist
- 🎨 **Premium Design System** - Luxury aesthetic with refined typography and animations
- 📱 **Fully Responsive** - Mobile-first design that works beautifully on all devices
- ⚡ **High Performance** - Optimized bundle size and fast page loads
- ♿ **Accessible** - WCAG AA compliant with keyboard navigation support
- 🔍 **SEO Optimized** - Meta tags, structured data, and semantic HTML
- 🎬 **Smooth Animations** - Framer Motion powered transitions and interactions
- 💾 **State Persistence** - Cart and wishlist survive page refreshes

---

## 🚀 Quick Start

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

# Open http://localhost:5173 in your browser
```

### Build for Production

```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
Surakuri-rel-O/
├── public/                 # Static assets
│   └── images/            # Image assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Route-level components
│   ├── store/             # State management
│   ├── data/              # Static data & types
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

## 🛠️ Tech Stack

| Technology    | Version | Purpose      |
| ------------- | ------- | ------------ |
| React         | 18.2.0  | UI framework |
| TypeScript    | 5.7.0   | Type safety  |
| Vite          | 6.3.5   | Build tool   |
| Tailwind CSS  | 4.1.7   | Styling      |
| React Router  | 6.8.0   | Routing      |
| Framer Motion | 11.16.1 | Animations   |
| Lucide React  | 0.294.0 | Icons        |

---

## 🎨 Design System

### Colors

```css
/* Primary */
--color-obsidian: #0a0a0a; /* Dark backgrounds */
--color-ivory: #faf8f5; /* Light backgrounds */

/* Accent */
--color-champagne: #d4af37; /* Gold accent (use sparingly) */
--color-gold: #c9a96e; /* Secondary gold */

/* Neutral */
--color-warm-gray: #8a8580; /* Secondary text */
--color-soft-gray: #b5b0aa; /* Tertiary text */
```

### Typography

```css
/* Serif - Headlines */
--font-serif: "Cormorant Garamond", serif;

/* Sans-Serif - Body */
--font-sans: "Inter", sans-serif;
```

### Spacing

```css
/* 8px grid system */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
--spacing-3xl: 64px;
--spacing-4xl: 96px;
```

---

## 📖 Documentation

Comprehensive documentation is available in the following files:

- **[MASTER-RULES.md](./MASTER-RULES.md)** - Overall project rules and guidelines
- **[AI-OPERATING-RULES.md](./AI-OPERATING-RULES.md)** - Rules for AI assistants
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture
- **[DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)** - Visual design guidelines
- **[TECH-STACK.md](./TECH-STACK.md)** - Technology stack details
- **[PRD.md](./PRD.md)** - Product requirements document
- **[RESPONSIVE-RULES.md](./RESPONSIVE-RULES.md)** - Responsive design guidelines
- **[TASK.md](./TASK.md)** - Project tasks and roadmap
- **[FEATURE.md](./FEATURE.md)** - Complete feature list
- **[CONTEXT-PROTOCOL.md](./CONTEXT-PROTOCOL.md)** - State management protocol
- **[UI-CRITIQUE.md](./UI-CRITIQUE.md)** - UI/UX guidelines
- **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** - Implementation guide

---

## 🎯 Features

### Ecommerce

- ✅ Product catalog with 22 luxury watches
- ✅ Advanced filtering and sorting
- ✅ Shopping cart with persistence
- ✅ Multi-step checkout process
- ✅ Wishlist functionality
- ✅ Product comparison (up to 4 products)
- ✅ Search with live results
- ✅ Coupon code support

### User Experience

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Product image galleries
- ✅ Recently viewed products
- ✅ Toast notifications
- ✅ Loading states and skeletons
- ✅ Empty states

### Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Color contrast (WCAG AA)
- ✅ Reduced motion support

---

## 📱 Routes

| Route                | Page         | Description            |
| -------------------- | ------------ | ---------------------- |
| `/`                  | Home         | Landing page with hero |
| `/shop`              | Shop         | Product catalog        |
| `/product/:slug`     | Product      | Product detail         |
| `/cart`              | Cart         | Shopping cart          |
| `/checkout`          | Checkout     | Checkout flow          |
| `/wishlist`          | Wishlist     | Saved items            |
| `/account`           | Account      | User account           |
| `/collections`       | Collections  | Collection index       |
| `/collections/:slug` | Collection   | Collection detail      |
| `/new-arrivals`      | New Arrivals | Latest products        |
| `/best-sellers`      | Best Sellers | Top products           |
| `/about`             | About        | Brand story            |
| `/journal`           | Journal      | Blog                   |

---

## 🎨 Design Principles

1. **Luxury First** - Every element should feel premium and intentional
2. **Editorial Style** - Magazine-like layouts with generous whitespace
3. **Cinematic** - Large imagery with subtle animations
4. **Timeless** - Classic design that won't feel dated
5. **Accessible** - Beautiful and usable for everyone

---

## ⚡ Performance

### Bundle Size

```
dist/index.html          1.46 kB
dist/assets/index-*.css  42.79 kB (8.59 kB gzipped)
dist/assets/index-*.js   425.73 kB (123.04 kB gzipped)
```

### Optimization

- ✅ Code splitting by route
- ✅ Lazy loading images
- ✅ Tree shaking
- ✅ CSS purging
- ✅ Image optimization
- ✅ Font optimization

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
```

---

## 🚀 Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Manual

```bash
npm run build
# Upload dist/ folder to your hosting
```

---

## 📊 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ iOS Safari (latest)
- ✅ Android Chrome (latest)

---

## 🤝 Contributing

### For Developers

1. Read [MASTER-RULES.md](./MASTER-RULES.md)
2. Follow the design system in [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)
3. Test your changes thoroughly
4. Update documentation if needed
5. Submit a pull request

### For AI Assistants

1. Read [AI-OPERATING-RULES.md](./AI-OPERATING-RULES.md)
2. Follow [MASTER-RULES.md](./MASTER-RULES.md)
3. Use the design system consistently
4. Test before committing
5. Document non-obvious decisions

---

## 📝 License

This project is proprietary and confidential.

---

## 🙏 Acknowledgments

- **Photography** - Unsplash contributors
- **Typography** - Google Fonts (Cormorant Garamond, Inter)
- **Icons** - Lucide React
- **Inspiration** - Luxury watch brands (Rolex, Patek Philippe, Audemars Piguet)

---

## 📞 Support

For questions or issues, please refer to:

- [IMPLEMENTATION.md](./IMPLEMENTATION.md) - Technical implementation guide
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) - Design guidelines

---

## 🎯 Roadmap

### Phase 2 (Q2 2026)

- [ ] User accounts and authentication
- [ ] Product reviews system
- [ ] Payment gateway integration
- [ ] Email notification system
- [ ] Backend API integration

### Phase 3 (Q3 2026)

- [ ] Advanced product recommendations
- [ ] Customer support chat
- [ ] Loyalty program
- [ ] Gift cards
- [ ] Internationalization

### Phase 4 (Q4 2026)

- [ ] Mobile app (React Native)
- [ ] Progressive Web App
- [ ] AR try-on feature
- [ ] Subscription service

---

## 📈 Stats

- **Products:** 22 luxury watches
- **Categories:** 8
- **Collections:** 4
- **Pages:** 14
- **Components:** 15+
- **Features:** 50+

---

<div align="center">

**SURAKURI — Time, Refined.**

_Crafted with precision. Designed with purpose._

</div>

---

**Last Updated:** 2026
**Version:** 1.0
**Status:** ✅ Production Ready

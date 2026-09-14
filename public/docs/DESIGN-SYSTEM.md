# SURAKURI — Design System

> Comprehensive design system and visual guidelines for the SURAKURI luxury watch ecommerce platform.

---

## 🎨 Color Palette

### Primary Colors

```css
/* Obsidian - Primary Dark */
--color-obsidian: #0a0a0a;
/* Usage: Primary backgrounds, text, buttons */

/* Ivory - Primary Light */
--color-ivory: #faf8f5;
/* Usage: Primary light backgrounds, cards */
```

### Secondary Colors

```css
/* Charcoal - Secondary Dark */
--color-charcoal: #1a1a1a;
/* Usage: Secondary dark backgrounds, hover states */

/* Cream - Secondary Light */
--color-cream: #f5f0ea;
/* Usage: Secondary light backgrounds, subtle sections */
```

### Accent Colors

```css
/* Champagne - Primary Accent */
--color-champagne: #d4af37;
/* Usage: CTAs, highlights, luxury accents (USE SPARINGLY) */

/* Gold - Secondary Accent */
--color-gold: #c9a96e;
/* Usage: Secondary accents, hover states */

/* Gold Light - Tertiary Accent */
--color-gold-light: #e8d5a3;
/* Usage: Subtle highlights, backgrounds */
```

### Neutral Colors

```css
/* Warm Gray - Primary Text */
--color-warm-gray: #8a8580;
/* Usage: Secondary text, labels, descriptions */

/* Soft Gray - Tertiary Text */
--color-soft-gray: #b5b0aa;
/* Usage: Tertiary text, placeholders, disabled states */
```

### Color Usage Guidelines

**Do:**

- Use obsidian for primary dark backgrounds
- Use ivory for primary light backgrounds
- Use champagne sparingly as an accent (not dominant)
- Use warm-gray for secondary text
- Maintain high contrast for readability

**Don't:**

- Use pure white (#ffffff) for backgrounds
- Use champagne as a primary color
- Use more than one accent color at a time
- Use colors outside the palette
- Create gradients with non-palette colors

---

## 📝 Typography

### Font Families

```css
/* Serif - Headlines & Editorial */
--font-serif: "Cormorant Garamond", serif;
/* Usage: Headlines, brand elements, editorial text */

/* Sans-Serif - Body & UI */
--font-sans: "Inter", sans-serif;
/* Usage: Body text, UI elements, navigation */
```

### Type Scale

```css
/* Display - Hero Headlines */
.text-display {
  font-family: var(--font-serif);
  font-size: 4rem; /* 64px */
  font-weight: 300;
  letter-spacing: 0.15em;
  line-height: 1.1;
}

/* H1 - Page Titles */
.text-h1 {
  font-family: var(--font-serif);
  font-size: 3rem; /* 48px */
  font-weight: 400;
  letter-spacing: 0.1em;
  line-height: 1.2;
}

/* H2 - Section Titles */
.text-h2 {
  font-family: var(--font-serif);
  font-size: 2.5rem; /* 40px */
  font-weight: 400;
  letter-spacing: 0.08em;
  line-height: 1.3;
}

/* H3 - Subsection Titles */
.text-h3 {
  font-family: var(--font-serif);
  font-size: 2rem; /* 32px */
  font-weight: 400;
  letter-spacing: 0.05em;
  line-height: 1.4;
}

/* H4 - Card Titles */
.text-h4 {
  font-family: var(--font-serif);
  font-size: 1.5rem; /* 24px */
  font-weight: 500;
  letter-spacing: 0.03em;
  line-height: 1.4;
}

/* Body Large - Lead Text */
.text-body-lg {
  font-family: var(--font-sans);
  font-size: 1.125rem; /* 18px */
  font-weight: 300;
  letter-spacing: 0;
  line-height: 1.7;
}

/* Body - Default Text */
.text-body {
  font-family: var(--font-sans);
  font-size: 1rem; /* 16px */
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.6;
}

/* Body Small - Secondary Text */
.text-body-sm {
  font-family: var(--font-sans);
  font-size: 0.875rem; /* 14px */
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.5;
}

/* Label - UI Labels */
.text-label {
  font-family: var(--font-sans);
  font-size: 0.75rem; /* 12px */
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  line-height: 1.4;
}

/* Caption - Fine Print */
.text-caption {
  font-family: var(--font-sans);
  font-size: 0.625rem; /* 10px */
  font-weight: 400;
  letter-spacing: 0.1em;
  line-height: 1.3;
}
```

### Typography Guidelines

**Headlines:**

- Use Cormorant Garamond (serif)
- Font weights: 300-500 (never bold)
- Letter spacing: 0.05em - 0.3em
- Never use all-caps for long headlines

**Body Text:**

- Use Inter (sans-serif)
- Font weights: 300-500
- Line height: 1.5 - 1.7
- Maximum line length: 65 characters

**Labels:**

- Use Inter (sans-serif)
- Always uppercase
- Letter spacing: 0.15em - 0.3em
- Font size: 10-12px

---

## 📐 Spacing System

### Base Unit

```css
/* 8px grid system */
--spacing-unit: 8px;
```

### Spacing Scale

```css
/* Extra Small */
--spacing-xs: 4px; /* 0.25rem */
/* Usage: Tight spacing, icon gaps */

/* Small */
--spacing-sm: 8px; /* 0.5rem */
/* Usage: Small gaps, form fields */

/* Medium */
--spacing-md: 16px; /* 1rem */
/* Usage: Standard padding, card spacing */

/* Large */
--spacing-lg: 24px; /* 1.5rem */
/* Usage: Section padding, card margins */

/* Extra Large */
--spacing-xl: 32px; /* 2rem */
/* Usage: Large section spacing */

/* 2X Large */
--spacing-2xl: 48px; /* 3rem */
/* Usage: Hero spacing, major sections */

/* 3X Large */
--spacing-3xl: 64px; /* 4rem */
/* Usage: Page sections */

/* 4X Large */
--spacing-4xl: 96px; /* 6rem */
/* Usage: Hero sections, dramatic spacing */
```

### Spacing Guidelines

**Mobile:**

- Container padding: 16px (1rem)
- Section padding: 24px (1.5rem)
- Card padding: 16px (1rem)
- Gap between cards: 16px (1rem)

**Tablet:**

- Container padding: 32px (2rem)
- Section padding: 48px (3rem)
- Card padding: 24px (1.5rem)
- Gap between cards: 24px (1.5rem)

**Desktop:**

- Container padding: 48px (3rem)
- Section padding: 64px (4rem)
- Card padding: 32px (2rem)
- Gap between cards: 32px (2rem)

---

## 🎭 Component Patterns

### Buttons

#### Primary Button

```tsx
<button
  className="
  bg-obsidian
  text-ivory
  px-8 py-4
  text-[11px]
  tracking-[0.2em]
  uppercase
  font-medium
  hover:bg-charcoal
  transition-colors
  duration-300
"
>
  Primary Action
</button>
```

#### Secondary Button

```tsx
<button
  className="
  border border-obsidian
  text-obsidian
  px-8 py-4
  text-[11px]
  tracking-[0.2em]
  uppercase
  font-medium
  hover:bg-obsidian
  hover:text-ivory
  transition-colors
  duration-300
"
>
  Secondary Action
</button>
```

#### Ghost Button

```tsx
<button
  className="
  text-obsidian
  px-8 py-4
  text-[11px]
  tracking-[0.2em]
  uppercase
  font-medium
  hover:text-champagne
  transition-colors
  duration-300
"
>
  Ghost Action
</button>
```

#### Icon Button

```tsx
<button
  className="
  p-3
  hover:text-champagne
  transition-colors
"
  aria-label="Button label"
>
  <Icon size={18} />
</button>
```

### Cards

#### Product Card

```tsx
<div className="group relative">
  {/* Image */}
  <div className="aspect-[3/4] overflow-hidden bg-cream">
    <img
      src={product.images[0]}
      alt={product.name}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  </div>

  {/* Content */}
  <div className="mt-4 space-y-2">
    <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray">
      {product.brand}
    </p>
    <h3 className="font-medium text-sm group-hover:text-champagne transition-colors">
      {product.name}
    </h3>
    <p className="text-sm font-medium">${product.price.toLocaleString()}</p>
  </div>
</div>
```

#### Content Card

```tsx
<div className="bg-ivory p-8 hover:shadow-lg transition-shadow duration-300">
  <h3 className="font-serif text-xl mb-4">Title</h3>
  <p className="text-warm-gray text-sm leading-relaxed">Content goes here</p>
</div>
```

### Forms

#### Input Field

```tsx
<div>
  <label htmlFor="input" className="text-xs text-warm-gray block mb-2">
    Label
  </label>
  <input
    id="input"
    type="text"
    className="
      w-full
      border border-gray-200
      px-4 py-3
      text-sm
      outline-none
      focus:border-champagne
      transition-colors
    "
    placeholder="Placeholder"
  />
</div>
```

#### Select Field

```tsx
<div>
  <label htmlFor="select" className="text-xs text-warm-gray block mb-2">
    Label
  </label>
  <select
    id="select"
    className="
      w-full
      border border-gray-200
      px-4 py-3
      text-sm
      bg-transparent
      outline-none
      focus:border-champagne
      transition-colors
    "
  >
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</div>
```

#### Checkbox

```tsx
<label className="flex items-center gap-2 cursor-pointer">
  <input type="checkbox" className="w-4 h-4 accent-obsidian cursor-pointer" />
  <span className="text-sm">Label</span>
</label>
```

### Navigation

#### Header

```tsx
<header
  className="
  fixed top-0 left-0 right-0 z-50
  bg-ivory/95 backdrop-blur-md
  border-b border-gray-100
  transition-all duration-300
"
>
  <nav
    className="
    max-w-[1440px] mx-auto
    px-4 lg:px-8
    flex items-center justify-between
    h-16 lg:h-20
  "
  >
    {/* Logo */}
    <Link to="/" className="font-serif text-2xl tracking-[0.2em]">
      SURAKURI
    </Link>

    {/* Navigation Links */}
    <div className="hidden lg:flex items-center gap-8">
      <Link
        to="/shop"
        className="text-[11px] tracking-[0.15em] uppercase hover:text-champagne transition-colors"
      >
        Shop
      </Link>
    </div>

    {/* Icons */}
    <div className="flex items-center gap-4">
      <button
        aria-label="Search"
        className="p-2 hover:text-champagne transition-colors"
      >
        <Search size={18} />
      </button>
    </div>
  </nav>
</header>
```

#### Footer

```tsx
<footer className="bg-obsidian text-ivory">
  <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-16">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {/* Footer columns */}
    </div>
  </div>

  <div className="border-t border-white/10">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-6">
      <p className="text-xs text-warm-gray text-center">
        © 2026 SURAKURI. All rights reserved.
      </p>
    </div>
  </div>
</footer>
```

---

## 🎬 Animation Guidelines

### Timing

```typescript
// Fast (hover, focus)
duration: 200-300ms
easing: ease-out

// Medium (modals, dropdowns)
duration: 300-400ms
easing: ease-out

// Slow (page transitions, hero)
duration: 500-800ms
easing: ease-in-out

// Stagger delays
delay: 50-150ms between items
```

### Animation Patterns

#### Page Load

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {/* Content */}
</motion.div>
```

#### Staggered List

```tsx
{
  items.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Item */}
    </motion.div>
  ));
}
```

#### Hover Effect

```tsx
<div className="transition-all duration-300 hover:scale-105 hover:shadow-xl">
  {/* Content */}
</div>
```

#### Modal Entrance

```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {/* Modal content */}
    </motion.div>
  )}
</AnimatePresence>
```

---

## 📱 Responsive Guidelines

### Breakpoints

```typescript
// Mobile (default)
0px - 767px

// Tablet (md)
768px - 1023px

// Desktop (lg)
1024px+
```

### Grid System

```tsx
// Mobile: 2 columns
// Tablet: 3 columns
// Desktop: 4 columns
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
  {/* Items */}
</div>
```

### Container Widths

```tsx
// Max width container
<div className="max-w-[1440px] mx-auto px-4 lg:px-8">{/* Content */}</div>
```

---

## ♿ Accessibility Guidelines

### Color Contrast

```
✓ Text on backgrounds: 4.5:1 minimum (WCAG AA)
✓ Large text: 3:1 minimum
✓ UI components: 3:1 minimum
✓ Never use color alone to convey information
```

### Focus States

```css
*:focus-visible {
  outline: 2px solid var(--color-champagne);
  outline-offset: 2px;
}
```

### Touch Targets

```
✓ Minimum: 44px × 44px
✓ Recommended: 48px × 48px
✓ Include padding in calculation
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🖼️ Image Guidelines

### Product Images

```
✓ Minimum size: 800px × 800px
✓ Aspect ratio: 3:4 (portrait)
✓ Format: JPG or WebP
✓ Quality: 80%
✓ Background: Clean, neutral
✓ Lighting: Professional, consistent
```

### Hero Images

```
✓ Minimum size: 1920px × 1080px
✓ Aspect ratio: 16:9 or 2:1
✓ Format: JPG or WebP
✓ Quality: 80%
✓ Composition: Cinematic, editorial
```

### Image Optimization

```tsx
// Lazy loading
<img loading="lazy" src="..." alt="..." />

// Responsive images
<img
  src="image-800w.jpg"
  srcSet="image-400w.jpg 400w, image-800w.jpg 800w, image-1200w.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="..."
/>
```

---

## 📚 Resources

### Design Tools

- Figma: Design files and prototypes
- Chrome DevTools: Testing and debugging
- Lighthouse: Performance auditing
- axe: Accessibility auditing

### Inspiration

- Rolex.com
- Patek Philippe
- Audemars Piguet
- A. Lange & Söhne
- Net-a-Porter

### Documentation

- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)
- [React](https://react.dev)

---

**Last Updated:** 2026
**Version:** 1.0
**Maintained By:** SURAKURI

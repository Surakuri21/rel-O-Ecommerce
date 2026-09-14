# SURAKURI — Responsive Design Rules

> Comprehensive responsive design guidelines for the SURAKURI luxury watch ecommerce platform.

---

## 🎯 Core Principles

### Mobile-First Approach

- Design for mobile first, then enhance for larger screens
- Start with the smallest screen size and progressively add complexity
- Never break mobile to add desktop features
- Test on real devices, not just browser resize

### Breakpoint Strategy

- Use Tailwind's default breakpoints
- Keep breakpoint count minimal (3-4 max)
- Design for content, not devices
- Test at every breakpoint

### Touch vs Mouse

- Mobile: Touch interactions (tap, swipe, pinch)
- Desktop: Mouse interactions (hover, click, scroll)
- Design interactions appropriate to input method
- Never rely solely on hover for critical functionality

---

## 📐 Breakpoints

### Tailwind Default Breakpoints

```css
/* Mobile (default) */
0px - 639px

/* Small (sm) */
@media (min-width: 640px) {
}

/* Medium (md) - Tablet */
@media (min-width: 768px) {
}

/* Large (lg) - Desktop */
@media (min-width: 1024px) {
}

/* Extra Large (xl) - Large Desktop */
@media (min-width: 1280px) {
}

/* 2X Large (2xl) - Extra Large Desktop */
@media (min-width: 1536px) {
}
```

### Our Active Breakpoints

```typescript
// We primarily use these breakpoints:
Mobile:   0px - 767px   (default)
Tablet:   768px - 1023px (md)
Desktop:  1024px+        (lg)
```

---

## 📱 Mobile Design (< 768px)

### Layout

```tsx
// Single column layout
<div className="grid grid-cols-1 gap-4">
  {/* Content */}
</div>

// Two column product grid
<div className="grid grid-cols-2 gap-4">
  {/* Products */}
</div>

// Stacked elements
<div className="flex flex-col gap-4">
  {/* Elements */}
</div>
```

### Typography

```tsx
// Mobile font sizes
<h1 className="text-3xl md:text-5xl lg:text-7xl">
<h2 className="text-2xl md:text-4xl lg:text-6xl">
<p className="text-sm md:text-base lg:text-lg">
```

### Spacing

```tsx
// Mobile padding
<div className="px-4 py-6 md:px-8 md:py-12 lg:px-12 lg:py-16">

// Mobile margins
<div className="mb-4 md:mb-8 lg:mb-12">
```

### Navigation

```tsx
// Mobile navigation
<nav className="lg:hidden">
  {/* Hamburger menu */}
</nav>

// Bottom navigation
<nav className="fixed bottom-0 left-0 right-0 lg:hidden">
  {/* Bottom nav items */}
</nav>
```

### Touch Targets

```tsx
// Minimum touch target: 44px × 44px
<button className="min-h-[44px] min-w-[44px] p-3">
  {/* Button content */}
</button>

// Icon buttons
<button className="p-3 min-h-[44px] min-w-[44px]">
  <Icon size={20} />
</button>
```

### Images

```tsx
// Responsive images
<img
  src="image-800w.jpg"
  srcSet="image-400w.jpg 400w, image-800w.jpg 800w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Description"
  className="w-full h-auto"
/>
```

### Forms

```tsx
// Mobile-friendly forms
<input
  type="text"
  className="w-full px-4 py-3 text-base"
  placeholder="Enter text"
/>

// Larger touch targets
<select className="w-full px-4 py-3 text-base min-h-[44px]">
  {/* Options */}
</select>
```

---

## 📱 Tablet Design (768px - 1023px)

### Layout

```tsx
// Two to three column layout
<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
  {/* Content */}
</div>

// Three column product grid
<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
  {/* Products */}
</div>
```

### Typography

```tsx
// Tablet font sizes
<h1 className="text-4xl md:text-5xl lg:text-7xl">
<h2 className="text-3xl md:text-4xl lg:text-6xl">
<p className="text-base md:text-lg">
```

### Spacing

```tsx
// Tablet padding
<div className="px-8 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">

// Tablet margins
<div className="mb-8 md:mb-12 lg:mb-16">
```

### Navigation

```tsx
// Condensed navigation
<nav className="hidden md:flex lg:hidden">{/* Condensed nav items */}</nav>
```

---

## 💻 Desktop Design (≥ 1024px)

### Layout

```tsx
// Multi-column layout
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {/* Content */}
</div>

// Four column product grid
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
  {/* Products */}
</div>

// Sidebar layout
<div className="flex flex-col lg:flex-row gap-8">
  <aside className="lg:w-64">
    {/* Sidebar */}
  </aside>
  <main className="flex-1">
    {/* Main content */}
  </main>
</div>
```

### Typography

```tsx
// Desktop font sizes
<h1 className="text-5xl md:text-6xl lg:text-7xl">
<h2 className="text-4xl md:text-5xl lg:text-6xl">
<p className="text-lg lg:text-xl">
```

### Spacing

```tsx
// Desktop padding
<div className="px-12 py-16 lg:px-16 lg:py-20 xl:px-20 xl:py-24">

// Desktop margins
<div className="mb-12 lg:mb-16 xl:mb-20">
```

### Navigation

```tsx
// Full navigation
<nav className="hidden lg:flex">
  {/* Full nav items */}
</nav>

// Mega menu
<div className="hidden lg:block">
  {/* Mega menu content */}
</div>
```

---

## 🎨 Responsive Patterns

### Hide/Show Elements

```tsx
// Hide on mobile, show on desktop
<div className="hidden lg:block">
  {/* Desktop only */}
</div>

// Show on mobile, hide on desktop
<div className="lg:hidden">
  {/* Mobile only */}
</div>

// Show on tablet and up
<div className="hidden md:block">
  {/* Tablet and desktop */}
</div>
```

### Responsive Grid

```tsx
// Product grid
<div
  className="
  grid
  grid-cols-2      /* Mobile: 2 columns */
  md:grid-cols-3   /* Tablet: 3 columns */
  lg:grid-cols-4   /* Desktop: 4 columns */
  gap-4 md:gap-6 lg:gap-8
"
>
  {/* Products */}
</div>
```

### Responsive Flex

```tsx
// Flex direction
<div className="
  flex
  flex-col         /* Mobile: vertical */
  md:flex-row      /* Tablet+: horizontal */
  gap-4 md:gap-8
">
  {/* Items */}
</div>

// Justify content
<div className="
  justify-center
  md:justify-between
  lg:justify-start
">
  {/* Items */}
</div>
```

### Responsive Spacing

```tsx
// Padding
<div className="
  px-4 py-6        /* Mobile */
  md:px-8 md:py-12 /* Tablet */
  lg:px-12 lg:py-16 /* Desktop */
  xl:px-16 xl:py-20 /* Large desktop */
">
  {/* Content */}
</div>

// Gap
<div className="
  gap-4            /* Mobile */
  md:gap-6         /* Tablet */
  lg:gap-8         /* Desktop */
">
  {/* Items */}
</div>
```

### Responsive Typography

```tsx
// Headings
<h1 className="
  text-3xl          /* Mobile */
  md:text-5xl       /* Tablet */
  lg:text-7xl       /* Desktop */
  font-serif
  tracking-[0.15em]
">
  Title
</h1>

// Body text
<p className="
  text-sm           /* Mobile */
  md:text-base      /* Tablet */
  lg:text-lg        /* Desktop */
  leading-relaxed
">
  Content
</p>
```

### Responsive Images

```tsx
// Hero image
<img
  src="hero-1920w.jpg"
  srcSet="
    hero-640w.jpg 640w,
    hero-1024w.jpg 1024w,
    hero-1920w.jpg 1920w
  "
  sizes="100vw"
  alt="Hero"
  className="w-full h-auto"
/>

// Product image
<img
  src="product-800w.jpg"
  srcSet="
    product-400w.jpg 400w,
    product-800w.jpg 800w
  "
  sizes="(max-width: 768px) 50vw, 25vw"
  alt="Product"
  className="w-full h-auto"
/>
```

---

## 🎬 Responsive Animations

### Motion Preferences

```tsx
// Respect reduced motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 0.6,
  }}
>
  {/* Content */}
</motion.div>
```

### Staggered Lists

```tsx
// Adjust stagger based on screen size
{
  items.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * (window.innerWidth < 768 ? 0.05 : 0.1),
      }}
    >
      {/* Item */}
    </motion.div>
  ));
}
```

---

## 🧪 Testing Checklist

### Mobile Testing

```
□ Test on iPhone (Safari)
□ Test on Android (Chrome)
□ Test on various screen sizes (320px - 767px)
□ Test touch interactions
□ Test bottom navigation
□ Test mobile menu
□ Test mobile filters
□ Test form inputs
□ Test image loading
□ Test font sizes
□ Test spacing
□ Test touch targets (44px minimum)
```

### Tablet Testing

```
□ Test on iPad (Safari)
□ Test on Android tablet (Chrome)
□ Test on various screen sizes (768px - 1023px)
□ Test touch interactions
□ Test condensed navigation
□ Test 3-column grid
□ Test form inputs
□ Test image loading
□ Test font sizes
□ Test spacing
```

### Desktop Testing

```
□ Test on Chrome
□ Test on Firefox
□ Test on Safari
□ Test on Edge
□ Test on various screen sizes (1024px+)
□ Test mouse interactions
□ Test hover effects
□ Test full navigation
□ Test mega menu
□ Test 4-column grid
□ Test sidebar filters
□ Test keyboard navigation
□ Test form inputs
□ Test image loading
□ Test font sizes
□ Test spacing
```

---

## 📏 Responsive Guidelines

### Content Priority

```
Mobile:   Show only essential content
Tablet:   Show most content
Desktop:  Show all content with enhancements
```

### Navigation Priority

```
Mobile:   Bottom nav + hamburger menu
Tablet:   Condensed top nav
Desktop:  Full top nav + mega menu
```

### Interaction Priority

```
Mobile:   Tap, swipe
Tablet:   Tap, swipe, hover (limited)
Desktop:  Click, hover, scroll, keyboard
```

---

## 🎯 Best Practices

### Do This

```tsx
✓ Use mobile-first approach
✓ Test on real devices
✓ Use relative units (rem, em, %)
✓ Use flexbox and grid
✓ Use responsive images
✓ Test at every breakpoint
✓ Keep touch targets 44px minimum
✓ Use semantic HTML
✓ Test accessibility at all sizes
✓ Optimize images for each breakpoint
```

### Don't Do This

```tsx
✗ Design desktop-first
✗ Use fixed widths
✗ Rely solely on hover
✗ Use too many breakpoints
✗ Ignore touch targets
✗ Use absolute positioning for layout
✗ Test only in browser
✗ Ignore performance on mobile
✗ Use same images for all sizes
✗ Forget about orientation changes
```

---

## 🔧 Tools & Resources

### Testing Tools

- Chrome DevTools (device mode)
- Firefox Responsive Design Mode
- Safari Responsive Design Mode
- BrowserStack (real device testing)
- LambdaTest (cross-browser testing)

### Design Tools

- Figma (responsive design)
- Adobe XD (responsive design)
- Sketch (responsive design)

### Documentation

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

---

**Last Updated:** 2026
**Version:** 1.0
**Maintained By:** SURAKURI

# SURAKURI — Master Rules

> The definitive rulebook for developing and maintaining the SURAKURI luxury watch ecommerce platform.

---

## 🎯 Core Philosophy

**"Luxury first, ecommerce second."**

Every decision must pass the luxury test:

- Does it feel expensive?
- Does it feel timeless?
- Does it feel intentional?
- Does it feel restrained?

If the answer to any is "no", reconsider.

---

## 📐 Design Principles (Non-Negotiable)

### 1. Restraint Over Excess

- Never use more than one accent color at a time
- Never use more than two typefaces
- Never use more than three visual weights simultaneously
- Gold/champagne is an ACCENT, not a dominant color

### 2. Cinematic Over Literal

- Photography is the hero, not decoration
- Typography sits ON the image, never competing with it
- Gradients create quiet zones, not dark curtains
- Animation is subtle, never flashy

### 3. Editorial Over Transactional

- Treat product pages like magazine spreads
- Treat collection pages like editorial features
- Treat the shop like a curated gallery
- Never feel like a generic ecommerce template

### 4. Timeless Over Trendy

- No neon colors
- No glassmorphism excess
- No excessive rounded corners
- No skeuomorphic gimmicks
- No SaaS-style gradients

---

## 🎨 Visual Rules

### Color Hierarchy

```
Primary:    obsidian (#0a0a0a) — dominant dark
Secondary:  charcoal (#1a1a1a) — supporting dark
Background: ivory (#faf8f5) — dominant light
Accent:     champagne (#d4af37) — SPARINGLY
Text:       warm-gray (#8a8580) — secondary text
```

### Typography Rules

```
Headlines:  Cormorant Garamond, serif
            Weight: 300-500 (never bold)
            Tracking: 0.1em - 0.3em

Body:       Inter, sans-serif
            Weight: 300-500
            Tracking: 0 - 0.05em

Labels:     Inter, uppercase
            Size: 10-11px
            Tracking: 0.15em - 0.3em
```

### Spacing Rules

- Generous whitespace is mandatory
- Never crowd elements
- Use 8px grid system
- Minimum 24px padding on mobile
- Minimum 40px padding on desktop

---

## 🏗️ Architecture Rules

### Component Rules

1. **Single Responsibility** — Each component does one thing
2. **Composition Over Inheritance** — Build complex UIs from simple parts
3. **Props Over State** — Prefer passing data down, not managing it locally
4. **Context For Global State** — Cart, wishlist, user preferences
5. **Local State For UI** — Modals, dropdowns, form inputs

### File Organization

```
src/
├── components/    # Reusable UI components
├── pages/         # Route-level components
├── store/         # State management
├── data/          # Static data & types
└── utils/         # Helper functions
```

### Naming Conventions

- **Components:** PascalCase (`ProductCard.tsx`)
- **Files:** PascalCase for components, kebab-case for utilities
- **Variables:** camelCase
- **Constants:** UPPER_SNAKE_CASE
- **Types/Interfaces:** PascalCase with `I` prefix optional

---

## 🖼️ Image Rules

### Image Sources

- **Hero/Editorial:** Local files in `public/images/`
- **Products:** Unsplash CDN (verified watch photos)
- **Blog/Collections:** Unsplash CDN

### Image Quality

- Minimum 800px width for products
- Minimum 1920px width for heroes
- Always use `?w=1920&q=80&auto=format&fit=crop`
- Always include meaningful `alt` text

### Image Naming

```
public/images/
├── hero/           # hero-main.jpg, limited-edition.jpg
├── editorial/      # craftsmanship.jpg, watch-movement.jpg
├── collections/    # signature.jpg, heritage.jpg
├── blog/           # blog-1.jpg through blog-6.jpg
└── watches/        # sovereign-1.jpg, celestial-1.jpg
```

---

## ⚡ Performance Rules

### Mandatory

- Lazy load all images below the fold
- Use `loading="lazy"` on product images
- Never block rendering with large JS
- Keep bundle under 500KB gzipped
- Use CSS animations over JS where possible

### Forbidden

- No unnecessary re-renders
- No inline styles for repeated patterns
- No unused dependencies
- No console.logs in production

---

## ♿ Accessibility Rules

### Mandatory

- All interactive elements must be keyboard accessible
- All images must have descriptive alt text
- All form inputs must have labels
- Color contrast must meet WCAG AA (4.5:1)
- Focus states must be visible

### Preferred

- ARIA labels on icon-only buttons
- Semantic HTML elements
- Skip navigation links
- Reduced motion support

---

## 📱 Responsive Rules

### Breakpoints

```
Mobile:   < 768px   (2 columns, bottom nav)
Tablet:   768-1023px (3 columns)
Desktop:  ≥ 1024px  (4 columns, full nav)
```

### Mobile-First

- Design for mobile first
- Enhance for larger screens
- Never break mobile to add desktop features
- Test on real devices, not just browser resize

---

## 🔄 State Management Rules

### Use Context For:

- Shopping cart
- Wishlist
- User preferences
- Recently viewed
- Compare list
- Search history

### Use Local State For:

- Form inputs
- Modal visibility
- Dropdown open/close
- Hover states
- Animation triggers

### Persistence Rules

- Cart: localStorage (survives refresh)
- Wishlist: localStorage (survives refresh)
- Preferences: localStorage (survives refresh)
- Transient UI: memory only (toasts, modals)

---

## 🎬 Animation Rules

### Timing

- Page transitions: 300-500ms
- Hover effects: 200-300ms
- Modal entrances: 300-400ms
- Stagger delays: 50-150ms between items

### Easing

- Use `easeOut` for entrances
- Use `easeIn` for exits
- Use `easeInOut` for transitions
- Never use linear easing for UI

### Motion Principles

- Subtle > dramatic
- Purposeful > decorative
- Fast > slow (but not instant)
- Respect `prefers-reduced-motion`

---

## 🧪 Testing Rules

### Before Committing

- [ ] Build succeeds (`npm run build`)
- [ ] No console errors
- [ ] All routes work
- [ ] Cart functions work
- [ ] Wishlist functions work
- [ ] Mobile layout works
- [ ] Images load correctly
- [ ] Links work

### Manual Testing Checklist

- [ ] Add to cart
- [ ] Remove from cart
- [ ] Update quantity
- [ ] Checkout flow
- [ ] Wishlist toggle
- [ ] Search functionality
- [ ] Filter/sort products
- [ ] Mobile navigation
- [ ] Image gallery

---

## 🚫 Forbidden Patterns

### Never Do This:

- ❌ Use pure white (#ffffff) for backgrounds
- ❌ Use bold font weights for headlines
- ❌ Use rounded pill buttons
- ❌ Use neon/bright accent colors
- ❌ Use excessive shadows
- ❌ Use glassmorphism on everything
- ❌ Use generic SaaS-style gradients
- ❌ Use stock photos of non-watch items
- ❌ Use Lorem ipsum in production
- ❌ Use console.log in production

### Always Do This:

- ✅ Use ivory (#faf8f5) for light backgrounds
- ✅ Use light font weights (300-500)
- ✅ Use sharp rectangular buttons
- ✅ Use champagne/gold sparingly as accent
- ✅ Use subtle, refined shadows
- ✅ Use glass effects sparingly
- ✅ Use editorial-style layouts
- ✅ Use verified watch photography
- ✅ Use real product copy
- ✅ Use console only for debugging

---

## 📦 Deployment Rules

### Before Deploying

- [ ] All environment variables set
- [ ] All images optimized
- [ ] All routes tested
- [ ] All forms tested
- [ ] All links verified
- [ ] Meta tags complete
- [ ] Favicon set
- [ ] 404 page works
- [ ] Performance audit passed

### Production Checklist

- [ ] No console.logs
- [ ] No debug code
- [ ] No test data
- [ ] All images loading
- [ ] All fonts loading
- [ ] All animations working
- [ ] Mobile responsive
- [ ] Accessibility checked

---

## 🤝 Collaboration Rules

### For AI Assistants

- Read this document before making changes
- Follow the design system strictly
- Test changes before committing
- Document non-obvious decisions
- Ask before making major architectural changes

### For Human Developers

- Follow the established patterns
- Update documentation when changing architecture
- Write comments for complex logic
- Review PRs against these rules
- Maintain consistency across the codebase

---

## 📚 Documentation Rules

### Required Documentation

- README.md (project overview)
- ARCHITECTURE.md (system design)
- DESIGN-SYSTEM.md (visual rules)
- TECH-STACK.md (technologies)
- PRD.md (product requirements)

### When to Document

- New component created
- New feature added
- Architecture changed
- Breaking change made
- Complex logic implemented

---

## 🎯 Success Metrics

### Technical

- Build time < 10 seconds
- Bundle size < 500KB gzipped
- Lighthouse score > 90
- Zero console errors
- 100% route coverage

### Design

- Consistent typography
- Consistent spacing
- Consistent colors
- Consistent animations
- Premium feel throughout

### User Experience

- Fast page loads
- Smooth interactions
- Clear navigation
- Intuitive flows
- Accessible to all

---

## 🔄 Version Control

### Commit Messages

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

### Branch Naming

```
feature/add-wishlist
fix/cart-bug
docs/update-readme
refactor/header-component
```

---

## 📞 Support & Maintenance

### When Something Breaks

1. Check console for errors
2. Check network tab for failed requests
3. Check recent commits for changes
4. Check this document for rules
5. Test in incognito mode
6. Test on different browsers
7. Test on different devices

### When In Doubt

1. Read this document
2. Check existing patterns
3. Ask for clarification
4. Test thoroughly
5. Document the decision

---

**Last Updated:** 2026
**Version:** 1.0
**Maintained By:** SURAKURI

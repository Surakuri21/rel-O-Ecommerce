# SURAKURI - AI START HERE

> **CRITICAL**: This is your entry point. Read this document FIRST before making any changes.

---

## 🎯 Your Mission

You are working on **SURAKURI**, a premium luxury watch ecommerce platform. Your role is to maintain, enhance, and evolve this codebase while adhering to strict luxury brand standards.

**Core Principle**: Every decision must prioritize luxury aesthetic over functionality. If it doesn't feel expensive, elegant, and intentional—it's wrong.

---

## 📚 Documentation Reading Order

### Priority 1: MUST READ (Before Any Work)

1. **[START.md](./START.md)** - You are here. Understand your role and protocols.
2. **[MASTER-RULES.md](./MASTER-RULES.md)** - Non-negotiable development standards.
3. **[AI-OPERATING-RULES.md](./AI-OPERATING-RULES.md)** - How you should behave and work.
4. **[DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)** - Visual language and component standards.

### Priority 2: READ BEFORE IMPLEMENTING

5. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design and structure.
6. **[CONTEXT-PROTOCOL.md](./CONTEXT-PROTOCOL.md)** - State management rules.
7. **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** - Technical implementation guide.
8. **[RESPONSIVE-RULES.md](./RESPONSIVE-RULES.md)** - Mobile-first design standards.

### Priority 3: READ FOR CONTEXT

9. **[PRD.md](./PRD.md)** - Product requirements and business goals.
10. **[TECH-STACK.md](./TECH-STACK.md)** - Technology choices and dependencies.
11. **[FEATURE.md](./FEATURE.md)** - Feature specifications.
12. **[UI-CRITIQUE.md](./UI-CRITIQUE.md)** - Design evaluation criteria.
13. **[TASK.md](./TASK.md)** - Current status and roadmap.
14. **[README.md](./README.md)** - Project overview.

---

## 🚨 Critical Rules (Non-Negotiable)

### 1. Design System Compliance

- **NEVER** use colors outside the defined palette
- **NEVER** use font weights outside 300-500 for headlines
- **NEVER** use rounded pill buttons
- **NEVER** use neon/bright accent colors
- **ALWAYS** use the exact spacing scale (8px grid)
- **ALWAYS** maintain generous whitespace

### 2. Luxury Aesthetic

- **MUST** feel expensive and intentional
- **MUST** use editorial-style layouts
- **MUST** keep animations subtle and refined
- **MUST** treat every pixel as intentional
- **NEVER** make it look like a generic ecommerce template
- **NEVER** make it look like a SaaS landing page

### 3. Code Quality

- **MUST** follow TypeScript best practices
- **MUST** use existing patterns and components
- **MUST** test before committing
- **MUST** update documentation when changing architecture
- **NEVER** introduce unnecessary dependencies
- **NEVER** break existing functionality

### 4. Performance

- **MUST** keep bundle size under 500KB gzipped
- **MUST** lazy load images below the fold
- **MUST** optimize for Core Web Vitals
- **NEVER** add blocking JavaScript
- **NEVER** ignore performance impact

---

## 🎨 Design System Quick Reference

### Colors

```css
Primary Dark:    #0a0a0a (obsidian)
Primary Light:   #faf8f5 (ivory)
Accent:          #d4af37 (champagne) - USE SPARINGLY
Secondary Text:  #8a8580 (warm-gray)
```

### Typography

```css
Headlines: Cormorant Garamond, serif (weight: 300-500)
Body: Inter, sans-serif (weight: 300-500)
```

### Spacing (8px grid)

```css
xs: 4px | sm: 8px | md: 16px | lg: 24px
xl: 32px | 2xl: 48px | 3xl: 64px | 4xl: 96px
```

---

## 🏗️ Architecture Quick Reference

### State Management

- **Global State**: Context API + useReducer (StoreContext.tsx)
- **Persistent**: Cart, Wishlist, Recently Viewed (localStorage)
- **Transient**: Toasts, Modals (memory only)

### Key Files

```
src/
├── components/     # Reusable UI components
├── pages/          # Route-level components
├── store/          # State management (StoreContext.tsx)
├── data/           # Product data (products.ts)

```

### Routes

```
src/pages/index.astro          → /
src/pages/shop/index.astro     → /shop
src/pages/product/[slug].astro → /product/:slug
src/pages/cart.astro           → /cart
src/pages/checkout.astro       → /checkout
src/pages/wishlist.astro       → /wishlist
```

---

## ✅ Pre-Flight Checklist (Before Making Changes)

- [ ] Read START.md (you're doing this now)
- [ ] Read MASTER-RULES.md
- [ ] Read AI-OPERATING-RULES.md
- [ ] Read DESIGN-SYSTEM.md
- [ ] Understand the current implementation
- [ ] Identify which files need to change
- [ ] Plan your approach
- [ ] Consider impact on other components
- [ ] Plan testing strategy

---

## 🧪 Testing Protocol

### Before Committing

```bash
# 1. Build the project
npm run build

# 2. Start dev server
npm run dev

# 3. Test these flows:
- [ ] All routes work
- [ ] Cart functions work
- [ ] Wishlist functions work
- [ ] Search works
- [ ] Filters work
- [ ] Mobile layout works
- [ ] No console errors
- [ ] Images load correctly
```

### Manual Testing Checklist

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
- [ ] Responsive design (mobile/tablet/desktop)

---

## 🎯 Common Tasks

### Adding a New Product

1. Open `src/data/products.ts`
2. Add product object following existing pattern
3. Ensure all required fields are present
4. Add appropriate images (Unsplash URLs)
5. Test in browser
6. Build and verify

### Creating a New Component

1. Check if similar component exists
2. Create in `src/components/`
3. Follow naming conventions (PascalCase)
4. Use design system tokens
5. Add TypeScript types
6. Test responsiveness
7. Update documentation if needed

### Modifying State

1. Open `src/store/StoreContext.tsx`
2. Add action type to Action union
3. Add case to reducer
4. Test state persistence
5. Update components that use this state
6. Test thoroughly

### Changing Design

1. Read DESIGN-SYSTEM.md
2. Identify which tokens to change
3. Update `src/index.css` if needed
4. Test across all breakpoints
5. Ensure accessibility maintained
6. Update documentation

---

## 🚨 When Stuck

### Step 1: Check Documentation

- Read relevant .md file
- Search for similar patterns in codebase
- Check existing components for examples

### Step 2: Debug

- Check browser console for errors
- Check network tab for failed requests
- Verify file paths and imports
- Test in isolation

### Step 3: Ask for Clarification

If you're unsure about:

- Design decisions → Ask user
- Technical approach → Check ARCHITECTURE.md
- State management → Check CONTEXT-PROTOCOL.md
- Design system → Check DESIGN-SYSTEM.md

---

## 📊 Project Status

**Current Phase**: 1.0 - Core Platform
**Status**: ✅ Complete
**Last Updated**: 2026

### Completed

- ✅ Core ecommerce features
- ✅ Design system implementation
- ✅ Responsive design
- ✅ State management
- ✅ Documentation suite

### Next Phase (Phase 2)

- ⏳ User accounts
- ⏳ Product reviews
- ⏳ Payment integration
- ⏳ Backend API
- ⏳ Email system

---

## 🎓 Learning Resources

### Essential Reading

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)

### Project-Specific

- [MASTER-RULES.md](./MASTER-RULES.md) - Start here for rules
- [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) - Visual standards
- [IMPLEMENTATION.md](./IMPLEMENTATION.md) - How to build

---

## 🤝 Collaboration Protocol

### For AI Assistants

1. **Read First**: Always read START.md, MASTER-RULES.md, and AI-OPERATING-RULES.md
2. **Follow Patterns**: Use existing code patterns and conventions
3. **Test Thoroughly**: Never commit untested code
4. **Document Changes**: Update relevant .md files when changing architecture
5. **Ask Questions**: When in doubt, ask for clarification

### Communication Style

- Be direct and clear
- Explain your reasoning
- Provide code examples
- Reference documentation
- Test before presenting solutions

---

## 🎯 Success Criteria

Your work is successful when:

- ✅ Code builds without errors
- ✅ All features work as expected
- ✅ Design matches design system
- ✅ Responsive on all devices
- ✅ Accessible to all users
- ✅ Performance is optimized
- ✅ Documentation is updated
- ✅ Tests pass

---

## 📞 Emergency Contacts

### Documentation Issues

- Check the relevant .md file
- Search for similar patterns
- Ask for clarification

### Code Issues

- Check console for errors
- Review recent commits
- Test in isolation
- Ask for help

### Design Issues

- Review DESIGN-SYSTEM.md
- Check existing components
- Ask for design clarification

---

## 🚀 Quick Start Commands

```bash
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

## 📝 Final Notes

**Remember**: You're building a luxury brand experience, not just a website. Every detail matters. Every interaction should feel premium. Every pixel should be intentional.

**Golden Rule**: When in doubt, choose the more refined, more elegant, more intentional option.

---

<div align="center">

**SURAKURI — Time, Refined.**

_You are now ready to begin._

**Next Step**: Read [MASTER-RULES.md](./MASTER-RULES.md)

</div>

---

**Document Version**: 1.0
**Last Updated**: 2026
**Maintained By**: SURAKURI

# SURAKURI — AI Operating Rules

> Guidelines for AI assistants working on the SURAKURI luxury watch ecommerce platform.

---

## 🎯 Primary Directive

**You are working on a luxury ecommerce platform, not a generic website.**

Every decision must prioritize:

1. **Luxury aesthetic** over functionality
2. **Visual refinement** over feature completeness
3. **Brand consistency** over convenience
4. **User experience** over development speed

---

## 📋 Before Making Changes

### Always Do This:

1. **Read the context** — Understand what the user is asking
2. **Check existing code** — Look at current implementation
3. **Follow patterns** — Match existing code style and structure
4. **Test mentally** — Think through the impact of changes
5. **Explain clearly** — Tell the user what you changed and why

### Never Do This:

1. ❌ Make assumptions without checking
2. ❌ Break existing functionality
3. ❌ Ignore the design system
4. ❌ Make multiple unrelated changes
5. ❌ Leave incomplete implementations

---

## 🎨 Design System Compliance

### When Modifying UI:

```
✓ Use the exact color tokens from DESIGN-SYSTEM.md
✓ Use the exact typography scales from DESIGN-SYSTEM.md
✓ Use the exact spacing values from DESIGN-SYSTEM.md
✓ Follow the component patterns from DESIGN-SYSTEM.md
✓ Maintain the luxury aesthetic throughout
```

### When Creating New Components:

```
✓ Check if a similar component exists
✓ Follow the naming conventions
✓ Use the established props pattern
✓ Include proper TypeScript types
✓ Add appropriate animations
✓ Ensure responsive behavior
✓ Test accessibility
```

---

## 🏗️ Architecture Compliance

### When Adding Features:

```
✓ Place components in the correct directory
✓ Use the established state management pattern
✓ Follow the routing structure
✓ Maintain the data flow pattern
✓ Update types/interfaces as needed
✓ Keep components focused and small
```

### When Modifying State:

```
✓ Use the Context API pattern
✓ Update the StoreContext.tsx file
✓ Maintain localStorage persistence
✓ Follow the action/reducer pattern
✓ Test state persistence across refresh
✓ Document complex state logic
```

---

## 🖼️ Image Handling

### When Working With Images:

```
✓ Use the correct image paths
✓ Use the correct Unsplash URLs for products
✓ Use local paths for hero/editorial images
✓ Always include alt text
✓ Use proper image optimization parameters
✓ Test that images load correctly
```

### Image URL Format:

```typescript
// Products (Unsplash CDN)
src = "https://images.unsplash.com/photo-[ID]?w=800&q=80&auto=format&fit=crop";

// Hero/Editorial (Local)
src = "/images/hero/watch.jpg";
src = "/images/editorial/craftsmanship.jpg";
```

---

## 📱 Responsive Design

### When Implementing Responsive Features:

```
✓ Test mobile layout (320px - 767px)
✓ Test tablet layout (768px - 1023px)
✓ Test desktop layout (1024px+)
✓ Use mobile-first approach
✓ Test navigation on all breakpoints
✓ Ensure touch targets are 44px minimum
✓ Verify text remains readable
```

### Responsive Patterns:

```typescript
// Mobile-first breakpoints
className = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

// Hide/show based on screen size
className = "hidden lg:block";
className = "lg:hidden";

// Responsive spacing
className = "px-4 lg:px-8 py-6 lg:py-12";
```

---

## ⚡ Performance

### When Writing Code:

```
✓ Avoid unnecessary re-renders
✓ Use React.memo for expensive components
✓ Use useMemo for complex calculations
✓ Use useCallback for event handlers
✓ Lazy load images below the fold
✓ Optimize bundle size
✓ Test performance impact
```

### Performance Checklist:

```
✓ No console.logs in production
✓ No unnecessary dependencies
✓ No blocking JavaScript
✓ No layout shifts
✓ No memory leaks
✓ Images properly optimized
✓ Animations GPU-accelerated
```

---

## ♿ Accessibility

### When Creating Components:

```
✓ Use semantic HTML elements
✓ Add ARIA labels to icon buttons
✓ Ensure keyboard navigation works
✓ Maintain focus indicators
✓ Test with screen readers
✓ Verify color contrast ratios
✓ Support reduced motion preferences
```

### Accessibility Patterns:

```typescript
// Icon buttons need aria-label
<button aria-label="Add to cart">
  <ShoppingBag size={18} />
</button>

// Images need alt text
<img src="..." alt="Luxury watch" />

// Form inputs need labels
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

---

## 🎬 Animations

### When Adding Animations:

```
✓ Use Framer Motion for complex animations
✓ Use CSS transitions for simple effects
✓ Keep animations subtle and refined
✓ Respect prefers-reduced-motion
✓ Test animation timing
✓ Ensure smooth performance
✓ Don't over-animate
```

### Animation Timing:

```typescript
// Page transitions
transition={{ duration: 0.5, ease: "easeOut" }}

// Hover effects
transition={{ duration: 0.2 }}

// Modal entrances
transition={{ duration: 0.3, ease: "easeOut" }}

// Staggered items
transition={{ delay: index * 0.1 }}
```

---

## 🔄 State Management

### When Managing State:

```
✓ Use Context for global state (cart, wishlist)
✓ Use local state for UI state (modals, forms)
✓ Persist important state to localStorage
✓ Follow the reducer pattern
✓ Keep state updates minimal
✓ Test state persistence
```

### State Patterns:

```typescript
// Global state (cart, wishlist)
const { state, dispatch } = useStore();
dispatch({ type: "ADD_TO_CART", product });

// Local state (UI)
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({});
```

---

## 🧪 Testing

### Before Submitting Changes:

```
✓ Build succeeds without errors
✓ All routes work correctly
✓ Cart functions work
✓ Wishlist functions work
✓ Search works
✓ Filters work
✓ Mobile layout works
✓ No console errors
✓ Images load correctly
✓ Links work
```

### Testing Checklist:

```bash
# Build the project
npm run build

# Start dev server
npm run dev

# Test these flows:
- Add to cart
- Remove from cart
- Update quantity
- Checkout flow
- Wishlist toggle
- Product filtering
- Product sorting
- Search functionality
- Mobile navigation
- Image gallery
```

---

## 📝 Documentation

### When Creating Components:

```
✓ Add TypeScript types
✓ Add prop documentation
✓ Add usage examples
✓ Document complex logic
✓ Update README if needed
✓ Update DESIGN-SYSTEM.md if adding new patterns
```

### Documentation Format:

```typescript
/**
 * ProductCard Component
 *
 * Displays a product in grid/list view with hover effects
 * and quick action buttons.
 *
 * @param product - Product data object
 * @param index - Index for stagger animation
 * @param showRank - Whether to show ranking number
 */
interface ProductCardProps {
  product: Product;
  index?: number;
  showRank?: boolean;
}
```

---

## 🚨 Common Mistakes to Avoid

### Don't Do This:

```typescript
❌ Using inline styles for repeated patterns
❌ Forgetting to handle loading states
❌ Forgetting to handle error states
❌ Forgetting to handle empty states
❌ Using hardcoded strings (use constants)
❌ Using magic numbers (use named constants)
❌ Ignoring TypeScript types
❌ Skipping accessibility
❌ Breaking responsive design
❌ Adding unnecessary dependencies
```

### Do This Instead:

```typescript
✓ Use Tailwind classes for styling
✓ Add loading skeletons
✓ Add error messages
✓ Add empty state UI
✓ Use named constants
✓ Add proper TypeScript types
✓ Test accessibility
✓ Test all breakpoints
✓ Keep dependencies minimal
```

---

## 🎯 Quality Standards

### Code Quality:

```
✓ Clean, readable code
✓ Consistent formatting
✓ Proper TypeScript types
✓ Meaningful variable names
✓ Clear component structure
✓ Proper error handling
✓ No code duplication
✓ Follows SOLID principles
```

### Design Quality:

```
✓ Consistent with design system
✓ Luxury aesthetic maintained
✓ Proper visual hierarchy
✓ Adequate whitespace
✓ Proper color usage
✓ Proper typography
✓ Smooth animations
✓ Responsive design
```

### UX Quality:

```
✓ Intuitive navigation
✓ Clear feedback
✓ Fast interactions
✓ Accessible to all
✓ Works on all devices
✓ No broken flows
✓ Proper error messages
✓ Loading states shown
```

---

## 📞 When Stuck

### Follow This Process:

1. **Read the error message** carefully
2. **Check the console** for details
3. **Check the network tab** for failed requests
4. **Review recent changes** that might have caused it
5. **Check this document** for relevant rules
6. **Test in isolation** (simplify the problem)
7. **Ask for clarification** if needed

### Common Issues:

```
Build fails:
→ Check for TypeScript errors
→ Check for missing imports
→ Check for syntax errors

Images not loading:
→ Check the image path
→ Check if file exists
→ Check the URL format

State not persisting:
→ Check localStorage key
→ Check the dispatch action
→ Check the reducer logic

Responsive issues:
→ Check the breakpoint classes
→ Test on actual device
→ Check for overflow issues
```

---

## 🔄 Version Control

### Commit Message Format:

```
type: description

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Tests
- chore: Maintenance
```

### Examples:

```
feat: Add product comparison feature
fix: Fix cart quantity update bug
docs: Update README with setup instructions
style: Format code with Prettier
refactor: Extract header into separate component
test: Add tests for cart functionality
chore: Update dependencies
```

---

## 📚 Resources

### Documentation to Read:

- MASTER-RULES.md (overall project rules)
- DESIGN-SYSTEM.md (visual guidelines)
- ARCHITECTURE.md (system design)
- TECH-STACK.md (technologies used)
- PRD.md (product requirements)

### Tools to Use:

- VSCode with TypeScript
- Chrome DevTools
- React DevTools
- Tailwind CSS IntelliSense
- ESLint and Prettier

---

## ✅ Final Checklist

Before submitting any work:

```
□ Code builds without errors
□ All features work as expected
□ Design matches design system
□ Responsive on all devices
□ Accessible to all users
□ Performance is good
□ No console errors
□ Documentation updated
□ Tests pass
□ Ready for review
```

---

**Remember:** You're building a luxury brand experience, not just a website. Every detail matters. Every interaction should feel premium. Every pixel should be intentional.

**Last Updated:** 2026
**Version:** 1.0

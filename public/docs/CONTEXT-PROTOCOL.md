## 🎯 Overview

SURAKURI uses **Nano Stores** (`@nanostores/react`) for state management. Because we use Astro's Islands Architecture, React Context cannot bridge isolated components. Nano Stores provides framework-agnostic atomic state that can be shared across any UI island.

## 📦 State Structure

````typescript
import { atom, map } from 'nanostores';

// Persistent Cart State
export const cartStore = map<Record<string, CartItem>>({});

// UI State (Transient)
export const isCartOpen = atom(false);
export const isMenuOpen = atom(false);

// Action Example
export function addToCart(product: Product) {
  const current = cartStore.get();
  // Nano store mutation logic...
}

### State Descriptions

| State                  | Type         | Persistent | Description                             |
| ---------------------- | ------------ | ---------- | --------------------------------------- |
| `cart`                 | `CartItem[]` | ✓ Yes      | Shopping cart items with quantities     |
| `wishlist`             | `string[]`   | ✓ Yes      | Product IDs saved to wishlist           |
| `recentlyViewed`       | `string[]`   | ✓ Yes      | Last 10 viewed product IDs              |
| `toasts`               | `Toast[]`    | ✗ No       | Active notification queue               |
| `searchHistory`        | `string[]`   | ✓ Yes      | Last 5 search queries                   |
| `compareList`          | `string[]`   | ✓ Yes      | Up to 4 products for comparison         |
| `newsletterPopupShown` | `boolean`    | ✗ No       | Whether newsletter popup has been shown |

---

## 🔄 Action Types

### Cart Actions

```typescript
// Add product to cart
{ type: 'ADD_TO_CART'; product: Product; quantity?: number }

// Remove product from cart
{ type: 'REMOVE_FROM_CART'; productId: string }

// Update product quantity
{ type: 'UPDATE_QUANTITY'; productId: string; quantity: number }

// Clear entire cart
{ type: 'CLEAR_CART' }
````

### Wishlist Actions

```typescript
// Toggle product in wishlist
{
  type: "TOGGLE_WISHLIST";
  productId: string;
}
```

### Recently Viewed Actions

```typescript
// Add product to recently viewed
{
  type: "ADD_RECENTLY_VIEWED";
  productId: string;
}
```

### Toast Actions

```typescript
// Add toast notification
{
  type: "ADD_TOAST";
  toast: Toast;
}

// Remove toast notification
{
  type: "REMOVE_TOAST";
  id: string;
}
```

### Search Actions

```typescript
// Add search query to history
{
  type: "ADD_SEARCH_HISTORY";
  query: string;
}
```

### Compare Actions

```typescript
// Toggle product in compare list
{
  type: "TOGGLE_COMPARE";
  productId: string;
}
```

### UI Actions

```typescript
// Mark newsletter popup as shown
{
  type: "SET_NEWSLETTER_SHOWN";
}
```

### Initialization Actions

```typescript
// Load state from localStorage
{
  type: "LOAD_STATE";
  state: Partial<StoreState>;
}
```

---

## 📊 Data Flow

### State Management Flow

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

### Example Flow: Add to Cart

```typescript
// 1. User clicks "Add to Cart"
<button onClick={() => dispatch({ type: 'ADD_TO_CART', product })}>
  Add to Cart
</button>

// 2. Action dispatched to reducer
dispatch({ type: 'ADD_TO_CART', product })

// 3. Reducer processes action
case 'ADD_TO_CART': {
  const existing = state.cart.find(item => item.product.id === action.product.id);
  if (existing) {
    return {
      ...state,
      cart: state.cart.map(item =>
        item.product.id === action.product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    };
  }
  return { ...state, cart: [...state.cart, { product: action.product, quantity: 1 }] };
}

// 4. New state created
{
  ...state,
  cart: [...state.cart, { product, quantity: 1 }]
}

// 5. Context updates
<StoreContext.Provider value={{ state, dispatch }}>

// 6. Components re-render
const { items: cartItems } = useCart();

// 7. localStorage updated
useEffect(() => {
  localStorage.setItem('surakuri-store', JSON.stringify(state));
}, [state]);
```

---

## 🎣 Custom Hooks

### useStore

```typescript
// Access full store
const { state, dispatch } = useStore();
```

### useCart

```typescript
// Access cart-specific state and helpers
const { items, totalItems, subtotal, dispatch } = useCart();

// Usage
<p>Cart items: {totalItems}</p>
<p>Subtotal: ${subtotal}</p>
```

### useWishlist

```typescript
// Access wishlist-specific state and helpers
const { items, count, dispatch } = useWishlist();

// Usage
<p>Wishlist items: {count}</p>
```

---

## 💾 Persistence Protocol

### localStorage Key

```typescript
const STORAGE_KEY = "surakuri-store";
```

### Persistent State

```typescript
// State that persists across page refresh
const persistentState = {
  cart: state.cart,
  wishlist: state.wishlist,
  recentlyViewed: state.recentlyViewed,
  searchHistory: state.searchHistory,
  compareList: state.compareList,
};

// Save to localStorage
localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentState));
```

### Non-Persistent State

```typescript
// State that resets on page refresh
const transientState = {
  toasts: [],
  newsletterPopupShown: false,
};
```

### Loading State

```typescript
// Load state on app initialization
useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    dispatch({ type: "LOAD_STATE", state: parsed });
  }
}, []);
```

---

## 🧩 Component Integration

### Reading State

```typescript
import { useStore, useCart, useWishlist } from '../store/StoreContext';

function ProductCard({ product }) {
  const { state } = useStore();
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  const isInCart = cartItems.some(item => item.product.id === product.id);
  const isInWishlist = wishlistItems.includes(product.id);

  return (
    <div>
      {isInCart && <span>In Cart</span>}
      {isInWishlist && <span>In Wishlist</span>}
    </div>
  );
}
```

### Dispatching Actions

```typescript
function AddToCartButton({ product }) {
  const { dispatch } = useStore();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product });
    // Show toast notification
    dispatch({
      type: 'ADD_TOAST',
      toast: { id: Date.now(), message: 'Added to cart', type: 'success' }
    });
  };

  return <button onClick={handleAddToCart}>Add to Cart</button>;
}
```

---

## 🎯 Best Practices

### 1. Use Custom Hooks

```typescript
// ✓ Good - Use custom hooks
const { totalItems } = useCart();

// ✗ Bad - Access state directly
const { state } = useStore();
const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
```

### 2. Memoize Expensive Calculations

```typescript
// ✓ Good - Memoize calculations
const subtotal = useMemo(() => {
  return cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
}, [cartItems]);

// ✗ Bad - Calculate on every render
const subtotal = cartItems.reduce(
  (sum, item) => sum + item.product.price * item.quantity,
  0,
);
```

### 3. Batch Related Actions

```typescript
// ✓ Good - Batch related actions
const handleCheckout = () => {
  dispatch({ type: "CLEAR_CART" });
  dispatch({
    type: "ADD_TOAST",
    toast: { id: Date.now(), message: "Order placed!", type: "success" },
  });
  navigate("/order-confirmation");
};

// ✗ Bad - Multiple separate dispatches in different places
```

### 4. Handle Edge Cases

```typescript
// ✓ Good - Handle edge cases
const handleUpdateQuantity = (productId: string, quantity: number) => {
  if (quantity <= 0) {
    dispatch({ type: "REMOVE_FROM_CART", productId });
  } else {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  }
};
```

### 5. Type Safety

```typescript
// ✓ Good - Use TypeScript types
interface CartItem {
  product: Product;
  quantity: number;
}

const handleAddToCart = (product: Product, quantity: number = 1) => {
  dispatch({ type: "ADD_TO_CART", product, quantity });
};
```

---

## 🔄 State Synchronization

### Cart Synchronization

```typescript
// Sync cart with backend (when API is available)
useEffect(() => {
  if (cartItems.length > 0) {
    api.syncCart(cartItems);
  }
}, [cartItems]);
```

### Wishlist Synchronization

```typescript
// Sync wishlist with backend (when API is available)
useEffect(() => {
  if (wishlistItems.length > 0) {
    api.syncWishlist(wishlistItems);
  }
}, [wishlistItems]);
```

---

## 🧪 Testing State

### Testing Reducer

```typescript
import { reducer, initialState } from "./StoreContext";

describe("Store Reducer", () => {
  it("should add product to cart", () => {
    const product = { id: "1", name: "Test Watch", price: 1000 };
    const action = { type: "ADD_TO_CART", product };
    const newState = reducer(initialState, action);

    expect(newState.cart).toHaveLength(1);
    expect(newState.cart[0].product.id).toBe("1");
  });

  it("should remove product from cart", () => {
    const initialState = {
      ...initialState,
      cart: [{ product: { id: "1" }, quantity: 1 }],
    };
    const action = { type: "REMOVE_FROM_CART", productId: "1" };
    const newState = reducer(initialState, action);

    expect(newState.cart).toHaveLength(0);
  });
});
```

### Testing Hooks

```typescript
import { renderHook, act } from "@testing-library/react";
import { StoreProvider, useCart } from "./StoreContext";

describe("useCart", () => {
  it("should add product to cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: StoreProvider,
    });

    act(() => {
      result.current.dispatch({
        type: "ADD_TO_CART",
        product: { id: "1", name: "Test", price: 1000 },
      });
    });

    expect(result.current.totalItems).toBe(1);
  });
});
```

---

## 📊 State Debugging

### Redux DevTools (Optional)

```typescript
// Install redux-devtools-extension
// Add to StoreContext.tsx
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancers());
```

### Console Logging

```typescript
// Add logging to reducer (development only)
function reducer(state: StoreState, action: Action): StoreState {
  if (process.env.NODE_ENV === 'development') {
    console.log('Action:', action);
    console.log('Previous state:', state);
  }

  const newState = /* process action */;

  if (process.env.NODE_ENV === 'development') {
    console.log('New state:', newState);
  }

  return newState;
}
```

---

## 🚀 Performance Optimization

### 1. Avoid Unnecessary Re-renders

```typescript
// ✓ Good - Memoize component
const ProductCard = memo(({ product }) => {
  return <div>{product.name}</div>;
});

// ✗ Bad - Re-renders on every state change
const ProductCard = ({ product }) => {
  return <div>{product.name}</div>;
};
```

### 2. Selective State Updates

```typescript
// ✓ Good - Only update what changed
case 'UPDATE_QUANTITY':
  return {
    ...state,
    cart: state.cart.map(item =>
      item.product.id === action.productId
        ? { ...item, quantity: action.quantity }
        : item
    ),
  };

// ✗ Bad - Recreating entire cart array
case 'UPDATE_QUANTITY':
  return {
    ...state,
    cart: state.cart.filter(item => item.product.id !== action.productId)
      .concat({ product: action.product, quantity: action.quantity }),
  };
```

### 3. Debounce Frequent Updates

```typescript
// Debounce search history updates
const debouncedAddSearchHistory = useMemo(
  () =>
    debounce((query: string) => {
      dispatch({ type: "ADD_SEARCH_HISTORY", query });
    }, 500),
  [],
);
```

---

## 📚 Resources

### Documentation

- [React Context](https://react.dev/learn/passing-data-deeply-with-context)
- [useReducer](https://react.dev/reference/react/useReducer)
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

### Tools

- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)

---

**Last Updated:** 2026
**Version:** 1.0
**Maintained By:** SURAKURI

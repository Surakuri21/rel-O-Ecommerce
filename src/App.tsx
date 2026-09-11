import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './store/StoreContext';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer, NewsletterPopup, SupportWidget, ScrollProgress } from './components/Shared';
import CompareDrawer from './components/CompareDrawer';
import MobileNav from './components/MobileNav';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import AboutPage from './pages/AboutPage';
import JournalPage from './pages/JournalPage';
import AccountPage from './pages/AccountPage';
import CollectionsPage from './pages/CollectionsPage';
import { NewArrivalsPage, BestSellersPage, NotFoundPage } from './pages/OtherPages';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-ivory text-obsidian">
          <ScrollProgress />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/collections/:slug" element={<CollectionsPage />} />
              <Route path="/new-arrivals" element={<NewArrivalsPage />} />
              <Route path="/best-sellers" element={<BestSellersPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <CompareDrawer />
          <MobileNav />
          <ToastContainer />
          <NewsletterPopup />
          <SupportWidget />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;

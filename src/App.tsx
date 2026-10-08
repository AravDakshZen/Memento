import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ProductOverviewPage } from './pages/ProductOverviewPage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { MyAccountPage } from './pages/MyAccountPage';
import { initLenis, destroyLenis } from './utils/lenis';

const AppContent: React.FC = () => {
  const { toast, showPreloader } = useCart();
  const siteWrapperRef = useRef<HTMLDivElement>(null);
  const [isSiteRevealed, setIsSiteRevealed] = useState(!showPreloader);

  useEffect(() => {
    initLenis();
    return () => {
      destroyLenis();
    };
  }, []);

  // Sync reveal state if preloader is re-triggered
  useEffect(() => {
    if (!showPreloader) {
      setIsSiteRevealed(true);
    } else {
      setIsSiteRevealed(false);
    }
  }, [showPreloader]);

  // Ultra-smooth buttery cinematic website reveal
  const handlePreloaderExit = () => {
    setIsSiteRevealed(true);
    if (siteWrapperRef.current) {
      gsap.fromTo(
        siteWrapperRef.current,
        {
          opacity: 0,
          scale: 0.98,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
        }
      );
    }
  };

  return (
    <div className="memento-app-root">
      {/* 1. Fullscreen Smooth Video Preloader */}
      <Preloader onStartExit={handlePreloaderExit} />

      {/* 2. Main Website Container (Only visible & interactable after preloader finishes) */}
      <div
        ref={siteWrapperRef}
        className={`memento-site-wrapper ${!isSiteRevealed ? 'site-hidden' : 'site-visible'}`}
      >
        {/* Top Bar & Main Navigation Header */}
        <Header />

        {/* Dynamic Page View via Router */}
        <main className="main-content-area">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cakes" element={<ProductsPage forcedCategory="Cakes" />} />
            <Route path="/gifts" element={<ProductsPage forcedCategory="Gifts" />} />
            <Route path="/keepsakes" element={<ProductsPage forcedCategory="Keepsakes" />} />
            <Route path="/product/:slug" element={<ProductOverviewPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CartPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />
            <Route path="/termsandconditions" element={<TermsPage />} />
            <Route path="/my-account" element={<MyAccountPage />} />
            <Route path="/myaccount" element={<MyAccountPage />} />
            <Route path="/my account" element={<MyAccountPage />} />
            <Route path="/my%20account" element={<MyAccountPage />} />
          </Routes>
        </main>

        {/* Luxury Boutique Footer & Floating TOP button */}
        <Footer />

        {/* Slide-out Mini Cart Drawer */}
        <CartDrawer />
      </div>

      {/* 3. Boutique Toast Notification */}
      {toast && (
        <div className="boutique-toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}

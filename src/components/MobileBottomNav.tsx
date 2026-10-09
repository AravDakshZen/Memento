import React from 'react';
import { useLocation } from 'react-router-dom';
import { Home, Compass, Heart, User, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const {
    cartCount,
    wishlist,
    navigateTo,
    setIsCartDrawerOpen
  } = useCart();

  const currentPath = location.pathname;

  const isHome = currentPath === '/';
  const isShop =
    currentPath === '/products' ||
    currentPath === '/cakes' ||
    currentPath === '/gifts' ||
    currentPath === '/keepsakes' ||
    currentPath.startsWith('/product/');
  const isAccount = currentPath === '/my-account';
  const isCart = currentPath === '/cart' || currentPath === '/checkout';

  return (
    <aside className="mobile-bottom-nav" aria-label="Mobile Navigation Dock">
      <div className="mobile-nav-dock-container">
        {/* 1. Home */}
        <button
          type="button"
          className={`mobile-dock-tab ${isHome ? 'active' : ''}`}
          onClick={() => navigateTo('/')}
          aria-label="Home"
        >
          <div className="dock-icon-wrap">
            <Home size={20} className="dock-icon" />
            {isHome && <span className="dock-active-indicator" />}
          </div>
          <span className="dock-label">Home</span>
        </button>

        {/* 2. Discover / Shop */}
        <button
          type="button"
          className={`mobile-dock-tab ${isShop ? 'active' : ''}`}
          onClick={() => navigateTo('/products')}
          aria-label="Shop Catalog"
        >
          <div className="dock-icon-wrap">
            <Compass size={20} className="dock-icon" />
            {isShop && <span className="dock-active-indicator" />}
          </div>
          <span className="dock-label">Boutique</span>
        </button>

        {/* 3. Wishlist / Saved */}
        <button
          type="button"
          className="mobile-dock-tab"
          onClick={() => navigateTo('/my-account')}
          aria-label="Saved Wishlist"
        >
          <div className="dock-icon-wrap">
            <Heart size={20} className="dock-icon" />
            {wishlist.length > 0 && (
              <span className="dock-badge-pill" title={`${wishlist.length} saved items`}>
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="dock-label">Wishlist</span>
        </button>

        {/* 4. Account */}
        <button
          type="button"
          className={`mobile-dock-tab ${isAccount ? 'active' : ''}`}
          onClick={() => navigateTo('/my-account')}
          aria-label="My Account"
        >
          <div className="dock-icon-wrap">
            <User size={20} className="dock-icon" />
            {isAccount && <span className="dock-active-indicator" />}
          </div>
          <span className="dock-label">Account</span>
        </button>

        {/* 5. Cart / Bag */}
        <button
          type="button"
          className={`mobile-dock-tab ${isCart ? 'active' : ''}`}
          onClick={() => {
            if (currentPath === '/cart' || currentPath === '/checkout') {
              navigateTo('/cart');
            } else {
              setIsCartDrawerOpen(true);
            }
          }}
          aria-label={`Shopping Bag (${cartCount} items)`}
        >
          <div className="dock-icon-wrap">
            <ShoppingBag size={20} className="dock-icon" />
            {cartCount > 0 && (
              <span className="dock-badge-pill dock-cart-badge">
                {cartCount}
              </span>
            )}
            {isCart && <span className="dock-active-indicator" />}
          </div>
          <span className="dock-label">Bag</span>
        </button>
      </div>
    </aside>
  );
};

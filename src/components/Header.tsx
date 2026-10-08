import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  X,
  Search,
  ShoppingBag,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ALL_PRODUCTS } from '../data/products';

export const Header: React.FC = () => {
  const {
    cartCount,
    activePage,
    navigateTo,
    setActiveProduct
  } = useCart();

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchResults = searchQuery.trim()
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const scrollToSection = (sectionId: string) => {
    if (activePage !== 'home') {
      navigateTo('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="memento-site-header">
      {/* Top Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="site-container top-bar-content">
          <div className="top-bar-left">
            <span className="announcement-highlight">
              Get <strong>20% Off</strong> For The Next Christmas
            </span>
          </div>
          <div className="top-bar-right">
            <div className="top-contact-info">
              <span className="contact-item">
                <Mail size={13} className="contact-icon" />
                <strong>Email:</strong> info@memento.com
              </span>
              <span className="separator">|</span>
              <span className="contact-item">
                <Phone size={13} className="contact-icon" />
                <strong>Phone:</strong> +1 555-123-4567
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="main-navbar">
        <div className="site-container navbar-inner">
          {/* Logo */}
          <div className="navbar-brand" onClick={() => navigateTo('/')}>
            <h1 className="brand-logo-text">
              Memento<span className="logo-dot">.</span>
            </h1>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="nav-links-list">
            <li className={`nav-item ${activePage === 'home' ? 'active' : ''}`}>
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => {
                  navigateTo('/');
                }}
              >
                HOME
              </button>
            </li>

            <li className="nav-item">
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => scrollToSection('new-arrivals-section')}
              >
                NEW ARRIVALS
              </button>
            </li>

            {/* Shop Dropdown */}
            <li
              className="nav-item has-dropdown"
              onMouseEnter={() => setIsShopDropdownOpen(true)}
              onMouseLeave={() => setIsShopDropdownOpen(false)}
            >
              <button type="button" className="nav-link-btn">
                SHOP <ChevronDown size={14} className="dropdown-arrow" />
              </button>

              {isShopDropdownOpen && (
                <div className="nav-dropdown-menu clean-figma-dropdown">
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setIsShopDropdownOpen(false);
                      navigateTo('/products');
                    }}
                  >
                    ALL PRODUCTS
                  </button>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setIsShopDropdownOpen(false);
                      navigateTo('/gifts');
                    }}
                  >
                    GIFT ITEMS
                  </button>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setIsShopDropdownOpen(false);
                      navigateTo('/cakes');
                    }}
                  >
                    CAKES & MUFFINS
                  </button>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setIsShopDropdownOpen(false);
                      navigateTo('/keepsakes');
                    }}
                  >
                    KEEPSAKES
                  </button>
                </div>
              )}
            </li>

            {/* Pages Dropdown */}
            <li
              className="nav-item has-dropdown"
              onMouseEnter={() => setIsPagesDropdownOpen(true)}
              onMouseLeave={() => setIsPagesDropdownOpen(false)}
            >
              <button type="button" className="nav-link-btn">
                PAGES <ChevronDown size={14} className="dropdown-arrow" />
              </button>

              {isPagesDropdownOpen && (
                <div className="nav-dropdown-menu clean-figma-dropdown">
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setIsPagesDropdownOpen(false);
                      navigateTo('/my-account');
                    }}
                  >
                    MY ACCOUNT
                  </button>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setIsPagesDropdownOpen(false);
                      navigateTo('/cart');
                    }}
                  >
                    CART
                  </button>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setIsPagesDropdownOpen(false);
                      navigateTo('/checkout');
                    }}
                  >
                    CHECKOUT
                  </button>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setIsPagesDropdownOpen(false);
                      navigateTo('/privacy-policy');
                    }}
                  >
                    PRIVACY POLICY
                  </button>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setIsPagesDropdownOpen(false);
                      navigateTo('/terms-and-conditions');
                    }}
                  >
                    TERMS & CONDITIONS
                  </button>
                </div>
              )}
            </li>

            <li className="nav-item">
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => scrollToSection('blog-section')}
              >
                BLOG
              </button>
            </li>

            <li className="nav-item">
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => {
                  const el = document.getElementById('footer-contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                CONTACT
              </button>
            </li>
          </ul>

          {/* Action Icons */}
          <div className="navbar-actions">
            {/* Expandable Search */}
            <div className={`navbar-search-container ${isSearchExpanded ? 'expanded' : ''}`}>
              <button
                type="button"
                className="action-icon-btn search-trigger-btn"
                onClick={() => {
                  setIsSearchExpanded(!isSearchExpanded);
                  if (isSearchExpanded) {
                    setSearchQuery('');
                  }
                }}
                aria-label="Search"
              >
                {isSearchExpanded ? <X size={16} /> : <Search size={16} />}
              </button>

              {isSearchExpanded && (
                <div className="navbar-search-expanded">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search hampers, cakes, keepsakes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="navbar-search-input"
                  />
                  {searchQuery && (
                    <div className="navbar-search-results">
                      {searchResults.length === 0 ? (
                        <div className="no-search-results">
                          <p>No results for "{searchQuery}"</p>
                        </div>
                      ) : (
                        searchResults.map((p) => (
                          <div
                            key={p.id}
                            className="search-result-row search-result-text-only"
                            onClick={() => {
                              setActiveProduct(p);
                              navigateTo('/product/' + p.slug);
                              setIsSearchExpanded(false);
                              setSearchQuery('');
                            }}
                          >
                            <div className="search-result-info">
                              <span className="search-result-cat">{p.category}</span>
                              <h4 className="search-result-title">{p.name}</h4>
                            </div>
                            <span className="search-result-price">${p.price.toFixed(2)}</span>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              className="action-icon-btn account-btn"
              onClick={() => navigateTo('/my-account')}
              aria-label="Account"
            >
              <User size={18} />
            </button>

            <button
              type="button"
              className="action-icon-btn cart-btn"
              onClick={() => navigateTo('/cart')}
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="mobile-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <button type="button" className="mobile-nav-link" onClick={() => { navigateTo('/'); setIsMobileMenuOpen(false); }}>HOME</button>
            <button type="button" className="mobile-nav-link" onClick={() => { scrollToSection('new-arrivals-section'); setIsMobileMenuOpen(false); }}>NEW ARRIVALS</button>
            <button type="button" className="mobile-nav-link" onClick={() => { navigateTo('/products'); setIsMobileMenuOpen(false); }}>ALL PRODUCTS</button>
            <button type="button" className="mobile-nav-link" onClick={() => { scrollToSection('curated-hampers-section'); setIsMobileMenuOpen(false); }}>GIFT ITEMS</button>
            <button type="button" className="mobile-nav-link" onClick={() => { scrollToSection('sweet-favors-section'); setIsMobileMenuOpen(false); }}>CAKES</button>
            <button type="button" className="mobile-nav-link" onClick={() => { scrollToSection('party-items-section'); setIsMobileMenuOpen(false); }}>PARTY ITEMS</button>
            <button type="button" className="mobile-nav-link" onClick={() => { navigateTo('/my-account'); setIsMobileMenuOpen(false); }}>MY ACCOUNT</button>
            <button type="button" className="mobile-nav-link" onClick={() => { navigateTo('/cart'); setIsMobileMenuOpen(false); }}>CART ({cartCount})</button>
            <button type="button" className="mobile-nav-link" onClick={() => { navigateTo('/privacy-policy'); setIsMobileMenuOpen(false); }}>PRIVACY POLICY</button>
            <button type="button" className="mobile-nav-link" onClick={() => { navigateTo('/terms-and-conditions'); setIsMobileMenuOpen(false); }}>TERMS & CONDITIONS</button>
          </div>
        )}
      </nav>
    </header>
  );
};

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

const SEARCH_KEYWORDS = [
  'cakes',
  'party items',
  'luxury gift hampers',
  'keepsake boxes',
  'artisanal cupcakes',
  'sweet favors'
];

export const Header: React.FC = () => {
  const {
    cartCount,
    activePage,
    navigateTo,
    setActiveProduct
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('opensearch') === 'true';
    }
    return false;
  });
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);

  // Vertical rolling ticker for search keywords
  useEffect(() => {
    const timer = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % SEARCH_KEYWORDS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  // Collapse search when clicking outside or pressing Escape (if search input is empty)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchWrapRef.current &&
        !searchWrapRef.current.contains(event.target as Node) &&
        !searchQuery
      ) {
        setIsSearchOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (searchQuery) {
          setSearchQuery('');
        } else {
          setIsSearchOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchQuery]);

  const searchResults = searchQuery.trim()
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6)
    : [];

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
            {/* Integrated Search Bar inside Navbar */}
            <div className="navbar-search-inline-wrap" ref={searchWrapRef}>
              {!isSearchOpen ? (
                <button
                  type="button"
                  className="action-icon-btn search-toggle-btn"
                  onClick={() => {
                    setIsSearchOpen(true);
                    setTimeout(() => searchInputRef.current?.focus(), 50);
                  }}
                  title="Search boutique"
                  aria-label="Search boutique"
                >
                  <Search size={18} />
                </button>
              ) : (
                <div className="navbar-search-pill expanded">
                  <Search size={15} className="search-pill-icon" />
                  <div className="search-input-field-wrap">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="navbar-search-inline-input"
                      autoComplete="off"
                      aria-label="Search products"
                    />
                    {!searchQuery && (
                      <div
                        className="animated-search-placeholder"
                        onClick={() => searchInputRef.current?.focus()}
                        aria-hidden="true"
                      >
                        <span className="placeholder-static">Search for&nbsp;</span>
                        <span className="placeholder-ticker-window">
                          <span
                            className="placeholder-ticker-track"
                            style={{ transform: `translateY(-${keywordIndex * 22}px)` }}
                          >
                            {SEARCH_KEYWORDS.map((word, idx) => (
                              <span key={idx} className="placeholder-keyword-item">
                                {word}
                              </span>
                            ))}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => {
                      if (searchQuery) {
                        setSearchQuery('');
                        searchInputRef.current?.focus();
                      } else {
                        setIsSearchOpen(false);
                      }
                    }}
                    title={searchQuery ? 'Clear search' : 'Close search'}
                    aria-label={searchQuery ? 'Clear search' : 'Close search'}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {isSearchOpen && searchQuery && (
                <div className="navbar-search-results-dropdown">
                  {searchResults.length === 0 ? (
                    <div className="no-search-results">
                      <p>No products found for "{searchQuery}"</p>
                    </div>
                  ) : (
                    <>
                      <div className="search-results-header">
                        <span>Matching Products ({searchResults.length})</span>
                      </div>
                      {searchResults.map((p) => (
                        <div
                          key={p.id}
                          className="search-result-row"
                          onClick={() => {
                            setActiveProduct(p);
                            navigateTo('/product/' + p.slug);
                            setSearchQuery('');
                            setIsSearchOpen(false);
                          }}
                        >
                          <img src={p.image} alt={p.name} className="search-result-thumb" />
                          <div className="search-result-info">
                            <span className="search-result-cat">{p.category}</span>
                            <h4 className="search-result-title">{p.name}</h4>
                          </div>
                          <span className="search-result-price">${p.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </>
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

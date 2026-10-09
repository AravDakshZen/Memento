import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, SlidersHorizontal, X, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';
import {
  ALL_PRODUCTS,
  CAKES_PRODUCTS,
  GIFTS_PRODUCTS,
  KEEPSAKES_PRODUCTS
} from '../data/products';
import { RatingStars } from '../components/RatingStars';
import type { Product } from '../types';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All', 'Gift Hampers', 'Cakes & Sweets', 'Party Items & Keepsakes'];

interface ProductsPageProps {
  forcedCategory?: 'Cakes' | 'Gifts' | 'Keepsakes';
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ forcedCategory }) => {
  const location = useLocation();
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActiveProduct,
    navigateTo
  } = useCart();

  // Determine effective category based on prop or URL path
  const effectiveCategory = forcedCategory || (
    location.pathname === '/cakes' ? 'Cakes' :
    location.pathname === '/gifts' ? 'Gifts' :
    location.pathname === '/keepsakes' ? 'Keepsakes' :
    undefined
  );

  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (quickViewProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [quickViewProduct]);

  const getBaseProducts = (): Product[] => {
    if (effectiveCategory === 'Cakes') return [...CAKES_PRODUCTS];
    if (effectiveCategory === 'Gifts') return [...GIFTS_PRODUCTS];
    if (effectiveCategory === 'Keepsakes') return [...KEEPSAKES_PRODUCTS];

    if (activeCategory === 'Gift Hampers') return [...GIFTS_PRODUCTS];
    if (activeCategory === 'Cakes & Sweets') return [...CAKES_PRODUCTS];
    if (activeCategory === 'Party Items & Keepsakes') return [...KEEPSAKES_PRODUCTS];
    return [...ALL_PRODUCTS];
  };

  const getFilteredProducts = (): Product[] => {
    let products = getBaseProducts();

    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        products.reverse();
        break;
      default:
        break;
    }

    return products;
  };

  const filteredProducts = getFilteredProducts();

  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.products-page-title',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.product-grid-card',
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.06, duration: 0.6,
          ease: 'power2.out'
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, [activeCategory, sortBy, effectiveCategory]);

  const renderStars = (rating: number) => {
    return (
      <div className="product-stars-row">
        <RatingStars rating={rating} size={13} showScore={true} />
      </div>
    );
  };

  // Dynamic header titles
  const getHeaderInfo = () => {
    if (effectiveCategory === 'Cakes') {
      return {
        eyebrow: 'PATISSERIE ATELIER',
        title: 'Artisanal Cakes & Sweet Muffins',
        subtitle: 'Freshly baked daily with European butter, wild fruit compotes, and Swiss meringue cream. Presented in clean keepsake packaging.'
      };
    }
    if (effectiveCategory === 'Gifts') {
      return {
        eyebrow: 'CURATED GIFTING',
        title: 'Luxury Gift Hampers & Keepsake Trunks',
        subtitle: 'Handcrafted milestone crates, champagne celebration boxes, and bespoke self-care hampers finished with double-faced French satin ribbons.'
      };
    }
    if (effectiveCategory === 'Keepsakes') {
      return {
        eyebrow: 'HEIRLOOM TREASURES',
        title: 'Personalized Keepsakes & Party Items',
        subtitle: 'Hand-painted porcelain sculptures, engraved wooden card books, music boxes, and timeless celebratory keepsakes.'
      };
    }
    return {
      eyebrow: 'OUR BOUTIQUE COLLECTION',
      title: 'All Products',
      subtitle: 'Explore our complete collection of handcrafted luxury gift hampers, artisanal cakes, celebration keepsakes, and party favors.'
    };
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="products-page" ref={pageRef}>
      {/* Hero Banner */}
      <section className="products-hero-banner">
        <div className="site-container">
          <span className="section-eyebrow products-page-title">{headerInfo.eyebrow}</span>
          <h1 className="section-title-serif products-page-title title-crunch">
            {headerInfo.title}
          </h1>
          <p className="section-lead-subtitle products-page-title">
            {headerInfo.subtitle}
          </p>
        </div>
      </section>

      {/* Filter & Sort Bar */}
      <section className="products-filter-bar">
        <div className="site-container filter-bar-inner">
          {!effectiveCategory ? (
            <div className="category-pills-row">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          ) : (
            <div className="category-active-tag">
              <span>Showing: <strong>{headerInfo.title}</strong> ({filteredProducts.length} items)</span>
            </div>
          )}

          <div className="filter-sort-controls">
            <button
              type="button"
              className="filter-toggle-btn"
              onClick={() => setShowFilters(true)}
              aria-label="Filter and Sort"
            >
              <SlidersHorizontal size={15} /> Filter & Sort
            </button>

            <select
              className="sort-select desktop-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        <div className="site-container">
          <p className="results-count">{filteredProducts.length} items available in boutique</p>
        </div>

        {/* Mobile Filter & Sort Slide-up Sheet */}
        {showFilters && (
          <div className="modal-backdrop mobile-filter-backdrop" onClick={() => setShowFilters(false)}>
            <div
              className="mobile-filter-sheet"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label="Filter & Sort"
            >
              <div className="filter-sheet-header">
                <div className="sheet-drag-handle" />
                <div className="sheet-header-title-row">
                  <h3>Filter & Sort</h3>
                  <button
                    type="button"
                    className="sheet-close-btn"
                    onClick={() => setShowFilters(false)}
                    aria-label="Close filters"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="filter-sheet-body">
                {/* 1. Sort Options */}
                <div className="filter-sheet-section">
                  <h4 className="sheet-section-heading">Sort By</h4>
                  <div className="sheet-radio-group">
                    {[
                      { id: 'featured', label: 'Featured Collection' },
                      { id: 'price-low', label: 'Price: Low to High' },
                      { id: 'price-high', label: 'Price: High to Low' },
                      { id: 'rating', label: 'Customer Rating' },
                      { id: 'newest', label: 'Newest Arrivals' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`sheet-radio-btn ${sortBy === opt.id ? 'active' : ''}`}
                        onClick={() => setSortBy(opt.id)}
                      >
                        <span>{opt.label}</span>
                        {sortBy === opt.id && <Check size={16} className="check-icon" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Category Selection (if not forced category) */}
                {!effectiveCategory && (
                  <div className="filter-sheet-section">
                    <h4 className="sheet-section-heading">Categories</h4>
                    <div className="sheet-category-grid">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          className={`sheet-cat-chip ${activeCategory === cat ? 'active' : ''}`}
                          onClick={() => setActiveCategory(cat)}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="filter-sheet-footer">
                <button
                  type="button"
                  className="btn-sheet-reset"
                  onClick={() => {
                    setSortBy('featured');
                    setActiveCategory('All');
                  }}
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="btn-sheet-apply"
                  onClick={() => setShowFilters(false)}
                >
                  Apply ({filteredProducts.length} items)
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Products Grid */}
      <section className="products-grid-section">
        <div className="site-container">
          <div className="products-full-grid">
            {filteredProducts.map((product) => {
              const isCake = product.category.toLowerCase().includes('cake');
              return (
                <div
                  key={product.id}
                  className={`product-grid-card ${isCake ? 'cake-grid-item-clean' : ''}`}
                  data-tilt
                >
                  <div
                    className="product-card-img-wrap"
                    onClick={() => {
                      setActiveProduct(product);
                      navigateTo('/product/' + product.slug);
                    }}
                  >
                    {product.badge && !isCake && (
                      <span className="product-badge-chip">{product.badge}</span>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`product-card-img ${isCake ? 'cake-blend-img' : ''}`}
                    />

                    <div className="product-hover-actions">
                      <button
                        type="button"
                        className="hover-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        title={isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                        aria-label="Wishlist"
                      >
                        <Heart
                          size={16}
                          fill={isInWishlist(product.id) ? '#e63946' : 'none'}
                          color={isInWishlist(product.id) ? '#e63946' : '#fff'}
                        />
                      </button>
                      <button
                        type="button"
                        className="hover-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickViewProduct(product);
                        }}
                        title="Quick View"
                        aria-label="Quick View"
                      >
                        <Eye size={16} color="#fff" />
                      </button>
                      <button
                        type="button"
                        className="hover-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, 1);
                        }}
                        title="Add to Cart"
                        aria-label="Add to Cart"
                      >
                        <ShoppingCart size={16} color="#fff" />
                      </button>
                    </div>
                  </div>

                  <div className="product-card-info">
                    <span className="product-card-category">{product.category}</span>
                    <h3
                      className="product-card-name title-crunch"
                      onClick={() => {
                        setActiveProduct(product);
                        navigateTo('/product/' + product.slug);
                      }}
                    >
                      {product.name}
                    </h3>

                    {renderStars(product.rating)}

                    <div className="product-card-price-row">
                      <span className="product-card-price">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="product-card-original-price">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>

                    <button
                      type="button"
                      className="btn-add-to-cart-card"
                      onClick={() => addToCart(product, 1)}
                    >
                      {isCake ? '+ Order Cake' : 'Add to Bag'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick View Modal rendered into document.body */}
      {quickViewProduct && createPortal(
        <div className="modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div
            className="quick-view-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="close-quick-view-btn"
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>
            <div className="quick-view-grid">
              <div className="qv-img-holder cutout-product-stage">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="cutout-floating-img"
                />
              </div>
              <div className="quick-view-details">
                <span className="qv-cat">{quickViewProduct.category}</span>
                <h2 className="title-crunch">{quickViewProduct.name}</h2>
                <div className="qv-rating">
                  <RatingStars
                    rating={quickViewProduct.rating}
                    size={14}
                    showScore={true}
                    reviewCount={quickViewProduct.reviewCount}
                  />
                </div>
                <div className="qv-price">${quickViewProduct.price.toFixed(2)}</div>
                <p className="qv-desc">{quickViewProduct.shortDescription}</p>

                {quickViewProduct.boxContents && (
                  <div className="qv-contents-box">
                    <strong>Included in Hamper:</strong>
                    <ul>
                      {quickViewProduct.boxContents.map((c, i) => (
                        <li key={i}>✓ {c}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="qv-actions">
                  <button
                    type="button"
                    className="btn-qv-add"
                    onClick={() => {
                      addToCart(quickViewProduct, 1);
                      setQuickViewProduct(null);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    className="btn-qv-view-more"
                    onClick={() => {
                      setActiveProduct(quickViewProduct);
                      navigateTo('/product/' + quickViewProduct.slug);
                      setQuickViewProduct(null);
                    }}
                  >
                    Full Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

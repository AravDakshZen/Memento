import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Star, SlidersHorizontal } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';
import {
  ALL_PRODUCTS,
  CAKES_PRODUCTS,
  GIFTS_PRODUCTS,
  KEEPSAKES_PRODUCTS
} from '../data/products';
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
  const pageRef = useRef<HTMLDivElement>(null);

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
    const full = Math.floor(rating);
    return (
      <div className="product-stars-row">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={13}
            fill={i < full ? '#ffd166' : '#eae3ec'}
            stroke="none"
          />
        ))}
        <span className="review-count-small">({rating.toFixed(1)})</span>
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
          <h1 className="section-title-cormorant products-page-title">
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
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={15} /> Sort & Filter
            </button>

            <select
              className="sort-select"
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
                          setActiveProduct(product);
                          navigateTo('/product/' + product.slug);
                        }}
                        title="View Details"
                        aria-label="View Details"
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
                      className="product-card-name"
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
    </div>
  );
};

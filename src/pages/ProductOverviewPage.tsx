import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Heart,
  Repeat,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ClipboardList,
  Mail,
  X,
  Share2,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ALL_PRODUCTS, REVIEWS_DATA } from '../data/products';
import { RatingStars } from '../components/RatingStars';
import type { Review } from '../types';

// High-precision Official Brand SVG Icons
const FacebookIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const PinterestIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.33 1.365-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
  </svg>
);

const WhatsAppIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
  </svg>
);

export const ProductOverviewPage: React.FC = () => {
  const {
    activeProduct,
    setActiveProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActivePage,
    showToast
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'requirements' | 'reviews'>('description');
  const [selectedImage, setSelectedImage] = useState(activeProduct.image);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1);
  const [isHoverZooming, setIsHoverZooming] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 50, y: 50 });
  const [showStickyBar, setShowStickyBar] = useState(false);
  const buyBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (buyBoxRef.current) {
        const rect = buyBoxRef.current.getBoundingClientRect();
        // Show sticky bar when buy box scrolls past top viewport
        setShowStickyBar(rect.bottom < 0);
      } else {
        setShowStickyBar(window.scrollY > 450);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isZoomModalOpen) {
      document.body.style.overflow = 'hidden';
      setLightboxScale(1);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isZoomModalOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomCoords({ x, y });
  };

  // Sync state when activeProduct changes so each product displays its own unique details
  const [reviewsList, setReviewsList] = useState<Review[]>(
    activeProduct.reviews && activeProduct.reviews.length > 0
      ? activeProduct.reviews
      : REVIEWS_DATA
  );

  useEffect(() => {
    setSelectedImage(activeProduct.image);
    setReviewsList(
      activeProduct.reviews && activeProduct.reviews.length > 0
        ? activeProduct.reviews
        : REVIEWS_DATA
    );
    setQuantity(1);
    setActiveTab('description');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeProduct]);

  // New review form state
  const [userRating, setUserRating] = useState(5);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim() || !reviewerName.trim()) {
      showToast('Please fill in your review and name');
      return;
    }
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: reviewerName,
      date: 'Just now',
      rating: userRating,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      comment: reviewComment
    };
    setReviewsList([newRev, ...reviewsList]);
    setReviewComment('');
    setReviewerName('');
    setReviewerEmail('');
    showToast(`🎀 Thank you! Your review for "${activeProduct.name}" has been published.`);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Memento — ${activeProduct.name}`,
          text: activeProduct.shortDescription || `Explore ${activeProduct.name} at Memento Gifting Atelier`,
          url: window.location.href,
        });
        showToast('🎀 Link shared successfully!');
        return;
      } catch {
        // User cancelled or share failed, fallback
      }
    }
    // Fallback: Copy link
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('🎀 Product link copied to clipboard!');
    }
  };

  const handleShare = (platform: string) => {
    const shareUrl = window.location.href;
    const text = `Check out ${activeProduct.name} at Memento!`;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(text);

    let destination = '';
    if (platform === 'Facebook') {
      destination = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    } else if (platform === 'Twitter') {
      destination = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
    } else if (platform === 'LinkedIn') {
      destination = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    } else if (platform === 'Pinterest') {
      destination = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodeURIComponent(selectedImage || activeProduct.image)}&description=${encodedText}`;
    } else if (platform === 'WhatsApp') {
      destination = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
    } else if (platform === 'Email') {
      destination = `mailto:?subject=${encodedText}&body=${encodedUrl}`;
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
    }

    if (platform === 'Email') {
      window.location.href = destination;
    } else if (destination) {
      window.open(destination, '_blank', 'noopener,noreferrer,width=650,height=550');
    }
    showToast(`🎀 Shared "${activeProduct.name}" to ${platform}! Link copied.`);
  };

  // Filter out current active product from related list
  const relatedProducts = ALL_PRODUCTS.filter((p) => p.id !== activeProduct.id).slice(0, 4);

  return (
    <div className="product-overview-page">
      {/* 1. BREADCRUMBS */}
      <div className="product-breadcrumbs-bar">
        <div className="site-container breadcrumb-inner">
          <button type="button" onClick={() => setActivePage('home')} className="crumb-link">
            Memento
          </button>
          <span className="crumb-arrow">▸</span>
          <button type="button" onClick={() => setActivePage('home')} className="crumb-link">
            Products
          </button>
          <span className="crumb-arrow">▸</span>
          <span className="crumb-category">{activeProduct.category}</span>
          <span className="crumb-arrow">▸</span>
          <span className="crumb-current">{activeProduct.name}</span>
        </div>
      </div>

      {/* 2. MAIN PRODUCT OVERVIEW SHOWCASE */}
      <section className="product-main-showcase">
        <div className="site-container showcase-grid">
          {/* Left: Product Image Gallery */}
          <div className="product-gallery-column">
            <div
              className={`main-image-viewport ${isHoverZooming ? 'hover-zoomed' : ''}`}
              onMouseEnter={() => setIsHoverZooming(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsHoverZooming(false)}
              onClick={() => setIsZoomModalOpen(true)}
              title="Click to view full screen"
            >
              <img
                src={selectedImage || activeProduct.image}
                alt={activeProduct.name}
                className="main-product-img cutout-floating-img"
                style={{
                  transform: isHoverZooming ? 'scale(2.3)' : 'scale(1)',
                  transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                  transition: isHoverZooming ? 'transform 0.08s ease-out' : 'transform 0.35s ease-out',
                  cursor: 'zoom-in'
                }}
              />
              <span className={`hover-zoom-pill ${isHoverZooming ? 'active' : ''}`}>
                <ZoomIn size={12} />
                {isHoverZooming ? 'Zoom Active' : 'Hover to Zoom'}
              </span>
              <button
                type="button"
                className="zoom-magnifier-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomModalOpen(true);
                }}
                title="Zoom in on product"
                aria-label="Zoom image"
              >
                <ZoomIn size={18} />
              </button>
            </div>

            {/* Thumbnail selector */}
            {activeProduct.gallery && activeProduct.gallery.length > 1 && (
              <div className="gallery-thumbnails-row">
                {activeProduct.gallery.map((thumb, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`thumb-btn ${(selectedImage || activeProduct.image) === thumb ? 'active' : ''}`}
                    onClick={() => setSelectedImage(thumb)}
                  >
                    <img src={thumb} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Actions */}
          <div className="product-details-column">
            <span className="overview-badge-category">
              {activeProduct.category || 'Atelier Collection'}
            </span>
            <h1 className="product-title-jost">
              {activeProduct.name}
            </h1>

            <div className="product-price-row">
              <span className="price-current">${activeProduct.price}</span>
              {activeProduct.originalPrice && (
                <span className="price-original">${activeProduct.originalPrice}</span>
              )}
            </div>

            {/* Star Rating with Fractional Decimals */}
            <div className="product-ratings-summary">
              <RatingStars
                rating={activeProduct.rating}
                size={17}
                showScore={true}
                reviewCount={reviewsList.length}
              />
            </div>

            {/* Short Description */}
            <p className="product-short-description">
              {activeProduct.shortDescription}
            </p>

            {/* Included in Hamper List if Gift Box */}
            {activeProduct.boxContents && (
              <div className="overview-box-contents-card">
                <h4>✨ Hand-Packed In This Keepsake Hamper:</h4>
                <ul>
                  {activeProduct.boxContents.map((item, idx) => (
                    <li key={idx}>✓ {item}</li>
                  ))}
                  <li>✓ Double-faced French Satin Ribbon & Keepsake Packaging</li>
                  <li>✓ Complimentary Handwritten Calligraphy Note</li>
                </ul>
              </div>
            )}

            <div className="dotted-separator-line"></div>

            {/* Quantity Selector & Add to Cart */}
            <div className="product-purchase-row" ref={buyBoxRef}>
              <div className="quantity-counter-wrap">
                <span className="quantity-label">Quantity:</span>
                <div className="counter-box">
                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span className="counter-value">{quantity}</span>
                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="btn-add-to-cart-styled"
                onClick={() => {
                  addToCart(activeProduct, quantity);
                  showToast(`🎀 Added ${quantity}x "${activeProduct.name}" to cart!`);
                }}
              >
                ADD TO CART
              </button>

              <button
                type="button"
                className="icon-tool-btn"
                onClick={() => toggleWishlist(activeProduct.id)}
                title={isInWishlist(activeProduct.id) ? 'In Wishlist' : 'Add to Wishlist'}
                aria-label="Wishlist"
              >
                <Heart
                  size={19}
                  fill={isInWishlist(activeProduct.id) ? '#e63946' : 'none'}
                  color={isInWishlist(activeProduct.id) ? '#e63946' : '#777777'}
                />
              </button>

              <button
                type="button"
                className="icon-tool-btn"
                onClick={() => showToast('Product added to comparison list')}
                title="Compare product"
                aria-label="Compare"
              >
                <Repeat size={19} color="#777777" />
              </button>
            </div>

            <div className="dotted-separator-line"></div>

            {/* Share Links */}
            <div className="product-share-row">
              <span className="share-label">Share:</span>
              <div className="share-icons-wrap">
                <button
                  type="button"
                  className="share-btn-brand brand-native-share"
                  onClick={handleNativeShare}
                  title="Share with friends"
                  aria-label="Share with friends"
                >
                  <Share2 size={14} />
                  <span className="share-btn-text">Share</span>
                </button>
                <button
                  type="button"
                  className="share-btn-brand brand-facebook"
                  onClick={() => handleShare('Facebook')}
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <FacebookIcon />
                </button>
                <button
                  type="button"
                  className="share-btn-brand brand-twitter"
                  onClick={() => handleShare('Twitter')}
                  title="Share on X"
                  aria-label="Share on X"
                >
                  <TwitterIcon />
                </button>
                <button
                  type="button"
                  className="share-btn-brand brand-linkedin"
                  onClick={() => handleShare('LinkedIn')}
                  title="Share on LinkedIn"
                  aria-label="Share on LinkedIn"
                >
                  <LinkedinIcon />
                </button>
                <button
                  type="button"
                  className="share-btn-brand brand-pinterest"
                  onClick={() => handleShare('Pinterest')}
                  title="Share on Pinterest"
                  aria-label="Share on Pinterest"
                >
                  <PinterestIcon />
                </button>
                <button
                  type="button"
                  className="share-btn-brand brand-whatsapp"
                  onClick={() => handleShare('WhatsApp')}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <WhatsAppIcon />
                </button>
                <button
                  type="button"
                  className="share-btn-brand brand-email"
                  onClick={() => handleShare('Email')}
                  title="Share via Email"
                  aria-label="Share via Email"
                >
                  <Mail size={14} />
                </button>
              </div>
            </div>

            <div className="dotted-separator-line"></div>

            {/* Meta Information (SKU, Categories, Tags) */}
            <div className="product-meta-block">
              <p>
                <strong>SKU:</strong> <span>{activeProduct.sku}</span>
              </p>
              <p>
                <strong>Category:</strong>{' '}
                <span>
                  {activeProduct.categories
                    ? activeProduct.categories.join(', ')
                    : activeProduct.category}
                </span>
              </p>
              <p>
                <strong>Tags:</strong> <span>{activeProduct.tags.join(', ')}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TABS SECTION: DESCRIPTION, REQUIREMENTS & SPECS, REVIEWS */}
      <section className="product-tabs-section">
        <div className="site-container">
          <div className="tabs-navigation-bar">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              DESCRIPTION
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'requirements' ? 'active' : ''}`}
              onClick={() => setActiveTab('requirements')}
            >
              REQUIREMENTS & SPECS
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              REVIEWS ({reviewsList.length})
            </button>
          </div>

          <div className="dotted-separator-line tab-top-divider"></div>

          <div className="tab-pane-content">
            {/* TAB 1: DESCRIPTION */}
            {activeTab === 'description' && (
              <div className="description-pane">
                <p className="tab-body-paragraph">
                  {activeProduct.fullDescription || activeProduct.shortDescription}
                </p>

                {activeProduct.features && activeProduct.features.length > 0 && (
                  <>
                    <h3 className="features-subhead">Bespoke Features & Craftsmanship</h3>
                    <ul className="features-check-list">
                      {activeProduct.features.map((feat, idx) => (
                        <li key={idx}>
                          <span className="check-circle-icon">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {/* TAB 2: REQUIREMENTS & SPECS (Tailored per product) */}
            {activeTab === 'requirements' && (
              <div className="additional-info-pane">
                {/* Product Requirements Box */}
                <div className="product-requirements-card">
                  <div className="req-header-row">
                    <ClipboardList size={20} className="req-icon" />
                    <h3>Order Requirements & Atelier Care Guidelines</h3>
                  </div>
                  <ul className="req-list-items">
                    {(activeProduct.requirements && activeProduct.requirements.length > 0
                      ? activeProduct.requirements
                      : [
                          'Custom Note: Provide message at checkout for hand-lettered ink card.',
                          'Handling: Fragile artisanal keepsake; store away from moisture and direct sunlight.',
                          'Packaging: Shipped in reinforced gift box with French satin ribbon.'
                        ]
                    ).map((req, idx) => (
                      <li key={idx} className="req-list-item">
                        <span className="req-bullet-dot">✦</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Specifications Table */}
                {activeProduct.specs && (
                  <div className="product-specs-table-wrap">
                    <h4 className="specs-subheading">Technical Specifications</h4>
                    <table className="specs-table">
                      <tbody>
                        {Object.entries(activeProduct.specs).map(([label, val], idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                            <td className="spec-label">{label}</td>
                            <td className="spec-value">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: REVIEWS (Unique for each product) */}
            {activeTab === 'reviews' && (
              <div className="reviews-pane">
                <div className="reviews-feed">
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="single-review-item">
                      <div className="reviewer-avatar">
                        <img src={rev.avatar} alt={rev.author} />
                      </div>
                      <div className="review-content-col">
                        <p className="review-quote-text">“{rev.comment}”</p>
                        <div className="reviewer-meta-row">
                          <div className="review-stars-display">
                            {'★'.repeat(Math.floor(rev.rating))}
                            {rev.rating % 1 !== 0 && '★'}
                          </div>
                          <span className="dot-sep">•</span>
                          <strong className="reviewer-name">{rev.author}</strong>
                          <span className="dot-sep">•</span>
                          <span className="review-date">{rev.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Review Submission Form */}
                <div className="add-review-form-box">
                  <p className="form-disclaimer">
                    Your email address will not be published. Required fields are marked <span className="red-star">*</span>
                  </p>

                  <form onSubmit={handleReviewSubmit}>
                    <div className="rating-select-row">
                      <label>Your rating</label>
                      <div className="interactive-stars-picker">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`star-choice-btn ${userRating >= star ? 'gold' : ''}`}
                            onClick={() => setUserRating(star)}
                            aria-label={`Rate ${star} stars`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-field-group">
                      <label>Your review <span className="red-star">*</span></label>
                      <textarea
                        rows={4}
                        placeholder="Write your review here..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-two-cols">
                      <div className="form-field-group">
                        <label>Name <span className="red-star">*</span></label>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field-group">
                        <label>Email <span className="red-star">*</span></label>
                        <input
                          type="email"
                          placeholder="Your email address"
                          value={reviewerEmail}
                          onChange={(e) => setReviewerEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="checkbox-save-row">
                      <input type="checkbox" id="save-info" defaultChecked />
                      <label htmlFor="save-info">
                        Save my name, email, and website in this browser for the next time I comment.
                      </label>
                    </div>

                    <button type="submit" className="btn-submit-review">
                      SUBMIT
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. RELATED PRODUCTS SECTION */}
      <section className="related-products-section">
        <div className="site-container">
          <div className="section-header-centered">
            <h2 className="related-products-heading-jost">
              Related products
            </h2>
          </div>

          <div className="related-products-grid">
            {relatedProducts.map((prod) => (
              <div key={prod.id} className="related-product-card">
                <div
                  className="related-img-wrap"
                  onClick={() => {
                    setActiveProduct(prod);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <img src={prod.image} alt={prod.name} />
                </div>

                <div className="related-price-line">
                  <span className="current">${prod.price}</span>
                  {prod.originalPrice && (
                    <span className="orig">${prod.originalPrice}</span>
                  )}
                </div>

                <h3
                  className="related-title-jost"
                  onClick={() => {
                    setActiveProduct(prod);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {prod.name}
                </h3>

                <div className="related-stars">
                  <RatingStars rating={prod.rating} size={13} showScore={true} />
                </div>

                <button
                  type="button"
                  className="btn-quick-add"
                  onClick={() => addToCart(prod, 1)}
                >
                  + Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Mobile Add-to-Cart Floating Bar (Visible when scrolling on mobile) */}
      <div className={`mobile-sticky-buy-bar ${showStickyBar ? 'visible' : ''}`}>
        <div className="sticky-bar-inner">
          <div className="sticky-bar-product-info">
            <img
              src={selectedImage || activeProduct.image}
              alt={activeProduct.name}
              className="sticky-bar-thumb"
            />
            <div className="sticky-bar-meta">
              <h4 className="sticky-bar-title">{activeProduct.name}</h4>
              <span className="sticky-bar-price">${activeProduct.price}</span>
            </div>
          </div>

          <div className="sticky-bar-actions">
            <div className="sticky-qty-stepper">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="sticky-btn-add"
              onClick={() => {
                addToCart(activeProduct, quantity);
                showToast(`🎀 Added ${quantity}x "${activeProduct.name}" to cart!`);
              }}
            >
              <ShoppingBag size={16} />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Interactive Lightbox Zoom Modal rendered to body */}
      {isZoomModalOpen && createPortal(
        <div className="modal-backdrop zoom-lightbox-backdrop" onClick={() => setIsZoomModalOpen(false)}>
          <div className="zoom-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="zoom-toolbar">
              <div className="zoom-info-badge">
                <span className="zoom-product-title">{activeProduct.name}</span>
                <span className="zoom-level-indicator">({Math.round(lightboxScale * 100)}%)</span>
              </div>
              <div className="zoom-actions-group">
                <button
                  type="button"
                  className="zoom-tool-btn"
                  onClick={() => setLightboxScale((s) => Math.max(0.6, Number((s - 0.25).toFixed(2))))}
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>
                <button
                  type="button"
                  className="zoom-tool-btn"
                  onClick={() => setLightboxScale(1)}
                  title="Reset Zoom"
                  aria-label="Reset Zoom"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  type="button"
                  className="zoom-tool-btn"
                  onClick={() => setLightboxScale((s) => Math.min(3.5, Number((s + 0.25).toFixed(2))))}
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  type="button"
                  className="zoom-close-btn"
                  onClick={() => setIsZoomModalOpen(false)}
                  title="Close Viewer"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="zoom-image-stage">
              <img
                src={selectedImage || activeProduct.image}
                alt={activeProduct.name}
                className="zoomed-high-res-img"
                style={{
                  transform: `scale(${lightboxScale})`,
                  cursor: lightboxScale > 1 ? 'grab' : 'zoom-in',
                  transition: 'transform 0.18s ease-out'
                }}
                onClick={() => setLightboxScale((s) => (s >= 2 ? 1 : Number((s + 0.5).toFixed(2))))}
              />
            </div>
            <p className="zoom-caption">Click image or use controls to inspect handcrafted details</p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

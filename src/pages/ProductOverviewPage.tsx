import React, { useState, useEffect } from 'react';
import {
  Heart,
  Repeat,
  ZoomIn,
  ClipboardList
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ALL_PRODUCTS, REVIEWS_DATA } from '../data/products';
import type { Review } from '../types';

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

  const handleShare = (platform: string) => {
    showToast(`Shared to ${platform}! Link copied.`);
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
            <div className="main-image-viewport cutout-product-stage" data-tilt>
              <div className="cutout-pedestal-aura" />
              <img
                src={selectedImage || activeProduct.image}
                alt={activeProduct.name}
                className="main-product-img cutout-floating-img"
              />
              <button
                type="button"
                className="zoom-magnifier-btn"
                onClick={() => setIsZoomModalOpen(true)}
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

            {/* Star Rating */}
            <div className="product-ratings-summary">
              <div className="gold-stars">
                {'★'.repeat(Math.round(activeProduct.rating))}
                {'☆'.repeat(5 - Math.round(activeProduct.rating))}
              </div>
              <span className="reviews-count-text">
                ({reviewsList.length} verified reviews for this product)
              </span>
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
                  <li>✓ Double-faced French Satin Ribbon & Wax Seal</li>
                  <li>✓ Complimentary Handwritten Calligraphy Note</li>
                </ul>
              </div>
            )}

            <div className="dotted-separator-line"></div>

            {/* Quantity Selector & Add to Cart */}
            <div className="product-purchase-row">
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
                <button type="button" onClick={() => handleShare('Facebook')} title="Facebook">f</button>
                <button type="button" onClick={() => handleShare('Twitter')} title="Twitter">🕊</button>
                <button type="button" onClick={() => handleShare('LinkedIn')} title="LinkedIn">in</button>
                <button type="button" onClick={() => handleShare('Pinterest')} title="Pinterest">📌</button>
                <button type="button" onClick={() => handleShare('Email')} title="Email">✉</button>
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
                  {'★'.repeat(Math.round(prod.rating))}
                  {'☆'.repeat(5 - Math.round(prod.rating))}
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

      {/* Full-Screen Zoom Modal */}
      {isZoomModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsZoomModalOpen(false)}>
          <div className="zoom-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="zoom-close-btn"
              onClick={() => setIsZoomModalOpen(false)}
            >
              ✕
            </button>
            <img
              src={selectedImage || activeProduct.image}
              alt={activeProduct.name}
              className="zoomed-high-res-img"
            />
            <p className="zoom-caption">{activeProduct.name} — Luxury Boutique View</p>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Heart,
  ShoppingCart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Package,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';
import {
  MAIN_PRODUCT,
  LUXURY_GIFT_HAMPERS,
  FIGMA_CUPCAKES,
  RELATED_PRODUCTS,
  BLOG_POSTS,
  INSTA_POSTS
} from '../data/products';
import type { Product } from '../types';
import { UnboxExperience } from '../components/UnboxExperience';
import { RatingStars } from '../components/RatingStars';

gsap.registerPlugin(ScrollTrigger);

export const HomePage: React.FC = () => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActiveProduct,
    navigateTo,
    showToast
  } = useCart();

  const [activeFlavorFilter, setActiveFlavorFilter] = useState('All');
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

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

  const heroRef = useRef<HTMLDivElement>(null);
  const hampersRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      quote:
        '“The unboxing was breathtaking. Opening the blush trunk, smelling the rose-peony candle, and seeing our personalized calligraphy card was pure luxury. My sister cried happy tears!”',
      author: 'GENEVIEVE LAURENT',
      role: 'Verified Milestone Buyer',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    },
    {
      quote:
        '“The Memento boutique curated 25 bespoke executive hampers for our year-end corporate retreat. Every client called to compliment the French satin ribbons and calligraphy cards.”',
      author: 'JULIAN MONTGOMERY',
      role: 'Managing Partner, Atelier Lux',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    },
    {
      quote:
        '“The wooden card keeper book is now an heirloom on our coffee table holding all our wedding cards. Truly the most thoughtful gift house in the country.”',
      author: 'EMILY & BLAKE H.',
      role: 'Bridal Couple',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
    }
  ];

  // Comprehensive GSAP ScrollTrigger Animations Suite
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Fixed Scroll Progress Indicator at top of viewport
      gsap.to('.scroll-progress-fill', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2
        }
      });

      // 2. Hero headline stagger entrance
      gsap.fromTo(
        '.hero-stagger-text',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out'
        }
      );

      // 3. Hero flatlay 3D scrub zoom
      gsap.to('.hero-flatlay-img', {
        yPercent: -18,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-banner-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      // 4. New Arrivals staggered entrance

      // 4c. New Arrivals staggered entrance
      gsap.fromTo(
        '.new-arrival-card',
        { opacity: 0, y: 45, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#new-arrivals-section',
            start: 'top 80%'
          }
        }
      );

      // 5. Atelier Perks Strip staggered entrance
      gsap.fromTo(
        '.perk-item',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.atelier-perks-strip',
            start: 'top 90%'
          }
        }
      );

      // 6. Handcraft Story 3D perspective & columns
      gsap.fromTo(
        '.story-left-col',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.handcraft-story-section',
            start: 'top 80%'
          }
        }
      );
      gsap.fromTo(
        '.story-center-col',
        { opacity: 0, scale: 0.86, rotateY: -15 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.handcraft-story-section',
            start: 'top 80%'
          }
        }
      );
      gsap.fromTo(
        '.story-right-col',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.handcraft-story-section',
            start: 'top 80%'
          }
        }
      );

      // 7. Curated Keepsake Hampers Grid Batch reveal
      gsap.fromTo(
        '.gift-hamper-card',
        { opacity: 0, y: 65, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#curated-hampers-section',
            start: 'top 80%'
          }
        }
      );

      // 8. Interactive 3D Unboxing Section reveal
      gsap.fromTo(
        '.unbox-card-canvas',
        { opacity: 0, scale: 0.92, y: 45 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#atelier-experience',
            start: 'top 75%'
          }
        }
      );
      gsap.fromTo(
        '.calligraphy-concierge-card',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#atelier-experience',
            start: 'top 75%'
          }
        }
      );

      // 9. Infinite Marquee scrub acceleration
      gsap.to('.marquee-track', {
        xPercent: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: '.marquee-banner-strip',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      });

      // 10. Sweet Favors carousel items bounce reveal
      gsap.fromTo(
        '.cupcake-item-card',
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '#sweet-favors-section',
            start: 'top 80%'
          }
        }
      );

      // 12. Personalized Keepsakes 4-Column Grid wave
      gsap.fromTo(
        '.related-product-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.keepsake-highlight-section',
            start: 'top 80%'
          }
        }
      );

      // 13. Testimonials Section portrait & quote reveal
      gsap.fromTo(
        '.testimonial-portrait-wrap',
        { opacity: 0, rotate: -15, scale: 0.85 },
        {
          opacity: 1,
          rotate: 0,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.testimonial-scalloped-section',
            start: 'top 75%'
          }
        }
      );
      gsap.fromTo(
        '.testimonial-quote-wrap',
        { opacity: 0, x: 45 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonial-scalloped-section',
            start: 'top 75%'
          }
        }
      );

      // 14. Instagram Dispatch Postage Stamps
      gsap.fromTo(
        '.postage-stamp-card',
        { opacity: 0, y: 35, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.stamp-insta-section',
            start: 'top 85%'
          }
        }
      );

      // 15. Newsletter banner zoom
      gsap.fromTo(
        '.polka-dot-banner-card',
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.newsletter-banner-card-section',
            start: 'top 80%'
          }
        }
      );

      // 16. Gifting Journal articles
      gsap.fromTo(
        '.blog-post-card',
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#blog-section',
            start: 'top 80%'
          }
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f5899e', '#8266b7', '#ffd166', '#a0c4ff', '#ffc6ff']
    });
    showToast(`🎀 Splendid! ${newsletterEmail} is subscribed to the Memento Atelier Gazette.`);
    setNewsletterEmail('');
  };

  const filteredCupcakes =
    activeFlavorFilter === 'All'
      ? FIGMA_CUPCAKES
      : FIGMA_CUPCAKES.filter(
          (c) => c.flavor?.toLowerCase().includes(activeFlavorFilter.toLowerCase())
        );

  return (
    <div className="memento-home-page" ref={heroRef}>
      {/* 0. Top Scroll Progress Indicator */}
      <div className="scroll-progress-bar-fixed" aria-hidden="true">
        <div className="scroll-progress-fill" />
      </div>

      {/* 1. HERO SECTION WITH SCALLOPED TOP BORDER */}
      <section className="hero-banner-section">
        {/* Scallop Wave SVG Top Edge */}
        <div className="scallop-top-border" aria-hidden="true">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none">
            <path
              d="M0,0 C60,40 120,40 180,0 C240,40 300,40 360,0 C420,40 480,40 540,0 C600,40 660,40 720,0 C780,40 840,40 900,0 C960,40 1020,40 1080,0 C1140,40 1200,40 1260,0 C1320,40 1380,40 1440,0 L1440,0 L0,0 Z"
              fill="#ffffff"
            />
          </svg>
        </div>

        <div className="site-container hero-inner-container">
          <div className="hero-content-box">
            <div className="hero-title-wrap hero-stagger-text">
              <h1 className="hero-main-heading">
                The Art of Meaningful Gifting
                <br />
                <span className="hero-subheading-italic">Curated Keepsakes & Bespoke Hampers</span>
              </h1>
              {/* Gold Burst Rays Accent */}
              <div className="yellow-accent-rays" aria-hidden="true">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M18 4V12" stroke="#FFD166" strokeWidth="3" strokeLinecap="round" />
                  <path d="M28 8L22 14" stroke="#FFD166" strokeWidth="3" strokeLinecap="round" />
                  <path d="M32 18H24" stroke="#FFD166" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <p className="hero-subtext hero-stagger-text">
              Hand-wrapped with double-faced French satin ribbons and personalized calligraphy notes. Elevating celebrations into unforgettable heirlooms.
            </p>

            <div className="hero-cta-wrapper hero-stagger-text">
              <button
                type="button"
                className="btn-hero-shop"
                onClick={() => {
                  const el = document.getElementById('curated-hampers-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else {
                    setActiveProduct(MAIN_PRODUCT);
                    navigateTo('/product/' + MAIN_PRODUCT.slug);
                  }
                }}
                data-cursor="DISCOVER"
              >
                <Package size={17} /> Explore Curated Hampers
              </button>
            </div>
          </div>

          {/* Hero Bottom Image of Pastel & Metallic Gift Boxes */}
          <div className="hero-banner-image-wrap">
            <img
              src="/images/hero_gift_boxes.jpg"
              alt="Luxury Memento gift boxes and hampers flatlay"
              className="hero-flatlay-img"
            />
          </div>
        </div>
      </section>

      {/* LUXURY ATELIER ATTRIBUTES STRIP */}
      <div className="atelier-perks-strip">
        <div className="site-container perks-inner-flex">
          <div className="perk-item">
            <span className="perk-bullet">✦</span>
            <span>HAND-ASSEMBLED IN OUR ATELIER</span>
          </div>
          <div className="perk-item">
            <span className="perk-bullet">✦</span>
            <span>COMPLIMENTARY CALLIGRAPHY CARD</span>
          </div>
          <div className="perk-item">
            <span className="perk-bullet">✦</span>
            <span>CURATED ARTISANAL HAMPERS</span>
          </div>
          <div className="perk-item">
            <span className="perk-bullet">✦</span>
            <span>WHITE-GLOVE SAME-DAY DISPATCH</span>
          </div>
        </div>
      </div>

      {/* 2. VALUE PROPOSITION & HANDCRAFT STORY SECTION */}
      <section className="handcraft-story-section">
        <div className="site-container story-grid">
          <div className="story-left-col gsap-reveal-up">
            <span className="section-eyebrow">THE MEMENTO PROMISE</span>
            <h2 className="story-title">
              Every Gift Box is an Heirloom Story Handcrafted for Cherished Milestones
            </h2>
          </div>

          {/* Transparent Cutout Floating Gift Box Stage */}
          <div className="story-center-col">
            <div className="diamond-gift-box-wrap cutout-product-stage" data-tilt data-cursor="VIEW">
              <img
                src="/images/Polka-Dot Pink Gift Box with Bow.png"
                alt="Polka-Dot Pink Keepsake Gift Box"
                className="cutout-floating-img"
              />
            </div>
          </div>

          <div className="story-right-col gsap-reveal-up">
            <p className="story-description">
              We believe a gift should be felt before it is opened. Inside each archival keepsake trunk, we layer silk tissue paper, hand-poured botanical fragrances, and bespoke confection treats to create a symphony of delight.
            </p>
            <div className="story-action-buttons">
              <button
                type="button"
                className="btn-story-shop"
                onClick={() => {
                  setActiveProduct(MAIN_PRODUCT);
                  navigateTo('/product/' + MAIN_PRODUCT.slug);
                }}
                data-cursor="UNWRAP"
              >
                Discover The Signature Trunk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2b. NEW ARRIVALS SECTION (MULTI-PRODUCT CURATED COLLECTION) */}
      <section className="new-arrivals-section" id="new-arrivals-section">
        <div className="site-container">
          <div className="section-header-centered gsap-reveal-up">
            <div className="section-eyebrow-with-icon">
              <Sparkles size={14} className="sparkle-spin" />
              <span className="section-eyebrow">FRESH ATELIER CREATIONS</span>
            </div>
            <h2 className="section-title-serif">
              New Arrivals • Autumn Celebration Collection
            </h2>
            <p className="section-lead-subtitle">
              Discover our latest limited-batch creations: hand-assembled keepsake trunks, artisanal sweet favors, and personalized celebratory gifts.
            </p>
          </div>

          {/* New Arrivals 6-Product Responsive Grid */}
          <div className="new-arrivals-grid">
            {[
              LUXURY_GIFT_HAMPERS[0],
              FIGMA_CUPCAKES[1],
              MAIN_PRODUCT,
              FIGMA_CUPCAKES[0],
              RELATED_PRODUCTS[1],
              LUXURY_GIFT_HAMPERS[1]
            ].map((prod) => (
              <div key={prod.id} className="new-arrival-card" data-tilt data-cursor="VIEW">
                <div
                  className="new-arrival-img-wrap"
                  onClick={() => {
                    setActiveProduct(prod);
                    navigateTo('/product/' + prod.slug);
                  }}
                >
                  <span className="new-arrival-glow-badge">✨ NEW</span>
                  <img src={prod.image} alt={prod.name} className="new-arrival-img" />

                  {/* Quick Action Overlay */}
                  <div className="new-arrival-overlay">
                    <button
                      type="button"
                      className="icon-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod.id);
                      }}
                      title={isInWishlist(prod.id) ? 'In Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart
                        size={17}
                        fill={isInWishlist(prod.id) ? '#e63946' : 'none'}
                        color={isInWishlist(prod.id) ? '#e63946' : '#ffffff'}
                      />
                    </button>
                    <button
                      type="button"
                      className="icon-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(prod);
                      }}
                      title="Quick View"
                    >
                      <Eye size={17} color="#ffffff" />
                    </button>
                  </div>
                </div>

                <div className="new-arrival-info">
                  <span className="new-arrival-category">{prod.category}</span>
                  <h3
                    className="new-arrival-title"
                    onClick={() => {
                      setActiveProduct(prod);
                      navigateTo('/product/' + prod.slug);
                    }}
                  >
                    {prod.name}
                  </h3>

                  {/* Clean Fractional Star Rating */}
                  <div className="new-arrival-rating-row">
                    <RatingStars
                      rating={prod.rating}
                      size={13}
                      showScore={true}
                      reviewCount={prod.reviewCount}
                    />
                  </div>

                  <div className="new-arrival-bottom-row">
                    <div className="price-tag-wrap">
                      <span className="current-price">${prod.price.toFixed(2)}</span>
                      {prod.originalPrice && (
                        <span className="original-price">${prod.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn-quick-add"
                      onClick={() => addToCart(prod, 1)}
                    >
                      <ShoppingCart size={15} /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="view-all-products-banner">
            <button
              type="button"
              className="btn-view-all-collection"
              onClick={() => navigateTo('/products')}
            >
              Explore All Boutique Offerings <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. CURATED KEEPSAKE HAMPERS (BACKGROUND-FREE FLOATING PNG PRESENTATION) */}
      <section className="artisanal-chocolates-section" id="curated-hampers-section" ref={hampersRef}>
        <div className="site-container">
          <div className="section-header-centered gsap-reveal-up">
            <span className="section-eyebrow">CURATED COLLECTIONS</span>
            <h2 className="section-title-serif">
              Haute Keepsake Hampers & Celebration Boxes
            </h2>
            <p className="section-lead-subtitle">
              Each hamper is hand-packed with artisanal keepsakes, French confections, and personalized calligraphy cards.
            </p>
          </div>

          {/* Grid of Cutout Floating Hampers */}
          <div className="treats-cards-grid gsap-stagger-cards">
            {LUXURY_GIFT_HAMPERS.map((hamper) => (
              <div
                key={hamper.id}
                className="treat-card gift-hamper-card"
                data-tilt
                data-cursor="VIEW"
              >
                {/* Background-Free Floating PNG Stage */}
                <div
                  className="treat-card-img-wrap cutout-product-stage"
                  onClick={() => {
                    setActiveProduct(hamper);
                    navigateTo('/product/' + hamper.slug);
                  }}
                >
                  {hamper.badge && (
                    <span className="treat-badge-chip">{hamper.badge}</span>
                  )}
                  <img
                    src={hamper.image}
                    alt={hamper.name}
                    className="cutout-floating-img"
                  />

                  <div className="treat-hover-overlay">
                    <button
                      type="button"
                      className="icon-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(hamper.id);
                      }}
                      title={isInWishlist(hamper.id) ? 'In Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart
                        size={18}
                        fill={isInWishlist(hamper.id) ? '#e63946' : 'none'}
                        color={isInWishlist(hamper.id) ? '#e63946' : '#ffffff'}
                      />
                    </button>
                    <button
                      type="button"
                      className="icon-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(hamper);
                      }}
                      title="Quick View"
                    >
                      <Eye size={18} color="#ffffff" />
                    </button>
                    <button
                      type="button"
                      className="icon-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(hamper, 1);
                      }}
                      title="Add to Cart"
                    >
                      <ShoppingCart size={18} color="#ffffff" />
                    </button>
                  </div>
                </div>

                <div className="treat-card-info">
                  <span className="treat-code">ATELIER KEEPSAKE</span>
                  <h3
                    className="treat-name"
                    onClick={() => {
                      setActiveProduct(hamper);
                      navigateTo('/product/' + hamper.slug);
                    }}
                  >
                    {hamper.name}
                  </h3>
                  <p className="hamper-card-desc">{hamper.shortDescription}</p>

                  <div className="hamper-price-action-row">
                    <span className="treat-price">${hamper.price.toFixed(2)}</span>
                    <button
                      type="button"
                      className="btn-card-quick-cart"
                      onClick={() => addToCart(hamper, 1)}
                    >
                      Add Hamper
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE 3D UNBOXING EXPERIENCE */}
      <UnboxExperience />

      {/* 5. INFINITE MARQUEE TICKER (WITH SCROLLTRIGGER ACCELERATION) */}
      <section className="marquee-banner-strip">
        <div className="marquee-track">
          <div className="marquee-content">
            <span>FRENCH SATIN RIBBONS</span>
            <span className="marquee-sparkle">✦</span>
            <span>LUXURY GIFT BOXES</span>
            <span className="marquee-sparkle">✦</span>
            <span>HANDWRITTEN CALLIGRAPHY</span>
            <span className="marquee-sparkle">✦</span>
            <span>CURATED KEEPSAKE TRUNKS</span>
            <span className="marquee-sparkle">✦</span>
            <span>ARTISANAL CELEBRATION SWEETS</span>
            <span className="marquee-sparkle">✦</span>
          </div>
          <div className="marquee-content" aria-hidden="true">
            <span>FRENCH SATIN RIBBONS</span>
            <span className="marquee-sparkle">✦</span>
            <span>LUXURY GIFT BOXES</span>
            <span className="marquee-sparkle">✦</span>
            <span>HANDWRITTEN CALLIGRAPHY</span>
            <span className="marquee-sparkle">✦</span>
            <span>ARTISANAL CELEBRATION SWEETS</span>
            <span className="marquee-sparkle">✦</span>
            <span>CURATED KEEPSAKE TRUNKS</span>
            <span className="marquee-sparkle">✦</span>
          </div>
        </div>
      </section>

      {/* 6. SWEET GIFT FAVORS & CONFECTIONS SECTION */}
      <section className="flavor-selection-section" id="sweet-favors-section">
        <div className="site-container">
          <div className="section-header-centered gsap-reveal-up">
            <span className="section-eyebrow">PETITE CELEBRATIONS</span>
            <h2 className="section-title-serif">
              Artisanal Sweet Gift Favors & Delights
            </h2>
            <p className="section-lead-subtitle">
              Individual celebration favors encased in clear gift pedestals with satin ribbons. Perfect for bridal showers, party gifts, and sweet thank-yous.
            </p>

            <div className="flavor-tabs-pills">
              {['All', 'Rosé', 'Blueberry', 'Raspberry'].map((flv) => (
                <button
                  key={flv}
                  type="button"
                  className={`flavor-pill-btn ${activeFlavorFilter === flv ? 'active' : ''}`}
                  onClick={() => setActiveFlavorFilter(flv)}
                >
                  {flv}
                </button>
              ))}
            </div>
          </div>

          <div className="cupcakes-carousel-wrap">
            <button
              type="button"
              className="carousel-arrow-circle arrow-left"
              onClick={() => {
                const el = document.getElementById('cupcakes-track');
                if (el) el.scrollBy({ left: -280, behavior: 'smooth' });
              }}
              aria-label="Previous flavor"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="cupcakes-grid-row" id="cupcakes-track">
              {filteredCupcakes.map((cupcake) => (
                <div
                  key={cupcake.id}
                  className="cupcake-item-card transparent-cake-card"
                  data-tilt
                  data-cursor="VIEW"
                >
                  {/* Clean Transparent Cake Stage (no hamper aura or seals) */}
                  <div
                    className="cupcake-img-holder transparent-cake-stage"
                    onClick={() => {
                      setActiveProduct(cupcake);
                      navigateTo('/product/' + cupcake.slug);
                    }}
                  >
                    <img
                      src={cupcake.image}
                      alt={cupcake.name}
                      className="cake-transparent-img"
                    />
                  </div>

                  <span className="flavor-badge-tag">{cupcake.flavor || 'Artisanal Confection'}</span>

                  <h3
                    className="cupcake-title"
                    onClick={() => {
                      setActiveProduct(cupcake);
                      navigateTo('/product/' + cupcake.slug);
                    }}
                  >
                    {cupcake.name}
                  </h3>

                  {/* Clean Transparent Cake Rating Row */}
                  <div className="cake-clean-rating-row">
                    <RatingStars
                      rating={cupcake.rating}
                      size={13}
                      showScore={true}
                      reviewCount={cupcake.reviewCount}
                    />
                  </div>

                  <span className="cupcake-price">
                    ${cupcake.price.toFixed(2)}
                  </span>

                  <button
                    type="button"
                    className="btn-add-cupcake"
                    onClick={() => addToCart(cupcake, 1)}
                  >
                    + Order Cake
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="carousel-arrow-circle arrow-right"
              onClick={() => {
                const el = document.getElementById('cupcakes-track');
                if (el) el.scrollBy({ left: 280, behavior: 'smooth' });
              }}
              aria-label="Next flavor"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 8. PERSONALIZED KEEPSAKES & HEIRLOOMS */}
      <section className="related-products-section keepsake-highlight-section" id="party-items-section">
        <div className="site-container">
          <div className="section-header-centered gsap-reveal-up">
            <span className="section-eyebrow">CHERISHED MEMORIES</span>
            <h2 className="section-title-serif">
              Personalized Keepsakes & Sculptures
            </h2>
            <p className="section-lead-subtitle">
              Heirloom treasures designed to capture heartfelt memories and adorn cherished rooms forever.
            </p>
          </div>

          <div className="related-products-grid gsap-stagger-cards">
            {RELATED_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="related-product-card"
                data-tilt
                data-cursor="VIEW"
              >
                <div
                  className="related-img-wrap cutout-product-stage"
                  onClick={() => {
                    setActiveProduct(prod);
                    navigateTo('/product/' + prod.slug);
                  }}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="cutout-floating-img"
                  />
                </div>

                <div className="related-price-line">
                  <span className="current">${prod.price.toFixed(2)}</span>
                  {prod.originalPrice && (
                    <span className="orig">${prod.originalPrice.toFixed(2)}</span>
                  )}
                </div>

                <h3
                  className="related-title-jost"
                  onClick={() => {
                    setActiveProduct(prod);
                    navigateTo('/product/' + prod.slug);
                  }}
                >
                  {prod.name}
                </h3>

                <div className="related-stars">★★★★★</div>

                <button
                  type="button"
                  className="btn-quick-add"
                  onClick={() => addToCart(prod, 1)}
                >
                  + Add Keepsake
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SCALLOPED TESTIMONIALS SECTION */}
      <section className="testimonial-scalloped-section">
        <div className="scallop-divider-top" aria-hidden="true">
          <svg viewBox="0 0 1440 30" preserveAspectRatio="none">
            <path
              d="M0,0 C60,30 120,30 180,0 C240,30 300,30 360,0 C420,30 480,30 540,0 C600,30 660,30 720,0 C780,30 840,30 900,0 C960,30 1020,30 1080,0 C1140,30 1200,30 1260,0 C1320,30 1380,30 1440,0 L1440,30 L0,30 Z"
              fill="#f1ecf7"
            />
          </svg>
        </div>

        <div className="site-container testimonial-inner">
          <div className="testimonial-card-flex">
            <div className="testimonial-portrait-wrap">
              <div className="portrait-circle">
                <img
                  src={testimonials[activeTestimonialIdx].img}
                  alt={testimonials[activeTestimonialIdx].author}
                />
              </div>
              <span className="watermelon-sticker" title="Gifting love">💌</span>
              <span className="sparkle-sticker">✨</span>
            </div>

            <div className="testimonial-quote-wrap">
              <span className="quote-mark-icon">“</span>
              <p className="testimonial-quote-text">
                {testimonials[activeTestimonialIdx].quote}
              </p>
              <h4 className="testimonial-author-name">
                {testimonials[activeTestimonialIdx].author}
              </h4>
              <span className="testimonial-author-role">
                {testimonials[activeTestimonialIdx].role}
              </span>

              <div className="testimonial-dots-row">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`testimonial-dot ${activeTestimonialIdx === idx ? 'active' : ''}`}
                    onClick={() => setActiveTestimonialIdx(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. POSTAGE STAMP INSTAGRAM & ATELIER DISPATCH FEED */}
      <section className="stamp-insta-section">
        <div className="site-container">
          <div className="section-header-centered gsap-reveal-up" style={{ marginBottom: '32px' }}>
            <span className="section-eyebrow">@MEMENTOBOUTIQUE</span>
            <h2 className="section-title-serif">Atelier Dispatch Moments</h2>
          </div>

          <div className="insta-stamp-grid">
            {INSTA_POSTS.map((post) => (
              <div key={post.id} className="postage-stamp-card" data-tilt>
                <div className="stamp-inner-border">
                  <img src={post.img} alt={post.caption} />
                  <div className="stamp-hover-info">
                    <Heart size={20} fill="#ffffff" color="#ffffff" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. POLKA DOT NEWSLETTER BANNER CARD */}
      <section className="newsletter-banner-card-section">
        <div className="site-container">
          <div className="polka-dot-banner-card">
            {/* Left Cupcake matching Screenshot 4 */}
            <div className="banner-cupcake-wrapper banner-cupcake-left">
              <img
                src="/images/cupcake1.png"
                alt="Strawberry Swirl Cupcake"
                className="banner-cupcake-img"
              />
            </div>

            <div className="banner-center-content">
              <div className="badge-subscribe-now-wrap">
                <span className="badge-subscribe-now">SUBSCRIBE NOW</span>
              </div>
              <h2 className="banner-headline">To Receive Exclusive Offers!</h2>
              <p className="banner-subtext">
                Be the first to know about new collections and exclusive offers.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="banner-form-row">
                <input
                  type="email"
                  placeholder="Your email here"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn-banner-subscribe">
                  SUBSCRIBE <span className="arrow-sym">→</span>
                </button>
              </form>
            </div>

            {/* Right Cupcake matching Screenshot 4 */}
            <div className="banner-cupcake-wrapper banner-cupcake-right">
              <img
                src="/images/cupcake2.png"
                alt="Blue Sprinkle Cupcake"
                className="banner-cupcake-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 12. BLOG STORIES SECTION */}
      <section className="blog-stories-section" id="blog-section">
        <div className="site-container">
          <div className="blog-header-row gsap-reveal-up">
            <div className="blog-title-group">
              <h2 className="section-title-serif">
                The Gifting Journal: Stories & Guides
              </h2>
              <span className="confetti-doodle" aria-hidden="true">🎀 🕊️ ✨</span>
            </div>

            <button
              type="button"
              className="btn-view-blog-page"
              onClick={() => showToast('Opening the Memento Atelier Gifting Journal!')}
            >
              View All Articles
            </button>
          </div>

          <div className="blog-cards-grid gsap-stagger-cards">
            {BLOG_POSTS.map((post) => (
              <article key={post.id} className="blog-post-card" data-tilt>
                <div className="blog-thumb-wrap">
                  <img src={post.image} alt={post.title} />
                  <span className="blog-cat-pill">{post.category}</span>
                </div>
                <div className="blog-card-body">
                  <div className="blog-meta-line">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <button
                    type="button"
                    className="blog-read-more-link"
                    onClick={() => showToast(`Reading "${post.title}"`)}
                  >
                    Read Journal Article →
                  </button>
                </div>
              </article>
            ))}
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
                <h2>{quickViewProduct.name}</h2>
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

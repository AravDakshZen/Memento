import React, { useState, useEffect } from 'react';
import {
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  Send
} from 'lucide-react';
import { useCart } from '../context/CartContext';

// Clean SVG social icons
const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useCart();
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    showToast(`🎀 Subscribed ${newsletterEmail}! Check your inbox for 20% off.`);
    setNewsletterEmail('');
  };

  return (
    <footer className="memento-footer">
      <div className="site-container footer-content-wrap">
        <div className="footer-columns-grid">
          {/* Column 1: Store Intro */}
          <div className="footer-col col-brand">
            <h3 className="footer-brand-title">Memento</h3>
            <p className="footer-description">
              Welcome to Memento, an haute gifting atelier dedicated to curated keepsake hampers, French satin ribbons, and bespoke celebratory memories.
            </p>
            <p className="store-hours-note">
              Our gifting concierges are always at your service to craft bespoke moments.
            </p>
            <span className="business-hours">Atelier Hours: Monday – Saturday 9am – 7pm EST</span>

            <div className="footer-social-wrap">
              <span className="social-label">FOLLOW ON:</span>
              <div className="social-icon-links">
                <a href="#facebook" aria-label="Facebook" className="social-circle">
                  <FacebookIcon />
                </a>
                <a href="#instagram" aria-label="Instagram" className="social-circle">
                  <InstagramIcon />
                </a>
                <a href="#twitter" aria-label="Twitter" className="social-circle">
                  <TwitterIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: The Shop / Information */}
          <div className="footer-col">
            <h4 className="footer-col-title">THE SHOP</h4>
            <ul className="footer-nav-list">
              <li>
                <button type="button" onClick={() => navigateTo('/products')}>
                  All Products
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/gifts')}>
                  Curated Gift Hampers
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/cakes')}>
                  Artisanal Cakes & Muffins
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/keepsakes')}>
                  Keepsakes & Party Items
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/cart')}>
                  Shopping Bag
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: More Info / Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">CUSTOMER CARE</h4>
            <ul className="footer-nav-list">
              <li>
                <button type="button" onClick={() => navigateTo('/my-account')}>
                  My Account
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('blog-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else navigateTo('/');
                  }}
                >
                  The Gifting Gazette (Blog)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/privacy-policy')}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/terms-and-conditions')}>
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="footer-col" id="footer-contact">
            <h4 className="footer-col-title">CONTACT</h4>
            <ul className="contact-details-list">
              <li>
                <MapPin size={16} className="contact-bullet-icon" />
                <span>282 Maple Street Toronto, Ontario M1A 1A1 Canada</span>
              </li>
              <li>
                <Mail size={16} className="contact-bullet-icon" />
                <span>info@memento.com</span>
              </li>
              <li>
                <Phone size={16} className="contact-bullet-icon" />
                <span>+1 555-123-4567</span>
              </li>
            </ul>

            <div className="footer-mini-newsletter">
              <span className="newsletter-subtitle">For News & Special Offers</span>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-inline-form">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" aria-label="Subscribe">
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-footer Copyright Bar */}
      <div className="sub-footer-bar">
        <div className="site-container sub-footer-inner">
          <p className="copyright-text">
            © 2026 <strong>Memento Haute Gifting Atelier</strong> • All Rights Reserved
          </p>
          <div className="sub-footer-social">
            <span className="circle-icon"><FacebookIcon /></span>
            <span className="circle-icon"><InstagramIcon /></span>
            <span className="circle-icon"><TwitterIcon /></span>
          </div>
        </div>
      </div>

      {/* Floating Rose Terracotta TOP button */}
      {showTopBtn && (
        <button
          type="button"
          className="floating-top-button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} />
          <span>TOP</span>
        </button>
      )}
    </footer>
  );
};

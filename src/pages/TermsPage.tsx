import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, CreditCard, Truck, RotateCcw, AlertTriangle, Scale, Gavel } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const TermsPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.tc-hero-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
      gsap.fromTo('.tc-section-card', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.tc-content-area', start: 'top 85%' }
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="legal-page terms-page" ref={pageRef}>
      <section className="legal-hero-banner">
        <div className="site-container tc-hero-content">
          <span className="section-eyebrow">LEGAL</span>
          <h1 className="section-title-cormorant">Terms & Conditions</h1>
          <p className="legal-updated">Last Updated: October 1, 2026</p>
        </div>
      </section>

      <section className="legal-content-section tc-content-area">
        <div className="site-container legal-content-container">
          <div className="tc-section-card">
            <div className="pp-icon-circle"><FileText size={22} /></div>
            <h2>1. General Terms</h2>
            <p>By accessing and using the Memento website (memento.com), you agree to be bound by these Terms & Conditions. These terms apply to all visitors, users, and customers of our website and services.</p>
            <ul>
              <li>You must be at least 18 years old or have parental/guardian consent to make purchases.</li>
              <li>You agree to provide accurate, complete, and current information when creating an account or placing orders.</li>
              <li>We reserve the right to refuse service, terminate accounts, or cancel orders at our discretion.</li>
              <li>These terms may be updated periodically; continued use constitutes acceptance of changes.</li>
            </ul>
          </div>

          <div className="tc-section-card">
            <div className="pp-icon-circle"><CreditCard size={22} /></div>
            <h2>2. Orders & Payments</h2>
            <p>All orders are subject to availability and confirmation. Payment is required at the time of order placement.</p>
            <ul>
              <li>Prices are displayed in USD and are inclusive of applicable taxes unless stated otherwise.</li>
              <li>We accept Visa, MasterCard, American Express, PayPal, and Apple Pay.</li>
              <li>Custom calligraphy, monogram engraving, and wax seal orders require 24–48 hours of additional lead time.</li>
              <li>Order confirmation emails will be sent within 30 minutes of successful payment processing.</li>
              <li>We reserve the right to cancel orders if pricing errors are detected or if items are out of stock.</li>
            </ul>
          </div>

          <div className="tc-section-card">
            <div className="pp-icon-circle"><Truck size={22} /></div>
            <h2>3. Shipping & Delivery</h2>
            <p>We offer multiple shipping options to ensure your gifts arrive beautifully and on time:</p>
            <ul>
              <li><strong>Standard Delivery:</strong> 5–7 business days. Free for orders over $300.</li>
              <li><strong>Express Delivery:</strong> 2–3 business days. Flat rate of $15.</li>
              <li><strong>Same-Day Climate-Controlled Courier:</strong> Available in select metro areas for perishable items. $25.</li>
              <li>Fresh confections and perishable items are shipped Monday through Thursday to avoid weekend carrier delays.</li>
              <li>International shipping is available to select countries. Custom duties and import taxes are the responsibility of the buyer.</li>
              <li>Delivery estimates begin from the date of dispatch, not the date of order placement.</li>
            </ul>
          </div>

          <div className="tc-section-card">
            <div className="pp-icon-circle"><RotateCcw size={22} /></div>
            <h2>4. Returns & Refunds</h2>
            <p>Your satisfaction is paramount. Our return policy is as follows:</p>
            <ul>
              <li><strong>Non-Perishable Items:</strong> May be returned within 14 days of delivery in original, unopened condition for a full refund.</li>
              <li><strong>Perishable Items (Cakes, Confections):</strong> Due to their nature, perishable items are non-returnable. Contact us within 24 hours of delivery if the item arrives damaged.</li>
              <li><strong>Personalized/Custom Items:</strong> Items with custom calligraphy, monograms, or wax seals are non-returnable unless defective.</li>
              <li>Return shipping costs are the responsibility of the customer unless the return is due to our error.</li>
              <li>Refunds will be processed to the original payment method within 5–10 business days of receiving the return.</li>
            </ul>
          </div>

          <div className="tc-section-card">
            <div className="pp-icon-circle"><AlertTriangle size={22} /></div>
            <h2>5. Product Information</h2>
            <p>We strive to display our products as accurately as possible:</p>
            <ul>
              <li>Product colors may vary slightly from screen displays due to monitor settings and lighting conditions.</li>
              <li>Handcrafted items may have minor variations that add to their artisanal character.</li>
              <li>Allergen information is provided for all food items. Please review before purchasing if you have dietary restrictions.</li>
              <li>Product dimensions and weights listed are approximate and may vary slightly.</li>
            </ul>
          </div>

          <div className="tc-section-card">
            <div className="pp-icon-circle"><Scale size={22} /></div>
            <h2>6. Intellectual Property</h2>
            <p>All content on the Memento website is protected by intellectual property laws:</p>
            <ul>
              <li>All text, images, logos, product designs, and graphic elements are owned by Memento or used under license.</li>
              <li>Reproduction, distribution, or use of our content without written permission is prohibited.</li>
              <li>User-submitted content (reviews, photos) grants Memento a non-exclusive license for promotional use.</li>
            </ul>
          </div>

          <div className="tc-section-card">
            <div className="pp-icon-circle"><Gavel size={22} /></div>
            <h2>7. Governing Law & Disputes</h2>
            <p>These terms are governed by the laws of the Province of Ontario, Canada:</p>
            <ul>
              <li>Any disputes arising from these terms or your use of our website shall be resolved through negotiation first.</li>
              <li>If negotiation fails, disputes will be submitted to binding arbitration in Toronto, Ontario.</li>
              <li>Our liability is limited to the purchase price of the products ordered.</li>
            </ul>
            <div className="contact-details-legal">
              <p><strong>Questions?</strong> Contact us at legal@memento.com or +1 555-123-4567.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

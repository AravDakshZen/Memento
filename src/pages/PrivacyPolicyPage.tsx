import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Eye, Lock, Database, UserCheck, Globe, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const PrivacyPolicyPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.pp-hero-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
      gsap.fromTo('.pp-section-card', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.pp-content-area', start: 'top 85%' }
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="legal-page privacy-policy-page" ref={pageRef}>
      <section className="legal-hero-banner">
        <div className="site-container pp-hero-content">
          <span className="section-eyebrow">LEGAL</span>
          <h1 className="section-title-cormorant">Privacy Policy</h1>
          <p className="legal-updated">Last Updated: October 1, 2026</p>
        </div>
      </section>

      <section className="legal-content-section pp-content-area">
        <div className="site-container legal-content-container">
          <div className="pp-section-card">
            <div className="pp-icon-circle"><Shield size={22} /></div>
            <h2>1. Information We Collect</h2>
            <p>At Memento, we collect information to provide you with the best luxury gifting experience possible. This includes:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, shipping and billing addresses provided during checkout or account creation.</li>
              <li><strong>Order Details:</strong> Gift messages, calligraphy text, monogram initials, packaging preferences, and product selections.</li>
              <li><strong>Payment Information:</strong> Credit card details are processed securely through our PCI-compliant payment partners. We do not store full card numbers.</li>
              <li><strong>Usage Data:</strong> Browsing patterns, page visits, and interaction data to improve our website experience.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, IP address, and device identifiers.</li>
            </ul>
          </div>

          <div className="pp-section-card">
            <div className="pp-icon-circle"><Eye size={22} /></div>
            <h2>2. How We Use Your Information</h2>
            <p>We use collected information for the following purposes:</p>
            <ul>
              <li>Processing and fulfilling your orders, including gift customization and calligraphy services.</li>
              <li>Communicating order status, shipping updates, and delivery confirmations.</li>
              <li>Personalizing your shopping experience with curated product recommendations.</li>
              <li>Sending promotional emails about new collections, seasonal offerings, and exclusive discounts (with your consent).</li>
              <li>Improving our website functionality, product offerings, and customer service.</li>
              <li>Preventing fraud and ensuring the security of transactions.</li>
            </ul>
          </div>

          <div className="pp-section-card">
            <div className="pp-icon-circle"><Lock size={22} /></div>
            <h2>3. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal information:</p>
            <ul>
              <li>SSL/TLS encryption for all data transmitted between your browser and our servers.</li>
              <li>PCI DSS compliant payment processing through trusted third-party providers.</li>
              <li>Regular security audits and vulnerability assessments.</li>
              <li>Access controls limiting employee access to personal data on a need-to-know basis.</li>
              <li>Secure data storage with encryption at rest.</li>
            </ul>
          </div>

          <div className="pp-section-card">
            <div className="pp-icon-circle"><Database size={22} /></div>
            <h2>4. Cookies & Tracking</h2>
            <p>Our website uses cookies and similar technologies to enhance your experience:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for basic site functionality, shopping cart, and checkout process.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website to improve design and usability.</li>
              <li><strong>Preference Cookies:</strong> Remember your language, currency, and display preferences.</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and measure campaign effectiveness.</li>
            </ul>
            <p>You can manage cookie preferences through your browser settings at any time.</p>
          </div>

          <div className="pp-section-card">
            <div className="pp-icon-circle"><UserCheck size={22} /></div>
            <h2>5. Your Rights</h2>
            <p>You have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Update or correct inaccurate personal information.</li>
              <li><strong>Deletion:</strong> Request the deletion of your personal data, subject to legal obligations.</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time via email preferences or the unsubscribe link in our emails.</li>
              <li><strong>Data Portability:</strong> Request your data in a machine-readable format.</li>
            </ul>
          </div>

          <div className="pp-section-card">
            <div className="pp-icon-circle"><Globe size={22} /></div>
            <h2>6. Third-Party Sharing</h2>
            <p>We do not sell your personal data. We may share information with:</p>
            <ul>
              <li>Shipping carriers for order delivery and tracking.</li>
              <li>Payment processors for secure transaction handling.</li>
              <li>Analytics providers to improve our website performance.</li>
              <li>Legal authorities when required by law or to protect our rights.</li>
            </ul>
          </div>

          <div className="pp-section-card">
            <div className="pp-icon-circle"><Mail size={22} /></div>
            <h2>7. Contact Us</h2>
            <p>If you have questions about this privacy policy or wish to exercise your data rights, please contact us:</p>
            <div className="contact-details-legal">
              <p><strong>Email:</strong> privacy@memento.com</p>
              <p><strong>Phone:</strong> +1 555-123-4567</p>
              <p><strong>Address:</strong> 282 Maple Street, Toronto, Ontario M1A 1A1, Canada</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

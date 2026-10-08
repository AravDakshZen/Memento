import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { User, Package, Heart, MapPin, CreditCard, LogOut, ChevronRight, Star, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ALL_PRODUCTS } from '../data/products';

export const MyAccountPage: React.FC = () => {
  const { cartSubtotal, wishlist, navigateTo, setActiveProduct } = useCart();
  const [activeTab, setActiveTab] = useState('dashboard');
  const pageRef = useRef<HTMLDivElement>(null);

  const wishlistProducts = ALL_PRODUCTS.filter(p => wishlist.includes(p.id));

  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.account-hero-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
      gsap.fromTo('.account-main-content', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const renderDashboard = () => (
    <div className="account-dashboard">
      <div className="dashboard-greeting">
        <div className="avatar-circle">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Profile" />
        </div>
        <div>
          <h2>Welcome back, Sarah!</h2>
          <p>Member since October 2026</p>
        </div>
      </div>

      <div className="dashboard-stats-grid">
        <div className="stat-card">
          <Package size={24} />
          <div>
            <span className="stat-number">3</span>
            <span className="stat-label">Orders</span>
          </div>
        </div>
        <div className="stat-card">
          <Heart size={24} />
          <div>
            <span className="stat-number">{wishlist.length}</span>
            <span className="stat-label">Wishlist</span>
          </div>
        </div>
        <div className="stat-card">
          <Star size={24} />
          <div>
            <span className="stat-number">150</span>
            <span className="stat-label">Reward Points</span>
          </div>
        </div>
        <div className="stat-card">
          <CreditCard size={24} />
          <div>
            <span className="stat-number">${cartSubtotal.toFixed(0)}</span>
            <span className="stat-label">Cart Value</span>
          </div>
        </div>
      </div>

      <div className="recent-orders-section">
        <h3>Recent Orders</h3>
        <div className="order-card">
          <div className="order-header">
            <span className="order-id">#MEM-2026-1001</span>
            <span className="order-status delivered">Delivered</span>
          </div>
          <div className="order-details">
            <p>The Rosé Velvet Keepsake Hamper × 1</p>
            <p className="order-date">October 2, 2026</p>
          </div>
          <div className="order-total">$148.00</div>
        </div>
        <div className="order-card">
          <div className="order-header">
            <span className="order-id">#MEM-2026-0998</span>
            <span className="order-status processing">Processing</span>
          </div>
          <div className="order-details">
            <p>Blue Forest Keepsake Confection × 2</p>
            <p className="order-date">October 5, 2026</p>
          </div>
          <div className="order-total">$44.00</div>
        </div>
        <div className="order-card">
          <div className="order-header">
            <span className="order-id">#MEM-2026-0985</span>
            <span className="order-status delivered">Delivered</span>
          </div>
          <div className="order-details">
            <p>Golden Jubilee Celebration Trunk × 1</p>
            <p className="order-date">September 28, 2026</p>
          </div>
          <div className="order-total">$210.00</div>
        </div>
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="account-wishlist">
      <h3>My Wishlist ({wishlistProducts.length} items)</h3>
      {wishlistProducts.length === 0 ? (
        <div className="empty-state">
          <Heart size={48} />
          <p>Your wishlist is empty. Start exploring our collection!</p>
          <button type="button" className="btn-explore" onClick={() => navigateTo('/products')}>Browse Products</button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistProducts.map(product => (
            <div key={product.id} className="wishlist-item-card">
              <img src={product.image} alt={product.name} onClick={() => {
                setActiveProduct(product);
                navigateTo('/product/' + product.slug);
              }} />
              <div className="wishlist-item-info">
                <h4>{product.name}</h4>
                <span className="wishlist-price">${product.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAddresses = () => (
    <div className="account-addresses">
      <h3>Saved Addresses</h3>
      <div className="address-card default-address">
        <span className="default-badge">Default</span>
        <h4>Sarah Laurent</h4>
        <p>282 Maple Street</p>
        <p>Toronto, Ontario M1A 1A1</p>
        <p>Canada</p>
        <p>+1 555-123-4567</p>
        <div className="address-actions">
          <button type="button">Edit</button>
          <button type="button">Delete</button>
        </div>
      </div>
      <button type="button" className="btn-add-address">+ Add New Address</button>
    </div>
  );

  const renderSettings = () => (
    <div className="account-settings">
      <h3>Account Settings</h3>
      <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" defaultValue="Sarah" />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" defaultValue="Laurent" />
          </div>
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" defaultValue="sarah@memento.com" />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" defaultValue="+1 555-123-4567" />
        </div>
        <h4>Change Password</h4>
        <div className="form-group">
          <label>Current Password</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>New Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
        </div>
        <button type="submit" className="btn-save-settings">Save Changes</button>
      </form>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <User size={18} /> },
    { id: 'orders', label: 'Orders', icon: <Package size={18} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={18} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="my-account-page" ref={pageRef}>
      <section className="legal-hero-banner account-hero">
        <div className="site-container account-hero-content">
          <span className="section-eyebrow">MY ACCOUNT</span>
          <h1 className="section-title-cormorant">My Memento</h1>
          <p className="section-lead-subtitle">Manage your orders, wishlist, and account settings.</p>
        </div>
      </section>

      <section className="account-content-section">
        <div className="site-container account-layout account-main-content">
          <aside className="account-sidebar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <ChevronRight size={14} className="tab-arrow" />
              </button>
            ))}
            <button type="button" className="sidebar-tab logout-tab">
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </aside>

          <main className="account-main-panel">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'orders' && renderDashboard()}
            {activeTab === 'wishlist' && renderWishlist()}
            {activeTab === 'addresses' && renderAddresses()}
            {activeTab === 'settings' && renderSettings()}
          </main>
        </div>
      </section>
    </div>
  );
};

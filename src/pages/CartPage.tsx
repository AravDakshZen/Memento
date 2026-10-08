import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Trash2, ShoppingBag, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    discount,
    applyCoupon,
    couponCode,
    setActivePage,
    setActiveProduct,
    showToast
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState(couponCode || '');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  useEffect(() => {
    if (window.location.pathname.includes('checkout') && cart.length > 0) {
      setIsCheckoutModalOpen(true);
    }
  }, [cart.length]);

  useEffect(() => {
    if (isCheckoutModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCheckoutModalOpen]);

  const shippingCost = cartSubtotal >= 300 || cartSubtotal === 0 ? 0 : shippingMethod === 'standard' ? 5.00 : 15.00;
  const grandTotal = Math.max(0, cartSubtotal - discount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    applyCoupon(inputCoupon);
  };

  const handleProceedCheckout = () => {
    if (cart.length === 0) {
      showToast('Your cart is empty! Add sweet items first.');
      return;
    }
    setIsCheckoutModalOpen(true);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutComplete(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f5899e', '#8266b7', '#ffd166', '#a0c4ff', '#ffc6ff']
    });
    setTimeout(() => {
      clearCart();
    }, 1500);
  };

  return (
    <div className="memento-cart-page">
      {/* 1. SOFT PINK BANNER WITH FLOATING HEARTS */}
      <section className="cart-hero-banner">
        <div className="cart-banner-hearts" aria-hidden="true">
          <span className="heart-floater h1">♡</span>
          <span className="heart-floater h2">♥</span>
          <span className="heart-floater h3">♡</span>
          <span className="heart-floater h4">♥</span>
          <span className="heart-floater h5">♡</span>
          <span className="heart-floater h6">♥</span>
        </div>

        <div className="site-container cart-banner-inner">
          <div className="cart-title-group">
            <h1 className="cart-main-title">Cart</h1>
            {/* Curved pink flourish doodle underline */}
            <svg className="curved-title-swirl" width="70" height="18" viewBox="0 0 70 18" fill="none">
              <path
                d="M3 14C22 5 45 6 67 15"
                stroke="#f5899e"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="cart-breadcrumbs">
            <button
              type="button"
              className="crumb-btn"
              onClick={() => setActivePage('home')}
            >
              Home
            </button>
            <span className="crumb-heart-sep">♥</span>
            <span className="crumb-active">Cart</span>
          </div>
        </div>
      </section>

      {/* 2. CART CONTENT SECTION */}
      <section className="cart-table-section">
        <div className="site-container">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-cart-icon-circle">
                <ShoppingBag size={48} className="empty-bag-icon" />
              </div>
              <h2>Your Memento Shopping Cart is Empty</h2>
              <p>Looks like you haven't added any sweet treats or gift boxes yet!</p>
              <button
                type="button"
                className="btn-back-to-shop"
                onClick={() => setActivePage('home')}
              >
                Explore Delicious Sweets & Gifts →
              </button>
            </div>
          ) : (
            <div className="cart-layout-container">
              {/* Left/Main: Products Table */}
              <div className="cart-table-wrapper">
                <table className="memento-cart-table">
                  <thead>
                    <tr>
                      <th className="th-product">PRODUCT</th>
                      <th className="th-price">UNIT PRICE</th>
                      <th className="th-quantity">QUANTITY</th>
                      <th className="th-total">TOTAL</th>
                      <th className="th-action"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.product.id} className="cart-item-row">
                        <td className="td-product">
                          <div className="cart-product-cell">
                            <div
                              className="cart-thumb-box"
                              onClick={() => {
                                setActiveProduct(item.product);
                                setActivePage('product');
                              }}
                            >
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                              />
                            </div>
                            <span
                              className="cart-product-title"
                              onClick={() => {
                                setActiveProduct(item.product);
                                setActivePage('product');
                              }}
                            >
                              {item.product.name}
                            </span>
                          </div>
                        </td>

                        <td className="td-price">
                          <span className="cart-unit-price">
                            ${item.product.price.toFixed(2)}
                          </span>
                        </td>

                        <td className="td-quantity">
                          <div className="quantity-box-input">
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.product.id,
                                  parseInt(e.target.value) || 1
                                )
                              }
                            />
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td className="td-total">
                          <span className="cart-line-total">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </td>

                        <td className="td-action">
                          <button
                            type="button"
                            className="btn-remove-item"
                            onClick={() => removeFromCart(item.product.id)}
                            title="Remove item"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Table Bottom Action Row */}
                <div className="cart-bottom-actions-row">
                  <button
                    type="button"
                    className="link-continue-shopping"
                    onClick={() => setActivePage('home')}
                  >
                    Continue Shopping
                  </button>

                  <button
                    type="button"
                    className="btn-update-cart"
                    onClick={() => showToast('Cart has been updated successfully!')}
                  >
                    Update Cart
                  </button>
                </div>

                {/* Coupon Code Input */}
                <div className="cart-coupon-card">
                  <div className="coupon-info">
                    <h4>Have a promotional code?</h4>
                    <p>Use code <strong>MEMENTO20</strong> for 20% off or <strong>SWEET10</strong> for 10% off!</p>
                  </div>
                  <form onSubmit={handleApplyCoupon} className="coupon-input-form">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                    />
                    <button type="submit" className="btn-apply-coupon">
                      Apply Coupon
                    </button>
                  </form>
                </div>
              </div>

              {/* Right: Cart Summary / Order Totals */}
              <div className="cart-summary-sidebar">
                <div className="order-summary-box">
                  <h3 className="summary-title">Cart Totals</h3>

                  <div className="summary-line-item">
                    <span>Subtotal</span>
                    <span className="val-subtotal">${cartSubtotal.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="summary-line-item discount-line">
                      <span>Coupon Discount ({couponCode})</span>
                      <span className="val-discount">-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="summary-shipping-block">
                    <div className="shipping-title-row">
                      <span>Shipping</span>
                      <span>
                        {shippingCost === 0 ? (
                          <strong className="free-shipping-tag">FREE</strong>
                        ) : (
                          `$${shippingCost.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="shipping-options-radio">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                        />
                        <span>Standard Delivery ($5.00 / Free over $300)</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                        />
                        <span>Express Boutique Courier ($15.00)</span>
                      </label>
                    </div>
                  </div>

                  <div className="summary-divider"></div>

                  <div className="summary-line-item total-grand-line">
                    <span>Total</span>
                    <span className="val-grand-total">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="btn-proceed-checkout"
                    onClick={handleProceedCheckout}
                  >
                    Proceed to Checkout
                  </button>

                  <div className="boutique-guarantee-note">
                    <ShieldCheck size={16} className="shield-icon" />
                    <span>Safe & Encrypted Checkout • Girly Aesthetic Packaging</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Checkout Modal rendered into document.body */}
      {isCheckoutModalOpen && createPortal(
        <div className="modal-backdrop" onClick={() => !checkoutComplete && setIsCheckoutModalOpen(false)}>
          <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
            {checkoutComplete ? (
              <div className="checkout-success-view">
                <div className="success-sparkle-circle">
                  <Sparkles size={40} className="sparkle-anim" />
                </div>
                <h2>Order Confirmed! 🎀</h2>
                <p className="order-number">Order #MEMENTO-{Math.floor(100000 + Math.random() * 900000)}</p>
                <p className="order-message">
                  Thank you for shopping at Memento & Memento! Your sweet packages are being delicately wrapped with satin ribbons and pink tissue.
                </p>
                <div className="order-summary-pill">
                  <span>Total Paid: <strong>${grandTotal.toFixed(2)}</strong></span>
                </div>
                <button
                  type="button"
                  className="btn-return-home"
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setCheckoutComplete(false);
                    setActivePage('home');
                  }}
                >
                  Return to Boutique Home →
                </button>
              </div>
            ) : (
              <div className="checkout-form-view">
                <div className="checkout-header-row">
                  <h3>Memento Express Checkout</h3>
                  <button
                    type="button"
                    className="close-btn"
                    onClick={() => setIsCheckoutModalOpen(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="checkout-order-preview">
                  <span>{cart.length} item(s) in bag</span>
                  <strong>Total: ${grandTotal.toFixed(2)}</strong>
                </div>

                <form onSubmit={handleCompleteOrder} className="checkout-form">
                  <div className="form-group-row">
                    <div className="form-col">
                      <label>First Name</label>
                      <input type="text" defaultValue="Lola" required />
                    </div>
                    <div className="form-col">
                      <label>Last Name</label>
                      <input type="text" defaultValue="Rose" required />
                    </div>
                  </div>

                  <div className="form-col full">
                    <label>Shipping Address</label>
                    <input type="text" defaultValue="77 Sweet Blossom Blvd, Suite 4" required />
                  </div>

                  <div className="form-group-row">
                    <div className="form-col">
                      <label>City</label>
                      <input type="text" defaultValue="Toronto" required />
                    </div>
                    <div className="form-col">
                      <label>Postal Code</label>
                      <input type="text" defaultValue="M5V 2T6" required />
                    </div>
                  </div>

                  <div className="form-col full">
                    <label>Card Number</label>
                    <input type="text" defaultValue="4242 •••• •••• 4242" required />
                  </div>

                  <div className="form-group-row">
                    <div className="form-col">
                      <label>Expiry</label>
                      <input type="text" defaultValue="12/28" required />
                    </div>
                    <div className="form-col">
                      <label>CVC</label>
                      <input type="text" defaultValue="888" required />
                    </div>
                  </div>

                  <button type="submit" className="btn-complete-payment">
                    Pay ${grandTotal.toFixed(2)} & Confirm Order 🎁
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

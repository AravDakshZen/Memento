import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    setActivePage
  } = useCart();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartDrawerOpen(false)}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-group">
            <ShoppingBag size={20} className="drawer-icon" />
            <h3>Your Shopping Bag ({cart.length})</h3>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setIsCartDrawerOpen(false)}
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="drawer-empty-body">
            <p>Your bag is currently empty.</p>
            <button
              type="button"
              className="drawer-shop-btn"
              onClick={() => {
                setIsCartDrawerOpen(false);
                setActivePage('home');
              }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="drawer-items-list">
              {cart.map((item) => (
                <div key={item.product.id} className="drawer-item-row">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="drawer-item-thumb"
                  />
                  <div className="drawer-item-info">
                    <h4 className="drawer-item-name">{item.product.name}</h4>
                    <span className="drawer-item-price">
                      ${item.product.price.toFixed(2)}
                    </span>
                    <div className="drawer-qty-row">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="drawer-remove-btn"
                    onClick={() => removeFromCart(item.product.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="drawer-footer">
              <div className="drawer-subtotal-row">
                <span>Subtotal:</span>
                <strong>${cartSubtotal.toFixed(2)}</strong>
              </div>
              <p className="drawer-shipping-hint">
                {cartSubtotal >= 300
                  ? '🎉 You qualify for FREE shipping!'
                  : `Add $${(300 - cartSubtotal).toFixed(2)} more for FREE shipping!`}
              </p>
              <div className="drawer-buttons-group">
                <button
                  type="button"
                  className="btn-drawer-view-cart"
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setActivePage('cart');
                  }}
                >
                  View Full Cart
                </button>
                <button
                  type="button"
                  className="btn-drawer-checkout"
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setActivePage('cart');
                  }}
                >
                  Checkout Now <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

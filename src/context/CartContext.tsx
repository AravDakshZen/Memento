import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Product, CartItem } from '../types';
import { MAIN_PRODUCT, CART_DEFAULT_ITEMS } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  discount: number;
  applyCoupon: (code: string) => boolean;
  couponCode: string;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  // Routing-aware navigation
  navigateTo: (path: string) => void;
  activeProduct: Product;
  setActiveProduct: (product: Product) => void;
  toast: string | null;
  showToast: (msg: string) => void;
  showPreloader: boolean;
  setShowPreloader: (show: boolean) => void;
  preloaderVideoUrl: string;
  setPreloaderVideoUrl: (url: string) => void;
  // Legacy compat
  activePage: string;
  setActivePage: (page: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('memento_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return CART_DEFAULT_ITEMS;
      }
    }
    return CART_DEFAULT_ITEMS;
  });

  const [wishlist, setWishlist] = useState<string[]>(['prod-encouragement']);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product>(MAIN_PRODUCT);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [toast, setToast] = useState<string | null>(null);
  const [showPreloader, setShowPreloader] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('nopreload') === 'true') return false;
    }
    return true;
  });
  const [preloaderVideoUrl, setPreloaderVideoUrl] = useState<string>('/videos/preloader.mp4');

  useEffect(() => {
    localStorage.setItem('memento_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Derive activePage from URL for backward compat
  const getActivePage = (): string => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/products') return 'products';
    if (path.startsWith('/product/')) return 'product';
    if (path === '/cart') return 'cart';
    if (path === '/checkout') return 'checkout';
    if (path === '/my-account') return 'myaccount';
    if (path === '/privacy-policy') return 'privacypolicy';
    if (path === '/terms-and-conditions') return 'termsandconditions';
    return 'home';
  };

  const setActivePage = (page: string) => {
    const pageRoutes: Record<string, string> = {
      'home': '/',
      'product': '/product/' + activeProduct.slug,
      'products': '/products',
      'cart': '/cart',
      'checkout': '/checkout',
      'myaccount': '/my-account',
      'privacypolicy': '/privacy-policy',
      'termsandconditions': '/terms-and-conditions',
    };
    const route = pageRoutes[page] || '/';
    navigateTo(route);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.name}" to cart! 🛍️✨`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart.');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to your wishlist! 💖');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'MEMENTO20' || clean === 'CHRISTMAS20') {
      setDiscountPercent(0.2);
      setCouponCode(clean);
      showToast('🎀 20% discount coupon applied successfully!');
      return true;
    } else if (clean === 'SWEET10') {
      setDiscountPercent(0.1);
      setCouponCode(clean);
      showToast('🎀 10% discount coupon applied successfully!');
      return true;
    } else {
      showToast('Invalid coupon code. Try "MEMENTO20" for 20% off!');
      return false;
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const discount = cartSubtotal * discountPercent;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        discount,
        applyCoupon,
        couponCode,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        navigateTo,
        activeProduct,
        setActiveProduct,
        toast,
        showToast,
        showPreloader,
        setShowPreloader,
        preloaderVideoUrl,
        setPreloaderVideoUrl,
        activePage: getActivePage(),
        setActivePage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

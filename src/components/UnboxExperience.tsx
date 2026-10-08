import React, { useState } from 'react';
import { Sparkles, Gift, RotateCcw, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { ALL_PRODUCTS } from '../data/products';
import type { Product } from '../types';

export const UnboxExperience: React.FC = () => {
  const { addToCart, showToast, navigateTo, setActiveProduct } = useCart();
  const [isUnboxed, setIsUnboxed] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [activeSealColor, setActiveSealColor] = useState('#d13e63');
  const [stampText, setStampText] = useState('M');
  const [isStamping, setIsStamping] = useState(false);

  // Helper to pick 3 random items
  const getRandomTrio = (): Product[] => {
    const shuffled = [...ALL_PRODUCTS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const [mysteryItems, setMysteryItems] = useState<Product[]>(() => getRandomTrio());

  const handleUnbox = () => {
    setIsUnboxed(true);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#f5899e', '#ffd166', '#8266b7', '#fdf2f4']
    });
  };

  const handleReroll = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setMysteryItems(getRandomTrio());
      setIsShuffling(false);
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffd166', '#f5899e', '#8266b7']
      });
      showToast('🎁 3 new surprise boutique gifts revealed!');
    }, 350);
  };

  const handleAddAllToCart = () => {
    mysteryItems.forEach((item) => {
      addToCart(item, 1);
    });
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f5899e', '#ffd166', '#8266b7', '#a0c4ff']
    });
    showToast('✨ Splendid! Added all 3 surprise atelier gifts to your shopping bag.');
  };

  const handleStamp = () => {
    setIsStamping(true);
    setTimeout(() => {
      setIsStamping(false);
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.75 },
        colors: ['#ffd166', '#d13e63']
      });
    }, 600);
  };

  const totalBundlePrice = mysteryItems.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <section className="unbox-experience-section" id="atelier-experience">
      <div className="site-container">
        <div className="unbox-header-center">
          <span className="atelier-pill-tag">
            <Sparkles size={13} /> The Memento Atelier Experience
          </span>
          <h2 className="section-title-serif">
            The Magic of Unboxing a Memento
          </h2>
          <p className="unbox-lead-text">
            Experience the excitement of a bespoke surprise trunk! Unbox to discover 3 curated boutique gifts hand-selected for you. Love the trio? Add them straight to your bag, or unwrap another surprise trio!
          </p>
        </div>

        <div className="unbox-interactive-stage">
          {/* Unbox Card Container */}
          <div className="unbox-card-canvas" data-tilt>
            <div className={`gift-box-3d-model ${isUnboxed ? 'opened' : 'closed'}`}>
              {/* Lid & Ribbon */}
              <div className="box-lid">
                <div className="silk-ribbon-cross horizontal" />
                <div className="silk-ribbon-cross vertical" />
                <div className="satin-bow-knot">
                  <div className="bow-loop loop-left" />
                  <div className="bow-center-pearl" />
                  <div className="bow-loop loop-right" />
                  <div className="bow-tail tail-left" />
                  <div className="bow-tail tail-right" />
                </div>
              </div>

              {/* Box Base Interior */}
              <div className="box-base-interior">
                <div className="rose-tissue-layer">
                  {/* Revealed Keepsake Items */}
                  <div className={`revealed-items-grid ${isShuffling ? 'shuffling-pulse' : ''}`}>
                    {mysteryItems.map((item, idx) => (
                      <div
                        key={item.id + '-' + idx}
                        className={`revealed-item item-${idx + 1}`}
                        onClick={() => {
                          setActiveProduct(item);
                          navigateTo('/product/' + item.slug);
                        }}
                        title={`Click to view ${item.name}`}
                      >
                        <div className="item-pedestal-glow" />
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cutout-floating-img"
                        />
                        <span className="revealed-item-cat">{item.category}</span>
                        <span className="revealed-item-title">{item.name}</span>
                        <span className="revealed-item-price">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mystery Bundle Summary & Action Controls */}
            <div className="unbox-control-panel">
              {!isUnboxed ? (
                <button
                  type="button"
                  className="btn-unbox-trigger"
                  onClick={handleUnbox}
                  data-cursor="UNWRAP"
                >
                  <Gift size={18} /> Untie The French Ribbon & Reveal 3 Gifts
                </button>
              ) : (
                <div className="mystery-trio-summary-box">
                  <div className="mystery-trio-pricing">
                    <span className="mystery-trio-label">Surprise Trio Bundle Value:</span>
                    <span className="mystery-trio-total">${totalBundlePrice.toFixed(2)}</span>
                  </div>

                  <div className="mystery-trio-actions-row">
                    <button
                      type="button"
                      className="btn-add-mystery-bundle"
                      onClick={handleAddAllToCart}
                    >
                      <ShoppingBag size={17} /> Add All 3 to Cart
                    </button>

                    <button
                      type="button"
                      className="btn-reroll-mystery"
                      onClick={handleReroll}
                      disabled={isShuffling}
                    >
                      <RotateCcw size={15} className={isShuffling ? 'spin-anim' : ''} />
                      {isShuffling ? 'Unwrapping New Trio...' : 'Try Again with 3 Other Gifts'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Wax Stamping Station Micro-Interaction */}
          <div className="wax-stamp-station-card">
            <div className="stamp-station-header">
              <span className="stamp-sub">Signature Detailing</span>
              <h3>Bespoke Wax Seal Press</h3>
              <p>Customize your personal wax seal monogram to be hand-stamped onto your gift envelope.</p>
            </div>

            <div className="wax-color-selection">
              <span className="selection-label">Select Atelier Wax Blend:</span>
              <div className="swatches-flex">
                {[
                  { name: 'Royal Crimson', hex: '#d13e63' },
                  { name: 'Antique Gold', hex: '#ffd166' },
                  { name: 'Imperial Violet', hex: '#8266b7' },
                  { name: 'Dusty Rosé', hex: '#fca5b7' }
                ].map((s) => (
                  <button
                    key={s.hex}
                    type="button"
                    className={`wax-swatch-circle ${activeSealColor === s.hex ? 'active' : ''}`}
                    style={{ backgroundColor: s.hex }}
                    onClick={() => setActiveSealColor(s.hex)}
                    title={s.name}
                    aria-label={s.name}
                  />
                ))}
              </div>
            </div>

            <div className="stamp-monogram-input-wrap">
              <label htmlFor="stamp-monogram-input">Monogram Letter:</label>
              <input
                id="stamp-monogram-input"
                type="text"
                maxLength={2}
                value={stampText}
                onChange={(e) => setStampText(e.target.value.toUpperCase())}
                placeholder="M"
              />
            </div>

            {/* Interactive Press Pad */}
            <div className="wax-stamp-press-stage" onClick={handleStamp} data-cursor="PRESS">
              <div
                className={`wax-seal-wax-pool ${isStamping ? 'stamping-active' : ''}`}
                style={{ backgroundColor: activeSealColor }}
              >
                <div className="seal-outer-rim" />
                <span className="seal-embossed-letter">{stampText || 'M'}</span>
              </div>
              <p className="press-hint-text">
                {isStamping ? 'Embossing hot wax seal...' : '✦ Click to press & test seal impression'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

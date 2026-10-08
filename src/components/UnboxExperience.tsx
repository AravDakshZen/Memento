import React, { useState } from 'react';
import { Sparkles, Gift, RotateCcw, ShoppingBag, Feather } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { ALL_PRODUCTS } from '../data/products';
import type { Product } from '../types';

export const UnboxExperience: React.FC = () => {
  const { addToCart, showToast, navigateTo, setActiveProduct } = useCart();
  const [isUnboxed, setIsUnboxed] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [activeInkColor, setActiveInkColor] = useState('#8266b7');
  const [noteRecipient, setNoteRecipient] = useState('Dearest Sarah');
  const [noteMessage, setNoteMessage] = useState('Wishing you sweet celebration & everlasting delight.');
  const [isNoteSaved, setIsNoteSaved] = useState(false);

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

  const handleSaveNote = () => {
    setIsNoteSaved(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.75 },
      colors: ['#ffd166', '#f5899e', '#8266b7']
    });
    showToast('💌 Handwritten calligraphy card personalized & included with your box!');
    setTimeout(() => setIsNoteSaved(false), 3000);
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
                  <div className="bow-loop left" />
                  <div className="bow-loop right" />
                  <div className="bow-center" />
                </div>
              </div>

              {/* Box Base */}
              <div className="box-base">
                <div className="box-inner-velvet">
                  {/* Revealed Random 3 Items */}
                  <div className="mystery-revealed-trio">
                    <span className="mystery-trio-tag">✦ Your Bespoke 3-Gift Curation ✦</span>
                    <div className="revealed-trio-grid">
                      {mysteryItems.map((item) => (
                        <div
                          key={item.id}
                          className="revealed-item"
                          onClick={() => {
                            setActiveProduct(item);
                            navigateTo('/product/' + item.slug);
                          }}
                          title={`Click to view ${item.name}`}
                        >
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

          {/* Bespoke Calligraphy Note Concierge Card */}
          <div className="calligraphy-concierge-card">
            <div className="calligraphy-card-header">
              <span className="calligraphy-eyebrow">BESPOKE KEEPSAKE NOTE</span>
              <h3>Handwritten Calligraphy Card</h3>
              <p>Each box arrives with a complimentary archival cotton deckled-edge note penned with dip-pen calligraphy.</p>
            </div>

            <div className="calligraphy-color-selection">
              <span className="selection-label">Select Archival Ink Tone:</span>
              <div className="swatches-flex">
                {[
                  { name: 'Imperial Violet', hex: '#8266b7' },
                  { name: 'Royal Crimson', hex: '#d13e63' },
                  { name: 'Antique Bronze', hex: '#a67c52' },
                  { name: 'Dusty Rosé', hex: '#f5899e' }
                ].map((s) => (
                  <button
                    key={s.hex}
                    type="button"
                    className={`ink-swatch-circle ${activeInkColor === s.hex ? 'active' : ''}`}
                    style={{ backgroundColor: s.hex }}
                    onClick={() => setActiveInkColor(s.hex)}
                    title={s.name}
                    aria-label={s.name}
                  />
                ))}
              </div>
            </div>

            <div className="calligraphy-inputs-wrap">
              <div className="calligraphy-input-group">
                <label>Recipient Salutation:</label>
                <input
                  type="text"
                  maxLength={30}
                  value={noteRecipient}
                  onChange={(e) => setNoteRecipient(e.target.value)}
                  placeholder="Dearest One"
                />
              </div>

              <div className="calligraphy-input-group">
                <label>Personal Inscription:</label>
                <input
                  type="text"
                  maxLength={65}
                  value={noteMessage}
                  onChange={(e) => setNoteMessage(e.target.value)}
                  placeholder="With all our love on your special celebration..."
                />
              </div>
            </div>

            {/* Interactive Deckled-Edge Stationery Card Preview */}
            <div className="deckled-stationery-card">
              <div className="deckled-card-inner">
                <div className="stationery-gold-crest">✦ MEMENTO ✦</div>
                <h4
                  className="calligraphy-salutation"
                  style={{ color: activeInkColor }}
                >
                  {noteRecipient || 'Dearest One'},
                </h4>
                <p
                  className="calligraphy-body"
                  style={{ color: activeInkColor }}
                >
                  "{noteMessage || 'Wishing you radiant joy and treasured memories.'}"
                </p>
                <div className="stationery-footer-seal">
                  <span className="stationery-footer-text">— Handcrafted with love</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-save-calligraphy"
              onClick={handleSaveNote}
            >
              <Feather size={15} />
              {isNoteSaved ? '✓ Note Attached to Box!' : 'Personalize & Attach Gift Note'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

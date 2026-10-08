import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Heart,
  Gift,
  CheckCircle,
  RefreshCw,
  ShoppingBag,
  Feather
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { AI_GIFT_PRESETS } from '../data/products';
import type { AiGiftRecommendation } from '../types';

interface AiGiftConciergeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiGiftConcierge: React.FC<AiGiftConciergeProps> = ({ isOpen, onClose }) => {
  const { addToCart, showToast } = useCart();

  const [step, setStep] = useState<'form' | 'thinking' | 'result'>('form');
  const [recipient, setRecipient] = useState('Best Friend');
  const [occasion, setOccasion] = useState('Birthday Celebration');
  const [aesthetic, setAesthetic] = useState('Coquette Rosé');
  const [budget, setBudget] = useState(140);
  const [thinkingMessageIndex, setThinkingMessageIndex] = useState(0);

  // Customization on result
  const [selectedSealColor, setSelectedSealColor] = useState('#d13e63');
  const [monogram, setMonogram] = useState('M');
  const [cardMessage, setCardMessage] = useState(
    'To the one who brings sunshine to every room — may this year be as radiant and lovely as you are! Happy Birthday gorgeous! ✨'
  );

  const [recommendation, setRecommendation] = useState<AiGiftRecommendation>(AI_GIFT_PRESETS[0]);

  const thinkingMessages = [
    'Analyzing emotional sentiment & gifting etiquette...',
    'Harmonizing artisanal scent profiles & French ribbons...',
    'Curating handcrafted keepsake artifacts...',
    'Embossing royal wax seal & preparing calligraphy...',
  ];

  const handleGenerate = () => {
    setStep('thinking');
    setThinkingMessageIndex(0);

    const interval = setInterval(() => {
      setThinkingMessageIndex((prev) => (prev + 1) % thinkingMessages.length);
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      // Select appropriate preset or dynamically formulate
      let match = AI_GIFT_PRESETS.find(
        (p) => p.recipient.toLowerCase().includes(recipient.toLowerCase()) ||
               p.aesthetic.toLowerCase().includes(aesthetic.toLowerCase())
      );
      if (!match) match = AI_GIFT_PRESETS[0];

      setRecommendation({
        ...match,
        price: budget,
        recipient,
        occasion,
        aesthetic
      });
      setSelectedSealColor(match.waxSealColor);
      setMonogram(match.monogram);
      setCardMessage(match.cardMessage);
      setStep('result');

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f5899e', '#ffd166', '#8266b7']
      });
    }, 2200);
  };

  const handleAddToCart = () => {
    // Add bespoke AI curated product to cart
    addToCart({
      id: `ai-gift-${Date.now()}`,
      name: recommendation.title,
      slug: 'ai-bespoke-curated-gift-hamper',
      price: recommendation.price,
      rating: 5.0,
      reviewCount: 1,
      image: recommendation.image,
      category: 'Bespoke Curated Hamper',
      sku: `AI-${recipient.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      tags: ['AI Curated', 'Bespoke', 'Wax Sealed', 'Handcrafted'],
      shortDescription: `${recommendation.subtitle} — Includes personalized wax seal (${monogram}) and handwritten calligraphy card.`,
      inStock: true,
      boxContents: recommendation.itemsIncluded,
      ribbonColor: recommendation.ribbonColor,
      isGiftBox: true
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#f5899e', '#8266b7', '#ffd166', '#ffffff']
    });

    showToast(`🎀 Bespoke "${recommendation.title}" added to your shopping cart!`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop ai-concierge-backdrop" onClick={onClose}>
      <div
        className="ai-concierge-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="ai-concierge-heading"
      >
        {/* Header */}
        <div className="ai-modal-header">
          <div className="ai-title-badge">
            <span className="ai-sparkle-pill">
              <Sparkles size={14} className="sparkle-spin" /> Memento AI Atelier
            </span>
            <h2 id="ai-concierge-heading" className="ai-main-title">
              Personalized Gift Concierge
            </h2>
            <p className="ai-subtitle">
              Tell our AI gifting concierge about your special someone. We will curate a bespoke, wax-sealed luxury hamper tailored to their soul.
            </p>
          </div>
          <button
            type="button"
            className="ai-close-btn"
            onClick={onClose}
            aria-label="Close Concierge"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="ai-modal-body">
          {step === 'form' && (
            <div className="ai-form-layout">
              {/* Recipient */}
              <div className="ai-field-block">
                <label className="ai-field-label">1. Who is this thoughtful gift for?</label>
                <div className="ai-pill-selector">
                  {[
                    'Best Friend',
                    'Significant Other',
                    'Mother / Mom',
                    'Sister',
                    'Bridesmaid',
                    'Corporate VIP',
                    'Self-Care Ritual'
                  ].map((r) => (
                    <button
                      key={r}
                      type="button"
                      className={`ai-chip ${recipient === r ? 'active' : ''}`}
                      onClick={() => setRecipient(r)}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div className="ai-field-block">
                <label className="ai-field-label">2. What is the celebratory milestone?</label>
                <div className="ai-pill-selector">
                  {[
                    'Birthday Celebration',
                    'Wedding / Anniversary',
                    'Gratitude & Thank You',
                    'Milestone Promotion',
                    'Thinking of You',
                    'Housewarming Warmth'
                  ].map((o) => (
                    <button
                      key={o}
                      type="button"
                      className={`ai-chip ${occasion === o ? 'active' : ''}`}
                      onClick={() => setOccasion(o)}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aesthetic Vibe */}
              <div className="ai-field-block">
                <label className="ai-field-label">3. Preferred Aesthetic & Scent Mood</label>
                <div className="ai-aesthetic-grid">
                  {[
                    {
                      name: 'Coquette Rosé',
                      color: '#f5899e',
                      notes: 'Preserved blush roses, sweet berry macaron & vanilla'
                    },
                    {
                      name: 'Royal Lavender',
                      color: '#8266b7',
                      notes: 'French lavender, pure mulberry silk & botanical mist'
                    },
                    {
                      name: 'Opulent Golden Luxury',
                      color: '#ffd166',
                      notes: 'Belgian gold-leaf cocoa, amber candle & crystal flute'
                    },
                    {
                      name: 'Parisian Minimalist Chic',
                      color: '#ba6868',
                      notes: 'Linen journal, brass calligraphy pen & artisanal tea'
                    }
                  ].map((a) => (
                    <div
                      key={a.name}
                      className={`ai-aesthetic-card ${aesthetic === a.name ? 'active' : ''}`}
                      onClick={() => setAesthetic(a.name)}
                    >
                      <div className="aesthetic-swatch" style={{ backgroundColor: a.color }} />
                      <div className="aesthetic-meta">
                        <strong>{a.name}</strong>
                        <span>{a.notes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Tier */}
              <div className="ai-field-block">
                <div className="budget-label-row">
                  <label className="ai-field-label">4. Gifting Budget Tier</label>
                  <span className="budget-display">${budget} USD</span>
                </div>
                <input
                  type="range"
                  min="65"
                  max="280"
                  step="5"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="ai-range-slider"
                />
                <div className="budget-milestones">
                  <span>Petite Gift Box ($65)</span>
                  <span>Signature Hamper ($140)</span>
                  <span>Grand Heirloom Trunk ($280)</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="ai-submit-row">
                <button
                  type="button"
                  className="btn-curate-ai"
                  onClick={handleGenerate}
                >
                  <Sparkles size={18} /> Curate Bespoke Gift Hamper with AI
                </button>
              </div>
            </div>
          )}

          {step === 'thinking' && (
            <div className="ai-thinking-state">
              <div className="ai-neural-rings">
                <div className="ring ring-outer" />
                <div className="ring ring-middle" />
                <div className="ring ring-inner" />
                <div className="gift-pulse-icon">
                  <Gift size={36} />
                </div>
              </div>

              <h3 className="thinking-title">Momento AI is Curating...</h3>
              <p className="thinking-subtext">{thinkingMessages[thinkingMessageIndex]}</p>

              <div className="thinking-progress-bar">
                <div className="thinking-progress-fill" />
              </div>
            </div>
          )}

          {step === 'result' && (
            <div className="ai-result-layout">
              {/* Left Column: Visual Hamper Presentation */}
              <div className="ai-result-visual-col">
                <div className="result-pedestal-wrap">
                  <div className="result-glow-pedestal" />
                  <img
                    src={recommendation.image}
                    alt={recommendation.title}
                    className="result-hamper-png cutout-floating-img"
                  />
                  {/* Floating Monogram Wax Seal Stamp Badge */}
                  <div
                    className="result-wax-badge"
                    style={{ backgroundColor: selectedSealColor }}
                  >
                    <span className="seal-monogram-text">{monogram}</span>
                  </div>
                </div>

                <div className="result-price-tag">
                  <span className="tag-label">Atelier Curated Price:</span>
                  <span className="tag-val">${recommendation.price}.00</span>
                </div>

                <div className="result-includes-box">
                  <h4>Hand-Packed In Your Hamper:</h4>
                  <ul>
                    {recommendation.itemsIncluded.map((item, i) => (
                      <li key={i}>
                        <CheckCircle size={14} className="check-icon" /> {item}
                      </li>
                    ))}
                    <li>
                      <CheckCircle size={14} className="check-icon" /> Handwritten Calligraphy Note
                    </li>
                    <li>
                      <CheckCircle size={14} className="check-icon" /> Antiqued Wax Seal Packaging
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Customization & Calligraphy Message */}
              <div className="ai-result-details-col">
                <span className="ai-match-badge">
                  <Heart size={12} fill="#f5899e" color="#f5899e" /> 99.4% Emotional Match for {recommendation.recipient}
                </span>

                <h3 className="result-title">{recommendation.title}</h3>
                <p className="result-subtitle">{recommendation.subtitle}</p>

                {/* Wax Seal Customizer */}
                <div className="result-customizer-block">
                  <label className="block-label">Select Atelier Wax Seal Color:</label>
                  <div className="wax-color-row">
                    {[
                      { name: 'Royal Crimson', color: '#d13e63' },
                      { name: 'Vintage Gold', color: '#ffd166' },
                      { name: 'Imperial Violet', color: '#8266b7' },
                      { name: 'Bordeaux Berry', color: '#80183e' },
                      { name: 'Dusty Rose', color: '#fca5b7' }
                    ].map((w) => (
                      <button
                        key={w.name}
                        type="button"
                        className={`wax-swatch-btn ${selectedSealColor === w.color ? 'active' : ''}`}
                        style={{ backgroundColor: w.color }}
                        onClick={() => setSelectedSealColor(w.color)}
                        title={w.name}
                      />
                    ))}
                  </div>

                  <div className="monogram-input-row">
                    <label>Embossed Monogram / Initials:</label>
                    <input
                      type="text"
                      maxLength={4}
                      value={monogram}
                      onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                      className="monogram-input"
                    />
                  </div>
                </div>

                {/* Live Calligraphy Card Message */}
                <div className="result-calligraphy-card">
                  <div className="calligraphy-card-header">
                    <span className="feather-icon"><Feather size={14} /> Handwritten Calligraphy Card</span>
                    <span className="card-ink-tag">Ink: Sepia Rose</span>
                  </div>
                  <textarea
                    rows={3}
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    className="calligraphy-textarea"
                  />
                </div>

                {/* Bottom Actions */}
                <div className="result-actions-row">
                  <button
                    type="button"
                    className="btn-add-ai-box"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag size={18} /> Add Bespoke Hamper to Cart (${recommendation.price})
                  </button>

                  <button
                    type="button"
                    className="btn-re-curate"
                    onClick={() => setStep('form')}
                  >
                    <RefreshCw size={14} /> Adjust Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

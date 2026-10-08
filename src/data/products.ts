import type { Product, Review, BlogPost, AiGiftRecommendation } from '../types';

export const MAIN_PRODUCT: Product = {
  id: 'prod-encouragement',
  name: 'Encouragement Keepsake Gift Trunk',
  slug: 'encouragement-keepsake-gift-trunk',
  price: 128,
  originalPrice: 185,
  rating: 4.9,
  reviewCount: 48,
  image: '/images/encouragement_home_decor.jpg',
  gallery: [
    '/images/encouragement_home_decor.jpg',
    '/images/craft_gift_box.jpg',
    '/images/hero_gift_boxes.jpg'
  ],
  category: 'Curated Gift Hampers',
  categories: ['Curated Gift Hampers', 'Personalised Keepsakes', 'Luxury Stationery'],
  sku: 'MEM-350-TRUNK',
  tags: ['Bespoke', 'Satin Ribbon', 'Handcrafted', 'Wax Sealed', 'Keepsake'],
  shortDescription:
    'Hand-assembled in our atelier with double-faced French satin ribbon, custom wax seal engraving, and handwritten calligraphy. Includes artisanal scented candle, leatherette card keeper, and sweet treats.',
  fullDescription:
    'Our signature Memento Keepsake Gift Trunk is designed for unforgettable milestones. Each hamper is delicately arranged inside a handcrafted archival box lined with rose-tinted tissue, finished with custom metallic hot-stamped monogramming and an embossed wax seal stamp.',
  features: [
    'Hand-poured coconut soy candle in blush ceramic vessel',
    'Custom engraved wooden card keeper book with satin ties',
    'Artisanal raspberry & bourbon vanilla confection treats',
    'Complimentary handwritten calligraphy message card with royal wax seal',
    'Handcrafted keepsake gift trunk box with magnetic closure'
  ],
  requirements: [
    'Custom Calligraphy: Enter recipient message (max 35 words) during checkout for hand-lettered ink card.',
    'Wax Seal Preference: Select antique gold, blush rose, or burgundy seal during order confirmation.',
    'Lead Time: Requires 24-48 hours for hand calligraphy curing before express courier dispatch.',
    'Preservation Care: Store botanical candle and archival trunk in a cool, dry area away from direct sunlight.'
  ],
  specs: {
    'Trunk Dimensions': '12.5"L x 9.5"W x 5.2"H',
    'Total Weight': '3.4 lbs (approx. 1.54 kg)',
    'Box Construction': '1200gsm Rigid Archival Board with Matte Linen Wrap',
    'Ribbon Material': 'Double-faced French Satin (38mm width)',
    'Candle Burn Time': 'Up to 50 hours (Coconut Soy Blend)',
    'Atelier Origin': 'Handcrafted in Memento Paris & London Atelier'
  },
  boxContents: [
    'Hand-poured Rose & Peony Botanical Candle',
    'Handcrafted Wooden Keepsake Card Book',
    'Artisanal Sweet Confectionery Gift Box',
    'Bespoke Wax-Sealed Greeting Card'
  ],
  reviews: [
    {
      id: 'rev-enc-1',
      author: 'Genevieve Laurent',
      date: 'October 02, 2026',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      comment:
        'The unboxing was breathtaking! The double-faced velvet ribbon, golden wax seal, and delicate calligraphy card made my sister burst into happy tears. Absolutely unforgettable.'
    },
    {
      id: 'rev-enc-2',
      author: 'Julian Montgomery',
      date: 'September 24, 2026',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      comment:
        'We ordered 20 bespoke Encouragement trunks for our corporate executive retreat. The aromatic candle and engraved card keeper received nonstop compliments.'
    },
    {
      id: 'rev-enc-3',
      author: 'Clara Beaumont',
      date: 'September 18, 2026',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      comment:
        'An authentic luxury gifting house. The card keeper keepsake and hand-poured candle still perfume our living room weeks later. Five stars without hesitation.'
    }
  ],
  ribbonColor: '#f5899e',
  isGiftBox: true,
  inStock: true
};

export const LUXURY_GIFT_HAMPERS: Product[] = [
  {
    id: 'gift-rose-velvet',
    name: 'The Rosé Velvet Keepsake Hamper',
    slug: 'rose-velvet-keepsake-hamper',
    price: 148,
    originalPrice: 195,
    rating: 5.0,
    reviewCount: 64,
    image: '/images/hero_gift_boxes.jpg',
    gallery: [
      '/images/hero_gift_boxes.jpg',
      '/images/encouragement_home_decor.jpg',
      '/images/craft_gift_box.jpg'
    ],
    category: 'Curated Gift Hampers',
    categories: ['Curated Gift Hampers', 'Romantic Favors'],
    sku: 'MEM-ROSE-01',
    tags: ['Luxury', 'Romance', 'Velvet', 'Best Seller'],
    badge: 'Atelier Signature',
    shortDescription: 'Preserved blush roses, French artisan macarons, golden celebration keepsake, and scented candle.',
    fullDescription: 'Draped in soft velvet ribbons and finished with eternal preserved French roses, The Rosé Velvet Hamper captures the essence of pure romantic decadence. Includes fresh gourmet macarons and a gold-leaf soy candle.',
    features: [
      'Preserved blush pink roses in crystal cloche (lasts up to 3 years)',
      'Box of 6 French strawberry and Madagascar vanilla macarons',
      'Artisanal rose quartz scented soy candle',
      'Double-faced dusty rose velvet ribbon with brass seal'
    ],
    requirements: [
      'Macaron Freshness: Consume macarons within 5 days of arrival; keep chilled at 4°C.',
      'Rose Preservation: Do not water preserved roses; avoid humid bathrooms or direct sunlight.',
      'Custom Monogram: Provide up to 2 initials for the brass wax seal pendant.',
      'Courier Type: Same-day climate controlled courier recommended for summer deliveries.'
    ],
    specs: {
      'Hamper Dimensions': '11.8"L x 11.8"W x 6.0"H',
      'Weight': '3.8 lbs',
      'Flower Type': '100% Real Preserved Ecuadorian & French Roses',
      'Confection Shelf Life': '5 Days refrigerated',
      'Ribbon Width': '40mm French Velvet'
    },
    boxContents: ['Preserved French Rosé', 'Pastel Macaron Trio', 'Handmade Scented Soy Candle', 'Gold Foil Matchbox'],
    reviews: [
      {
        id: 'rev-rose-1',
        author: 'Camille Dupond',
        date: 'October 01, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
        comment: 'The preserved roses look as vibrant as freshly cut blooms! The velvet ribbon gives such an opulent tactile feeling.'
      },
      {
        id: 'rev-rose-2',
        author: 'Liam Vance',
        date: 'September 28, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        comment: 'Proposed to my fiancée with this hamper on our anniversary. The presentation in the velvet box made the moment truly royal.'
      },
      {
        id: 'rev-rose-3',
        author: 'Seraphina Holt',
        date: 'September 15, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
        comment: 'Delicious macarons and the scent of the candle lingers softly in our bedroom. Worth every penny.'
      }
    ],
    ribbonColor: '#f5899e',
    isGiftBox: true,
    inStock: true
  },
  {
    id: 'gift-celestial-gold',
    name: 'Celestial Silk & Amber Gift Crate',
    slug: 'celestial-silk-amber-crate',
    price: 135,
    originalPrice: 175,
    rating: 4.9,
    reviewCount: 38,
    image: '/images/craft_gift_box.jpg',
    gallery: [
      '/images/craft_gift_box.jpg',
      '/images/hero_gift_boxes.jpg',
      '/images/chocolate_cake_box.jpg'
    ],
    category: 'Curated Gift Hampers',
    categories: ['Curated Gift Hampers', 'Self-Care Rituals'],
    sku: 'MEM-CELEST-02',
    tags: ['Silk', 'Self-Care', 'Amber', 'Handcrafted'],
    badge: 'Popular',
    shortDescription: 'Pure mulberry silk sleep mask, gold foil journal, lavender mist, and gilded Belgian chocolates.',
    fullDescription: 'Designed as an ethereal sanctuary of nighttime relaxation. This handcrafted wooden crate features highest grade 22-momme pure mulberry silk, soothing botanical aromatherapy mist, and gold-foil artisan confections.',
    features: [
      'Grade 6A 22-Momme Mulberry Silk Eye Mask and Scrunchie',
      'Hardcover Linen Journal with gilded gold edges and satin ribbon bookmark',
      'Organic French Lavender and Chamomile Pillow Mist (100ml)',
      'Box of 8 Golden Belgian Hazelnut Pralines'
    ],
    requirements: [
      'Silk Care: Hand wash silk eye mask in cold water with pH neutral silk detergent only.',
      'Aromatherapy Warning: For external use only. Spray mist on linens from 20cm distance.',
      'Dietary Note: Chocolates contain tree nuts (hazelnut, almond) and dairy.',
      'Packaging: Natural pine wood crate can be repurposed as a vanity organizer.'
    ],
    specs: {
      'Crate Dimensions': '13.0"L x 9.0"W x 4.8"H',
      'Weight': '2.9 lbs',
      'Silk Fabric': '100% Pure Grade 6A Mulberry Silk',
      'Mist Ingredients': 'Distilled Lavandula Angustifolia, Organic Witch Hazel',
      'Journal Pages': '160 Acid-Free Cream Pages (120gsm)'
    },
    boxContents: ['100% Mulberry Silk Eye Mask', 'Gold-Edged Linen Journal', 'Lavender Botanical Mist', 'Belgian Chocolate Pearls'],
    reviews: [
      {
        id: 'rev-celest-1',
        author: 'Elena Rostova',
        date: 'October 03, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        comment: 'The mulberry silk mask is like sleeping on clouds. And the smell of the lavender mist helped me sleep better than ever.'
      },
      {
        id: 'rev-celest-2',
        author: 'Marcus Sterling',
        date: 'September 22, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        comment: 'Sent this to my mother after her surgery. The presentation was gorgeous and the chocolates were heavenly.'
      },
      {
        id: 'rev-celest-3',
        author: 'Chloe Davenport',
        date: 'September 12, 2026',
        rating: 4,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        comment: 'Very high quality curation. The wooden box itself makes a wonderful decorative keepsake on my dresser.'
      }
    ],
    ribbonColor: '#8266b7',
    isGiftBox: true,
    inStock: true
  },
  {
    id: 'gift-celebration-trunk',
    name: 'Golden Jubilee Celebration Trunk',
    slug: 'golden-jubilee-celebration-trunk',
    price: 210,
    originalPrice: 260,
    rating: 5.0,
    reviewCount: 29,
    image: '/images/chocolate_cake_box.jpg',
    gallery: [
      '/images/chocolate_cake_box.jpg',
      '/images/hero_gift_boxes.jpg',
      '/images/donuts_box.jpg'
    ],
    category: 'Curated Gift Hampers',
    categories: ['Curated Gift Hampers', 'Celebration VIP'],
    sku: 'MEM-GOLD-03',
    tags: ['Celebration', 'VIP', 'Champagne', 'Gourmet'],
    badge: 'Exclusive',
    shortDescription: 'Handcrafted keepsake trunk with sparkling celebration flute, gourmet chocolates, and golden wax seal.',
    fullDescription: 'The pinnacle of atelier gifting. Features crystal celebration glassware with 24k gold hand-painted rims, gold-dusted artisan truffles, and a solid brass wax sealing kit with personalized seal head.',
    features: [
      'Twin Hand-blown Crystal Flutes with 24k Gold Rim Detailing',
      'Box of 12 Valrhona Dark Chocolate Ganache Truffles with 24k Edible Gold Leaf',
      'Artisanal Honey Amber soy candle in textured frosted vessel',
      'Solid Brass Wax Sealing Stamp with initials of your choice'
    ],
    requirements: [
      'Glassware Care: Crystal flutes must be hand-washed in lukewarm water; do not microwave or machine wash.',
      'Wax Stamp Monogram: Provide exact initials (1-2 uppercase characters) for custom brass stamp engraving.',
      'Storage Note: Keep dark chocolate truffles between 14°C and 18°C away from strong odors.',
      'Lead Time: Custom engraved brass stamp requires 48 hours workshop machining.'
    ],
    specs: {
      'Trunk Dimensions': '14.2"L x 10.5"W x 6.5"H',
      'Weight': '4.6 lbs',
      'Glassware': 'Lead-free European Crystal (240ml capacity)',
      'Chocolate Origin': 'Grand Cru Valrhona Chocolate, France',
      'Stamp Material': 'Solid Turned Brass & Walnut Wood Handle'
    },
    boxContents: ['Crystal Celebration Flute', 'Artisanal Gold Leaf Truffles', 'Hand-poured Honey Amber Candle', 'Wax Seal Set'],
    reviews: [
      {
        id: 'rev-gold-1',
        author: 'Vivienne Westwood-Smith',
        date: 'October 04, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        comment: 'The crystal flutes are museum quality! We used them to toast at our wedding reception and will cherish them for decades.'
      },
      {
        id: 'rev-gold-2',
        author: 'David Chen',
        date: 'September 20, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
        comment: 'Ordered for our CEO retirement. Everyone in the boardroom was stunned by the elegance of the trunk and gold leaf truffles.'
      },
      {
        id: 'rev-gold-3',
        author: 'Antonia Bell',
        date: 'September 08, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
        comment: 'The brass wax seal included with my initials is so chic. I now use it on all my holiday correspondence!'
      }
    ],
    ribbonColor: '#ffd166',
    isGiftBox: true,
    inStock: true
  },
  {
    id: 'gift-sweet-confiserie',
    name: 'La Petite Confiserie Sweet Gift Box',
    slug: 'la-petite-confiserie-box',
    price: 58,
    originalPrice: 75,
    rating: 4.8,
    reviewCount: 52,
    image: '/images/donuts_box.jpg',
    gallery: [
      '/images/donuts_box.jpg',
      '/images/chocolate_cake_box.jpg',
      '/images/pink_cupcake.jpg'
    ],
    category: 'Artisan Confectionery Gifts',
    categories: ['Artisan Confectionery Gifts', 'Party Favors'],
    sku: 'MEM-CONF-04',
    tags: ['Sweet Gifts', 'Gourmet', 'Pastel'],
    badge: '-20% Off',
    shortDescription: 'Hand-dipped artisan strawberry donuts, Belgian cocoa confections, and satin gift ribbon.',
    fullDescription: 'A delightful confectionery box designed to sweeten birthdays, thank-you moments, and celebrations. Features miniature hand-glazed strawberry donuts and gourmet chocolate pearls nestled in pastel pink satin cushions.',
    features: [
      'Four hand-glazed strawberry drizzle baked artisan donuts',
      'Assortment of ruby chocolate gems and raspberry pearls',
      'Pink floral gift box with clear display window',
      'Hand-tied French blush satin bow'
    ],
    requirements: [
      'Shelf Life: Freshly baked confections best enjoyed within 3 days. Can be frozen for up to 2 weeks.',
      'Allergen Advice: Contains gluten, dairy, eggs, soy lecithin. Nut-free recipe.',
      'Storage: Keep in a cool room (under 21°C). Do not expose to direct heat.',
      'Dispatch: Shipped Mon-Thu to prevent weekend carrier delays.'
    ],
    specs: {
      'Box Dimensions': '8.5"L x 8.5"W x 3.2"H',
      'Weight': '1.2 lbs',
      'Pastry Count': '4 Donuts + 12 Chocolate Gems',
      'Packaging': 'Food-safe greaseproof archival paper with window lid'
    },
    boxContents: ['Hand-dipped Strawberry Pastries', 'Raspberry Macaron Gems', 'Custom Gift Tag with Satin Bow'],
    reviews: [
      {
        id: 'rev-conf-1',
        author: 'Sophie Martin',
        date: 'October 05, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        comment: 'The strawberry glaze has real berry seeds and tastes so authentic, not artificial at all! Cutest packaging ever.'
      },
      {
        id: 'rev-conf-2',
        author: 'Oliver Bennett',
        date: 'September 26, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        comment: 'Sent this to my sister for passing her exams. She loved the ribbon and devoured the donuts in one sitting!'
      },
      {
        id: 'rev-conf-3',
        author: 'Mia Takahashi',
        date: 'September 14, 2026',
        rating: 4,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        comment: 'So pretty and photogenic. Made for the perfect centerpiece at our weekend brunch table.'
      }
    ],
    ribbonColor: '#fca5b7',
    isGiftBox: true,
    inStock: true
  },
  {
    id: 'gift-royal-champagne',
    name: 'The Royal Crystal Celebration Trunk',
    slug: 'royal-crystal-celebration-trunk',
    price: 195,
    originalPrice: 245,
    rating: 5.0,
    reviewCount: 42,
    image: '/images/hero_gift_boxes.jpg',
    gallery: ['/images/hero_gift_boxes.jpg', '/images/craft_gift_box.jpg'],
    category: 'Curated Gift Hampers',
    categories: ['Curated Gift Hampers', 'Milestone Celebrations'],
    sku: 'MEM-ROYAL-05',
    tags: ['Luxury', 'Crystal', 'Celebration', 'Trunk'],
    badge: 'Atelier Gold',
    shortDescription: 'Hand-blown crystal flutes, artisan pralines, and gold-foiled celebration keepsake.',
    fullDescription: 'Crafted for momentous jubilees, weddings, and anniversaries. Contains hand-blown crystal flutes, grand cru chocolate truffles, and a personalized gold-foil keepsake card in our signature wooden trunk.',
    features: ['Pair of hand-blown gold-rimmed flutes', 'Belgian gold leaf chocolate truffles', 'Hand-poured beeswax pillar candle', 'Linen gift trunk with brass hardware'],
    requirements: ['Delivery requires signature', 'Custom engraving on card available'],
    specs: { 'Trunk Size': '14" x 10" x 6"', 'Origin': 'Memento Atelier' },
    boxContents: ['Twin Crystal Flutes', 'Artisan Gold Truffles', 'Monogram Card'],
    reviews: [],
    ribbonColor: '#ffd166',
    isGiftBox: true,
    inStock: true
  },
  {
    id: 'gift-botanical-spa',
    name: 'Botanical Rose Quartz Spa Crate',
    slug: 'botanical-rose-quartz-spa-crate',
    price: 115,
    originalPrice: 150,
    rating: 4.9,
    reviewCount: 34,
    image: '/images/encouragement_home_decor.jpg',
    gallery: ['/images/encouragement_home_decor.jpg', '/images/craft_gift_box.jpg'],
    category: 'Curated Gift Hampers',
    categories: ['Curated Gift Hampers', 'Self-Care Rituals'],
    sku: 'MEM-SPA-06',
    tags: ['Spa', 'Rose Quartz', 'Botanical', 'Self-Care'],
    badge: 'Relaxation',
    shortDescription: 'Natural rose quartz facial roller, French clay bath salts, and botanical rose water mist.',
    fullDescription: 'An indulgent self-care ritual nestled in a handcrafted wooden crate with natural dried botanical florals.',
    features: ['Certified Brazilian Rose Quartz roller', 'Organic French floral bath soak', 'Lavender & chamomile linen mist'],
    requirements: ['Store bath soak in a cool dry area'],
    specs: { 'Crate Size': '10" x 8" x 4.5"' },
    boxContents: ['Rose Quartz Roller', 'French Bath Salts', 'Floral Mist'],
    reviews: [],
    ribbonColor: '#f5899e',
    isGiftBox: true,
    inStock: true
  },
  {
    id: 'gift-autumn-harvest',
    name: 'Autumn Harvest Gourmand Keepsake Hamper',
    slug: 'autumn-harvest-gourmand-hamper',
    price: 130,
    originalPrice: 165,
    rating: 4.8,
    reviewCount: 27,
    image: '/images/chocolate_cake_box.jpg',
    gallery: ['/images/chocolate_cake_box.jpg', '/images/donuts_box.jpg'],
    category: 'Curated Gift Hampers',
    categories: ['Curated Gift Hampers', 'Gourmet Treats'],
    sku: 'MEM-HARV-07',
    tags: ['Gourmand', 'Honey', 'Artisan Treats'],
    badge: 'Seasonal',
    shortDescription: 'Artisanal lavender honey, spiced gingerbread confections, and ceramic tea vessel.',
    fullDescription: 'Warm, cozy autumn flavors wrapped in earthy velvet ribbon and fragrant dried cinnamon sticks.',
    features: ['Wildflower clover honey jar', 'Ceramic handmade mug', 'Assorted spiced cookies'],
    requirements: ['Best consumed within 30 days of arrival'],
    specs: { 'Hamper Size': '11" x 9" x 5"' },
    boxContents: ['Wildflower Honey', 'Ceramic Mug', 'Spiced Biscuits'],
    reviews: [],
    ribbonColor: '#ba6868',
    isGiftBox: true,
    inStock: true
  },
  {
    id: 'gift-milestone-velvet',
    name: 'Velvet Monogram Milestone Keepsake Box',
    slug: 'velvet-monogram-milestone-box',
    price: 155,
    originalPrice: 190,
    rating: 5.0,
    reviewCount: 39,
    image: '/images/craft_gift_box.jpg',
    gallery: ['/images/craft_gift_box.jpg', '/images/hero_gift_boxes.jpg'],
    category: 'Curated Gift Hampers',
    categories: ['Curated Gift Hampers', 'Personalised Keepsakes'],
    sku: 'MEM-MILE-08',
    tags: ['Monogram', 'Velvet', 'Milestone', 'Keepsake'],
    badge: 'Bespoke',
    shortDescription: 'Hand-embroidered velvet keepsake box with gold seal and personalized calligraphy letter.',
    fullDescription: 'The ultimate milestone treasure box lined with silk and finished with custom hot-stamped gold foil initials.',
    features: ['Double-faced velvet exterior', 'Gold monogram initial plaque', 'Custom wax seal letter'],
    requirements: ['Specify up to 3 initials for monogramming'],
    specs: { 'Box Dimensions': '12" x 10" x 5.5"' },
    boxContents: ['Velvet Keepsake Box', 'Monogram Plaque', 'Calligraphy Letter'],
    reviews: [],
    ribbonColor: '#8266b7',
    isGiftBox: true,
    inStock: true
  },
  {
    id: 'gift-twilight-peony',
    name: 'Twilight Peony & Gold Silk Hamper',
    slug: 'twilight-peony-gold-silk-hamper',
    price: 140,
    originalPrice: 180,
    rating: 4.9,
    reviewCount: 31,
    image: '/images/hero_gift_boxes.jpg',
    gallery: ['/images/hero_gift_boxes.jpg', '/images/encouragement_home_decor.jpg'],
    category: 'Curated Gift Hampers',
    categories: ['Curated Gift Hampers', 'Romantic Favors'],
    sku: 'MEM-TWIL-09',
    tags: ['Peony', 'Silk', 'Candle', 'Romance'],
    badge: 'New',
    shortDescription: 'Hand-poured peony blush candle, Mulberry silk scarf, and French raspberry macarons.',
    fullDescription: 'Designed as a timeless romantic gesture, with fragrant peony petals and luxurious mulberry silk.',
    features: ['Pure 100% Mulberry Silk Scarf', 'Peony soy candle in porcelain vessel', 'Box of 6 artisan macarons'],
    requirements: ['Store macarons refrigerated'],
    specs: { 'Hamper Size': '12" x 9" x 5.5"' },
    boxContents: ['Mulberry Silk Scarf', 'Peony Candle', 'Macaron Box'],
    reviews: [],
    ribbonColor: '#f5899e',
    isGiftBox: true,
    inStock: true
  }
];

export const FIGMA_CUPCAKES: Product[] = [
  {
    id: 'cupcake-pink',
    name: 'Petite Rosé Sweet Gift Favor',
    slug: 'petite-rose-sweet-gift-favor',
    price: 18.50,
    originalPrice: 24.00,
    rating: 5.0,
    reviewCount: 31,
    image: '/images/pink_cupcake.jpg',
    gallery: [
      '/images/pink_cupcake.jpg',
      '/images/sweet_delights_cupcake.jpg',
      '/images/blue_forest_cupcake.jpg'
    ],
    category: 'Cakes & Sweet Favors',
    categories: ['Cakes & Sweet Favors', 'Party Favors'],
    flavor: 'Rosé Buttercream',
    badge: 'Favor Set',
    sku: 'MEM-FAV-101',
    tags: ['Strawberry', 'Favor', 'Party Gift', 'Cakes'],
    shortDescription: 'Delicate strawberry cream favor nestled in single presentation gift pedestal box with silk ribbon.',
    fullDescription: 'Hand-swirled with organic strawberry puree and whipped Swiss buttercream, topped with candied rose petals. Presented inside an acrylic showcase cube with satin bow for unforgettable bridal showers and birthdays.',
    features: [
      'Slow-churned Swiss meringue strawberry buttercream',
      'Soft chiffon sponge infused with French rosewater syrup',
      'Crowned with crystallised organic rose petals and edible pearls',
      'Delivered in individual clear acrylic pedestal box with satin ribbon'
    ],
    requirements: [
      'Storage: Keep refrigerated at 2°C - 5°C. Best consumed within 48 hours of dispatch.',
      'Serving Instruction: Bring to room temperature 30 minutes before serving for silkiest cream texture.',
      'Allergens: Contains dairy (butter), eggs, wheat gluten. Gelatin-free.',
      'Bulk Orders: For quantities over 25 units, order at least 4 business days in advance.'
    ],
    specs: {
      'Serving Size': 'Individual 120g confectionery favor',
      'Packaging Dimensions': '3.8" x 3.8" x 4.5" Clear Pedestal Cube',
      'Dietary': 'Vegetarian, Nut-Free Facility',
      'Origin': 'Freshly baked daily in Memento Bakery Atelier'
    },
    reviews: [
      {
        id: 'rev-cup-pink-1',
        author: 'Isabella Rossi',
        date: 'October 04, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        comment: 'Ordered 30 of these for my bridal shower favors. Guests were raving about how light and velvety the frosting was!'
      },
      {
        id: 'rev-cup-pink-2',
        author: 'Lucas Garcia',
        date: 'September 27, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        comment: 'The clear pedestal cube makes it look like a luxury jewelry piece. Tastes even better than it looks.'
      },
      {
        id: 'rev-cup-pink-3',
        author: 'Nora Lindqvist',
        date: 'September 16, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
        comment: 'Subtle rose flavor without being overwhelming. Perfect sweetness balance!'
      }
    ],
    inStock: true
  },
  {
    id: 'cupcake-blue-forest',
    name: 'Blue Forest Keepsake Confection',
    slug: 'blue-forest-keepsake-confection',
    price: 22.00,
    originalPrice: 28.50,
    rating: 5.0,
    reviewCount: 42,
    image: '/images/blue_forest_cupcake.jpg',
    gallery: [
      '/images/blue_forest_cupcake.jpg',
      '/images/swiss_cloud_cupcake.jpg',
      '/images/pink_cupcake.jpg'
    ],
    category: 'Cakes & Sweet Favors',
    categories: ['Cakes & Sweet Favors', 'Gourmet Treats'],
    flavor: 'Wild Blueberry',
    badge: 'Bestseller',
    sku: 'MEM-FAV-102',
    tags: ['Blueberry', 'Swiss Cake', 'Signature', 'Cakes'],
    shortDescription: 'Signature baby blue swirl confection infused with wild forest blueberries, sugar pearls & gift box.',
    fullDescription: 'An atelier showpiece confection crafted with wild Scandinavian forest blueberry compote, organic Madagascar vanilla sponge, and shimmering sapphire buttercream accented with genuine 24k gold leaf.',
    features: [
      'Fresh forest blueberry compote core with natural lemon zest',
      'Organic Madagascar vanilla bean sponge',
      'Edible 24k gold leaf flakes and crispy sugar pearls',
      'Delivered in individual clear pedestal box with baby blue satin ribbon'
    ],
    requirements: [
      'Preservation: Chilled delivery required. Store in refrigerator up to 3 days.',
      'Temperature: Allow 20 minutes at room temperature before eating.',
      'Allergen Info: Wheat flour, milk, egg. Free of artificial blue coloring (colored naturally with spirulina extract).',
      'Special Requests: Custom gift tag calligraphy available for orders of 6 or more.'
    ],
    specs: {
      'Weight': '135g gourmet confection',
      'Dimensions': '3.9" x 3.9" x 4.6" Gift Display Box',
      'Natural Coloring': '100% Plant-derived Spirulina & Blueberry Extract',
      'Storage': 'Refrigerate at 4°C'
    },
    reviews: [
      {
        id: 'rev-cup-blue-1',
        author: 'Freja Møller',
        date: 'October 02, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        comment: 'The blue swirl is gorgeous! I love that they use natural spirulina for coloring instead of chemical dyes. The berry compote center was heavenly.'
      },
      {
        id: 'rev-cup-blue-2',
        author: 'Arthur Pendelton',
        date: 'September 25, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
        comment: 'Ordered a half-dozen for our tea party. Everyone took photos before taking their first bite. Outstanding!'
      },
      {
        id: 'rev-cup-blue-3',
        author: 'Zoe Kravitz-Lee',
        date: 'September 19, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
        comment: 'The gold leaf detailing adds so much class. The sponge was so moist and fragrant.'
      }
    ],
    inStock: true
  },
  {
    id: 'cupcake-swiss-cloud',
    name: 'Swiss Cloud Macaron Confection Box',
    slug: 'swiss-cloud-macaron-confection-box',
    price: 24.50,
    originalPrice: 32.00,
    rating: 4.9,
    reviewCount: 26,
    image: '/images/swiss_cloud_cupcake.jpg',
    gallery: [
      '/images/swiss_cloud_cupcake.jpg',
      '/images/pink_cupcake.jpg',
      '/images/sweet_delights_cupcake.jpg'
    ],
    category: 'Cakes & Sweet Favors',
    categories: ['Cakes & Sweet Favors', 'Gourmet Treats'],
    flavor: 'Raspberry Velvet',
    badge: 'Limited',
    sku: 'MEM-FAV-103',
    tags: ['Raspberry', 'Buttercream', 'Gold Dust', 'Cakes'],
    shortDescription: 'Airy Swiss buttercream topped with garden raspberries, delicate gold dusting & gift card.',
    fullDescription: 'Layered with velvety raspberry reduction, dark Valrhona cocoa crunch base, and cloud-like Swiss buttercream. Finished with freeze-dried garden raspberries and an individual miniature macaron perched on top.',
    features: [
      'Gourmet miniature raspberry macaron topper',
      'Double raspberry core with tart fruit balance',
      'Swiss meringue cream with organic vanilla bean flecks',
      'Gold foil display carton with silk ribbon bow'
    ],
    requirements: [
      'Storage: Keep chilled at 3°C - 5°C. Best within 72 hours.',
      'Dietary Details: Contains almond flour (in macaron shell), dairy, eggs, gluten.',
      'Handling: Fragile macaron topper; keep carton upright during transit.'
    ],
    specs: {
      'Weight': '140g layered confection',
      'Box Dimensions': '4.0" x 4.0" x 5.0"',
      'Allergens': 'Tree nuts (Almonds), Milk, Eggs, Wheat',
      'Calories': '380 kcal'
    },
    reviews: [
      {
        id: 'rev-swiss-1',
        author: 'Helena Berg',
        date: 'October 01, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
        comment: 'Having a whole baby macaron on top of the cupcake is genius! The raspberry flavor was so fresh and tangy.'
      },
      {
        id: 'rev-swiss-2',
        author: 'Maxime Chevalier',
        date: 'September 21, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        comment: 'A true Parisian patisserie standard. The Swiss buttercream is so light, not sickeningly sweet like commercial cupcakes.'
      },
      {
        id: 'rev-swiss-3',
        author: 'Ananya Sharma',
        date: 'September 11, 2026',
        rating: 4,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        comment: 'Arrived in perfect condition with ice packs. Delicious treat for my birthday.'
      }
    ],
    inStock: true
  },
  {
    id: 'cupcake-pink-float',
    name: 'Pink Marshmallow Dream Favor',
    slug: 'pink-marshmallow-dream-favor',
    price: 19.50,
    originalPrice: 25.00,
    rating: 4.7,
    reviewCount: 19,
    image: '/images/sweet_delights_cupcake.jpg',
    gallery: [
      '/images/sweet_delights_cupcake.jpg',
      '/images/pink_cupcake.jpg',
      '/images/blue_forest_cupcake.jpg'
    ],
    category: 'Cakes & Sweet Favors',
    categories: ['Cakes & Sweet Favors', 'Party Favors'],
    flavor: 'Vanilla Bean',
    badge: 'Party Favor',
    sku: 'MEM-FAV-104',
    tags: ['Marshmallow', 'Pink', 'Delight', 'Cakes'],
    shortDescription: 'Gourmet bourbon vanilla confection crowned with fresh berry swirls and boutique gift packaging.',
    fullDescription: 'Crowned with pillowy handmade marshmallow fluff toasted to perfection, layered over strawberry-infused cake crumb and ribboned with white Belgian chocolate drizzle.',
    features: [
      'Handcrafted marshmallow cloud topping',
      'Tahitian bourbon vanilla bean sponge crumb',
      'White chocolate drizzle and glitter sprinkles',
      'Pastel gift pedestal box with custom inscription tag'
    ],
    requirements: [
      'Storage: Room temperature storage allowed up to 48 hours (away from heat), or refrigerate up to 4 days.',
      'Child Safe: Made with 100% food-grade non-toxic organic glitter.',
      'Allergens: Dairy, wheat, eggs, beef gelatin (in marshmallow).'
    ],
    specs: {
      'Weight': '125g sweet treat',
      'Box Dimensions': '3.8" x 3.8" x 4.6"',
      'Shelf Life': '4 days refrigerated',
      'Glitter': 'Edible Mica Pearl Dust'
    },
    reviews: [
      {
        id: 'rev-marsh-1',
        author: 'Penelope Ward',
        date: 'October 03, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        comment: 'The marshmallow fluff topping was so pillowy and dreamy! My daughter was over the moon for her birthday tea party.'
      },
      {
        id: 'rev-marsh-2',
        author: 'Benjamin Cross',
        date: 'September 23, 2026',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        comment: 'Very tasty and remarkably well packed. The white chocolate drizzle was a lovely touch.'
      },
      {
        id: 'rev-marsh-3',
        author: 'Aria Montgomery',
        date: 'September 13, 2026',
        rating: 4,
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
        comment: 'Super cute aesthetics, sweet and nostalgic taste like cotton candy!'
      }
    ],
    inStock: true
  },
  {
    id: 'cupcake-pistachio-rose',
    name: 'Golden Pistachio Rose Artisanal Muffin',
    slug: 'golden-pistachio-rose-muffin',
    price: 21.00,
    originalPrice: 26.00,
    rating: 4.9,
    reviewCount: 33,
    image: '/images/pink_cupcake.jpg',
    gallery: ['/images/pink_cupcake.jpg', '/images/sweet_delights_cupcake.jpg'],
    category: 'Cakes & Sweet Favors',
    categories: ['Cakes & Sweet Favors', 'Gourmet Treats'],
    flavor: 'Pistachio Blossom',
    badge: 'Artisan',
    sku: 'MEM-FAV-105',
    tags: ['Pistachio', 'Muffin', 'Rose', 'Cakes'],
    shortDescription: 'Roasted Sicilian pistachios with delicate organic rosewater drizzle and raw cane sugar crust.',
    fullDescription: 'Baked fresh each morning with hand-shelled Bronte pistachios, orange blossom water, and French sea salt crystals.',
    features: ['100% Bronte Sicilian pistachios', 'Organic rosewater syrup glaze', 'Eco-friendly bakery wrap'],
    requirements: ['Best enjoyed warm or at room temperature within 48h'],
    specs: { 'Weight': '130g pastry', 'Origin': 'Memento Bakery Atelier' },
    reviews: [],
    inStock: true
  },
  {
    id: 'cupcake-belgian-choc',
    name: 'Belgian Valrhona Fudge Ganache Cupcake',
    slug: 'belgian-valrhona-fudge-cupcake',
    price: 23.50,
    originalPrice: 29.00,
    rating: 5.0,
    reviewCount: 47,
    image: '/images/chocolate_cake_box.jpg',
    gallery: ['/images/chocolate_cake_box.jpg', '/images/blue_forest_cupcake.jpg'],
    category: 'Cakes & Sweet Favors',
    categories: ['Cakes & Sweet Favors', 'Gourmet Treats'],
    flavor: 'Dark Chocolate Fudge',
    badge: 'Decadent',
    sku: 'MEM-FAV-106',
    tags: ['Chocolate', 'Fudge', 'Ganache', 'Cakes'],
    shortDescription: '70% Valrhona dark chocolate mousse center, whipped fudge swirl & 24k gold leaf.',
    fullDescription: 'Pure chocolate decadence with molten ganache center and silky dark chocolate buttercream.',
    features: ['70% French Valrhona cocoa', 'Liquid dark ganache core', 'Edible gold leaf crown'],
    requirements: ['Refrigerate at 4°C, consume within 3 days'],
    specs: { 'Weight': '145g' },
    reviews: [],
    inStock: true
  },
  {
    id: 'cupcake-lavender-lemon',
    name: 'Lavender Lemon Honey Chiffon Muffin',
    slug: 'lavender-lemon-honey-muffin',
    price: 19.00,
    originalPrice: 24.00,
    rating: 4.8,
    reviewCount: 22,
    image: '/images/swiss_cloud_cupcake.jpg',
    gallery: ['/images/swiss_cloud_cupcake.jpg', '/images/pink_cupcake.jpg'],
    category: 'Cakes & Sweet Favors',
    categories: ['Cakes & Sweet Favors', 'Party Favors'],
    flavor: 'Lavender Honey',
    badge: 'Botanical',
    sku: 'MEM-FAV-107',
    tags: ['Lavender', 'Lemon', 'Muffin', 'Cakes'],
    shortDescription: 'Provencal lavender buds, zesty Sorrento lemons, and wild mountain clover honey.',
    fullDescription: 'Subtle aromatic floral notes balanced with lively lemon curd and light chiffon crumb.',
    features: ['Organic French culinary lavender', 'Hand-squeezed Sorrento lemon curd core', 'Honey glaze crust'],
    requirements: ['Keep in bakery box away from moisture'],
    specs: { 'Weight': '125g' },
    reviews: [],
    inStock: true
  },
  {
    id: 'cupcake-strawberry-shortcake',
    name: 'Wild Strawberry Blossom Shortcake Favor',
    slug: 'wild-strawberry-blossom-shortcake',
    price: 22.00,
    originalPrice: 27.50,
    rating: 5.0,
    reviewCount: 39,
    image: '/images/sweet_delights_cupcake.jpg',
    gallery: ['/images/sweet_delights_cupcake.jpg', '/images/pink_cupcake.jpg'],
    category: 'Cakes & Sweet Favors',
    categories: ['Cakes & Sweet Favors', 'Party Favors'],
    flavor: 'Wild Strawberry',
    badge: 'Popular',
    sku: 'MEM-FAV-108',
    tags: ['Strawberry', 'Shortcake', 'Favor', 'Cakes'],
    shortDescription: 'Fresh strawberry puree layered with chantilly cream and crumbly biscuit base.',
    fullDescription: 'A classic French fraisièr reimagined into a delicate individual single-serving gift favor.',
    features: ['Fresh local strawberries', 'Light chantilly cream', 'Almond biscuit base'],
    requirements: ['Keep chilled at 4°C'],
    specs: { 'Weight': '135g' },
    reviews: [],
    inStock: true
  },
  {
    id: 'cupcake-caramel-pecan',
    name: 'Salted Caramel Pecan Artisanal Muffin',
    slug: 'salted-caramel-pecan-muffin',
    price: 20.50,
    originalPrice: 26.00,
    rating: 4.9,
    reviewCount: 28,
    image: '/images/blue_forest_cupcake.jpg',
    gallery: ['/images/blue_forest_cupcake.jpg', '/images/swiss_cloud_cupcake.jpg'],
    category: 'Cakes & Sweet Favors',
    categories: ['Cakes & Sweet Favors', 'Gourmet Treats'],
    flavor: 'Salted Caramel Pecan',
    badge: 'Chef Favorite',
    sku: 'MEM-FAV-109',
    tags: ['Caramel', 'Pecan', 'Muffin', 'Cakes'],
    shortDescription: 'House-made sea salt butter caramel with toasted Georgia pecans and brown butter.',
    fullDescription: 'Slow-simmered caramel sauce ribboned through golden brown butter batter topped with crunchy pecans.',
    features: ['Handcrafted Fleur de Sel caramel', 'Toasted Georgia pecan halves', 'Brown butter sponge'],
    requirements: ['Store at room temperature up to 3 days'],
    specs: { 'Weight': '140g' },
    reviews: [],
    inStock: true
  }
];

export const RELATED_PRODUCTS: Product[] = [
  {
    id: 'prod-card-keeper',
    name: 'Happy Wishes Birthday Card Keeper Book',
    slug: 'happy-wishes-birthday-card-keeper-book',
    price: 68,
    originalPrice: 95,
    rating: 4.9,
    reviewCount: 38,
    image: '/images/birthday_card_keeper.jpg',
    gallery: [
      '/images/birthday_card_keeper.jpg',
      '/images/craft_gift_box.jpg',
      '/images/encouragement_home_decor.jpg'
    ],
    category: 'Party Items & Keepsakes',
    categories: ['Party Items & Keepsakes', 'Personalised Keepsakes'],
    sku: 'MEM-KP-550',
    tags: ['Stationery', 'Wooden Keepsake', 'Memories', 'Party Items'],
    shortDescription: 'Engraved wooden card keepsake book with satin gold ribbon for cherishing milestone cards.',
    fullDescription: 'Never lose a heartfelt birthday or wedding card again. Crafted from laser-cut Baltic birch with brass expansion binding rings and rich satin ribbons.',
    features: ['Engraved Baltic birch wood front and back covers', 'Durable brass ring binder system', 'Includes 25 acid-free clear pockets'],
    requirements: ['Wipe wooden covers with dry microfiber cloth'],
    specs: { 'Cover Dimensions': '8.5"H x 6.5"W' },
    reviews: [],
    inStock: true
  },
  {
    id: 'prod-hummingbird',
    name: 'Throated Hummingbird Porcelain Sculpture',
    slug: 'throated-hummingbird-porcelain-sculpture',
    price: 112,
    originalPrice: 141,
    rating: 5.0,
    reviewCount: 29,
    image: '/images/hummingbird_figurine.jpg',
    gallery: ['/images/hummingbird_figurine.jpg'],
    category: 'Party Items & Keepsakes',
    categories: ['Party Items & Keepsakes', 'Artisanal Heirlooms'],
    sku: 'MEM-HB-904',
    tags: ['Porcelain', 'Heirloom', 'Handcrafted', 'Party Items'],
    shortDescription: 'Delicate hand-painted porcelain hummingbird hovering gracefully over pink blossoms in gift box.',
    fullDescription: 'An heirloom keepsake figurine sculpted in fine biscuit porcelain and hand-painted by master artisans.',
    features: ['Fine European biscuit porcelain', 'Hand-painted iridescent pigments', 'Velvet-lined gift box'],
    requirements: ['Handle with clean, dry hands'],
    specs: { 'Height': '6.2"' },
    reviews: [],
    inStock: true
  },
  {
    id: 'prod-snoopy',
    name: 'Jim Shore Peanuts Snoopy Woodstock Figurine',
    slug: 'jim-shore-peanuts-snoopy-woodstock-figurine',
    price: 78,
    originalPrice: 105,
    rating: 4.8,
    reviewCount: 35,
    image: '/images/snoopy_figurine.jpg',
    gallery: ['/images/snoopy_figurine.jpg'],
    category: 'Party Items & Keepsakes',
    categories: ['Party Items & Keepsakes', 'Collector Keepsakes'],
    sku: 'MEM-JS-702',
    tags: ['Peanuts', 'Snoopy', 'Collectible', 'Party Items'],
    shortDescription: 'Handcrafted stone resin Snoopy figurine with folk art quilt motifs and rose garland.',
    fullDescription: 'Beloved Peanuts characters rendered in Jim Shore signature folk art style.',
    features: ['High-density cast stone resin', 'Hand-painted lead-free acrylic', 'Branded gift packaging'],
    requirements: ['Indoor display only'],
    specs: { 'Height': '5.5"' },
    reviews: [],
    inStock: true
  },
  {
    id: 'prod-pizza-plush',
    name: 'Better Together Bestie Keepsake Plush',
    slug: 'better-together-bestie-keepsake-plush',
    price: 64,
    originalPrice: 89,
    rating: 4.7,
    reviewCount: 22,
    image: '/images/pizza_plush.jpg',
    gallery: ['/images/pizza_plush.jpg'],
    category: 'Party Items & Keepsakes',
    categories: ['Party Items & Keepsakes', 'Bestie Gifts'],
    sku: 'MEM-PZ-882',
    tags: ['Bestie Gift', 'Plush', 'Kawaii', 'Party Items'],
    shortDescription: 'Adorable paired plush gift set featuring smiling pizza & soda with personalized friendship tag.',
    fullDescription: 'Magnetic embedded hands that snap together when close.',
    features: ['Magnetic embedded hands', 'Cloud minky fabric', 'Custom friendship tag'],
    requirements: ['Spot clean with damp cloth'],
    specs: { 'Size': '7.0"H x 5.5"W' },
    reviews: [],
    inStock: true
  },
  {
    id: 'prod-crystal-flutes',
    name: 'Twin Crystal Celebration Keepsake Flutes',
    slug: 'twin-crystal-celebration-flutes',
    price: 88,
    originalPrice: 120,
    rating: 5.0,
    reviewCount: 31,
    image: '/images/hero_gift_boxes.jpg',
    gallery: ['/images/hero_gift_boxes.jpg'],
    category: 'Party Items & Keepsakes',
    categories: ['Party Items & Keepsakes', 'Celebration Keepsakes'],
    sku: 'MEM-KP-601',
    tags: ['Crystal', 'Flutes', 'Milestone', 'Party Items'],
    shortDescription: 'Hand-blown 24k gold rimmed European crystal champagne flutes in silk padded box.',
    fullDescription: 'Engineered for royal celebration toasts and treasured wedding anniversaries.',
    features: ['Lead-free crystal', '24k gold rim detailing', 'Silk padded presentation case'],
    requirements: ['Hand wash with lukewarm water only'],
    specs: { 'Capacity': '240ml' },
    reviews: [],
    inStock: true
  },
  {
    id: 'prod-brass-seal-kit',
    name: 'Heirloom Monogram Brass Wax Seal Kit',
    slug: 'heirloom-monogram-brass-wax-seal-kit',
    price: 48,
    originalPrice: 65,
    rating: 4.9,
    reviewCount: 44,
    image: '/images/craft_gift_box.jpg',
    gallery: ['/images/craft_gift_box.jpg'],
    category: 'Party Items & Keepsakes',
    categories: ['Party Items & Keepsakes', 'Stationery'],
    sku: 'MEM-KP-602',
    tags: ['Wax Seal', 'Brass', 'Monogram', 'Party Items'],
    shortDescription: 'Solid turned brass seal stamp with walnut handle, melting spoon & 3 wax sticks.',
    fullDescription: 'Give correspondence an unforgettable royal touch with deeply engraved monogram brass seals.',
    features: ['Turned brass stamp head', 'Walnut wood handle', '3 sticks of flexible sealing wax'],
    requirements: ['Adult supervision required when melting wax'],
    specs: { 'Diameter': '25mm' },
    reviews: [],
    inStock: true
  },
  {
    id: 'prod-botanical-cloche',
    name: 'Rose Quartz Botanical Candle Cloche',
    slug: 'rose-quartz-botanical-candle-cloche',
    price: 72,
    originalPrice: 95,
    rating: 4.8,
    reviewCount: 26,
    image: '/images/encouragement_home_decor.jpg',
    gallery: ['/images/encouragement_home_decor.jpg'],
    category: 'Party Items & Keepsakes',
    categories: ['Party Items & Keepsakes', 'Home Heirlooms'],
    sku: 'MEM-KP-603',
    tags: ['Cloche', 'Candle', 'Rose Quartz', 'Party Items'],
    shortDescription: 'Hand-blown glass bell cloche with raw Brazilian rose quartz crystal topper.',
    fullDescription: 'Extinguishes and protects artisanal botanical candles while radiating natural crystal elegance.',
    features: ['Borosilicate glass dome', 'Raw rose quartz point', 'Wooden base plate'],
    requirements: ['Wipe glass with microfiber cloth'],
    specs: { 'Dimensions': '7"H x 4.5"W' },
    reviews: [],
    inStock: true
  },
  {
    id: 'prod-silk-journal',
    name: 'Gilded Mulberry Silk Keepsake Journal',
    slug: 'gilded-mulberry-silk-keepsake-journal',
    price: 52,
    originalPrice: 70,
    rating: 4.9,
    reviewCount: 37,
    image: '/images/birthday_card_keeper.jpg',
    gallery: ['/images/birthday_card_keeper.jpg'],
    category: 'Party Items & Keepsakes',
    categories: ['Party Items & Keepsakes', 'Stationery'],
    sku: 'MEM-KP-604',
    tags: ['Journal', 'Silk', 'Stationery', 'Party Items'],
    shortDescription: '100% mulberry silk hardcover journal with gold gilded edges and satin bookmark.',
    fullDescription: '192 heavy cream acid-free pages designed to preserve handwritten memories for generations.',
    features: ['22-momme pure silk wrap', 'Gold foil gilded page edges', 'Double satin ribbon ties'],
    requirements: ['Store away from direct sunlight to preserve silk luster'],
    specs: { 'Pages': '192, 120gsm paper' },
    reviews: [],
    inStock: true
  },
  {
    id: 'prod-music-box',
    name: 'Handcrafted Wooden Melody Music Box',
    slug: 'handcrafted-wooden-melody-music-box',
    price: 85,
    originalPrice: 110,
    rating: 5.0,
    reviewCount: 23,
    image: '/images/craft_gift_box.jpg',
    gallery: ['/images/craft_gift_box.jpg'],
    category: 'Party Items & Keepsakes',
    categories: ['Party Items & Keepsakes', 'Artisanal Heirlooms'],
    sku: 'MEM-KP-605',
    tags: ['Music Box', 'Handcrafted', 'Wood', 'Party Items'],
    shortDescription: 'Carved walnut music box playing Clair de Lune with visible gold mechanical gears.',
    fullDescription: 'Hand-wound Sankyo 18-note musical movement in a solid American walnut casket.',
    features: ['Solid American walnut', 'Sankyo 18-note gold movement', 'Velvet interior lining'],
    requirements: ['Do not over-wind the spring key'],
    specs: { 'Dimensions': '4.5" x 3.5" x 2.8"' },
    reviews: [],
    inStock: true
  }
];

export const CAKES_PRODUCTS: Product[] = FIGMA_CUPCAKES;
export const GIFTS_PRODUCTS: Product[] = [MAIN_PRODUCT, ...LUXURY_GIFT_HAMPERS];
export const KEEPSAKES_PRODUCTS: Product[] = RELATED_PRODUCTS;

export const ALL_PRODUCTS: Product[] = [
  MAIN_PRODUCT,
  ...LUXURY_GIFT_HAMPERS,
  ...FIGMA_CUPCAKES,
  ...RELATED_PRODUCTS
];

export const ARTISANAL_TREATS = LUXURY_GIFT_HAMPERS;

export const CART_DEFAULT_ITEMS: { product: Product; quantity: number }[] = [
  {
    product: LUXURY_GIFT_HAMPERS[0],
    quantity: 1
  },
  {
    product: FIGMA_CUPCAKES[1],
    quantity: 1
  }
];

export const REVIEWS_DATA: Review[] = MAIN_PRODUCT.reviews || [];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Art of Thoughtful Gifting: From French Ribbons to Monogram Wax Seals',
    category: 'Gifting Etiquette',
    date: 'Oct 04, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1513201099705-a9742e15a577?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Discover how delicate paper grain, curated aromatic notes, and personalized wax seals transform a gift into a cherished heirloom.'
  },
  {
    id: 'blog-2',
    title: 'Curating the Ultimate Bridesmaid & Milestone Keepsake Boxes',
    category: 'Celebration Guide',
    date: 'Sep 28, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Step inside the Memento design atelier to see how we coordinate blush color palettes, mulberry silks, and bespoke calligraphy.'
  }
];

export const INSTA_POSTS = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=600&q=80',
    likes: 1420,
    caption: 'Bespoke silk bows and golden wax seals for a romantic milestone 🎀✨'
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    likes: 1890,
    caption: 'Handcrafted luxury hampers ready for atelier dispatch 🕊️'
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=600&q=80',
    likes: 980,
    caption: 'The unboxing experience of a lifetime with Memento 🎁'
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80',
    likes: 1250,
    caption: 'Curated keepsakes designed to be treasured forever 💕'
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
    likes: 1640,
    caption: 'Golden foil accents and delicate French confections 🌸'
  }
];

export const AI_GIFT_PRESETS: AiGiftRecommendation[] = [];

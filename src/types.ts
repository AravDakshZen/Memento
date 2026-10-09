export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  category: string;
  categories?: string[];
  sku: string;
  tags: string[];
  shortDescription: string;
  fullDescription?: string;
  features?: string[];
  specs?: Record<string, string>;
  requirements?: string[];
  reviews?: Review[];
  flavor?: string;
  badge?: string;
  inStock: boolean;
  boxContents?: string[];
  ribbonColor?: string;
  isGiftBox?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  giftNote?: string;
  monogram?: string;
}

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  avatar: string;
  comment: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
}


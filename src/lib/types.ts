// BloomBox — Core Type Definitions

// ── Enums as union types ──

export type FlowerType =
  | "roses"
  | "lilies"
  | "carnations"
  | "orchids"
  | "sunflowers"
  | "tulips"
  | "gerberas"
  | "hydrangeas"
  | "marigolds"
  | "jasmine"
  | "lotus"
  | "mixed";

export type Occasion =
  | "birthday"
  | "anniversary"
  | "valentine"
  | "mothers-day"
  | "diwali"
  | "christmas"
  | "sympathy"
  | "congratulations"
  | "get-well"
  | "wedding"
  | "housewarming"
  | "thank-you"
  | "just-because"
  | "corporate"
  | "raksha-bandhan"
  | "eid"
  | "pongal";

export type ColorScheme =
  | "red"
  | "pink"
  | "white"
  | "yellow"
  | "purple"
  | "orange"
  | "mixed"
  | "pastel"
  | "vibrant";

export type ProductCategory =
  | "bouquets"
  | "baskets"
  | "vase-arrangements"
  | "box-arrangements"
  | "indoor-plants"
  | "succulents"
  | "dried-flowers"
  | "preserved-flowers"
  | "combos"
  | "religious"
  | "sympathy";

export type ArrangementSize = "S" | "M" | "L" | "XL";

export type DeliveryType =
  | "standard"
  | "express"
  | "midnight"
  | "fixed-slot"
  | "subscription";

export type OrderStatus =
  | "placed"
  | "accepted"
  | "preparing"
  | "quality-check"
  | "ready"
  | "out-for-delivery"
  | "delivered"
  | "cancelled"
  | "failed";

export type SubscriptionPlan =
  | "petite"
  | "classic"
  | "premium"
  | "luxe"
  | "office-desk"
  | "puja-daily";

export type SubscriptionFrequency = "weekly" | "bi-weekly" | "monthly" | "daily" | "alternate-days";

export type LoyaltyTier = "seed" | "bud" | "bloom" | "garden";

// ── Product ──

export interface SizeVariant {
  size: ArrangementSize;
  label: string;
  price: number;
  stemCount?: string;
}

export interface FlowerComposition {
  flower: string;
  color: string;
  count: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  images: string[];
  category: ProductCategory;
  occasions: Occasion[];
  flowerTypes: FlowerType[];
  colorScheme: ColorScheme;
  sizes: SizeVariant[];
  flowerComposition: FlowerComposition[];
  freshnessDays: number;
  rating: number;
  reviewCount: number;
  floristId: string;
  tags: string[];
  isBestseller?: boolean;
  isSeasonal?: boolean;
  isNew?: boolean;
  addOns?: AddOn[];
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "cake" | "chocolate" | "teddy" | "perfume" | "candle" | "balloon" | "gift-card";
}

// ── Cart ──

export interface MessageCard {
  style: "standard" | "premium" | "handwritten";
  message: string;
  price: number;
}

export interface CartItem {
  id: string;
  product: Product;
  size: ArrangementSize;
  quantity: number;
  addOns: AddOn[];
  messageCard?: MessageCard;
  giftWrap: boolean;
}

export interface Cart {
  items: CartItem[];
  deliveryType: DeliveryType;
  deliverySlot?: string;
  recipientAddress?: Address;
}

// ── User ──

export interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface SavedOccasion {
  id: string;
  name: string;
  date: string;
  recipientName: string;
  recipientAddressId?: string;
  reminderDaysBefore: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  occasions: SavedOccasion[];
  loyaltyPoints: number;
  loyaltyTier: LoyaltyTier;
  wishlist: string[];
}

// ── Orders ──

export interface OrderStatusEvent {
  status: OrderStatus;
  timestamp: string;
  note?: string;
  photo?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: OrderStatus;
  statusHistory: OrderStatusEvent[];
  recipientAddress: Address;
  deliveryType: DeliveryType;
  deliverySlot: string;
  deliveryFee: number;
  subtotal: number;
  total: number;
  paymentMethod: string;
  floristId: string;
  floristName: string;
  createdAt: string;
  deliveredAt?: string;
  deliveryPhoto?: string;
  rating?: number;
  review?: string;
}

// ── Subscriptions ──

export interface SubscriptionPlanInfo {
  id: SubscriptionPlan;
  name: string;
  description: string;
  contents: string;
  pricePerDelivery: number;
  frequencies: SubscriptionFrequency[];
  targetCustomer: string;
  popular?: boolean;
}

export interface UserSubscription {
  id: string;
  plan: SubscriptionPlan;
  frequency: SubscriptionFrequency;
  deliveryDay: string;
  deliveryTime: string;
  colorPreferences: ColorScheme[];
  flowerPreferences: FlowerType[];
  exclusions: string[];
  status: "active" | "paused" | "cancelled";
  nextDelivery?: string;
  startedAt: string;
}

// ── Florists ──

export interface Florist {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  address: string;
  area: string;
  city: string;
  distance?: string;
  deliveryZones: string[];
  deliveryTime: string;
  isVerified: boolean;
  productCount: number;
}

// ── Reviews ──

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  text: string;
  photos: string[];
  occasion?: string;
  createdAt: string;
  floristResponse?: string;
}

// ── Bouquet Builder ──

export interface BuilderFlower {
  id: string;
  name: string;
  color: string;
  pricePerStem: number;
  image: string;
  seasonal: boolean;
  available: boolean;
}

export interface BuilderFiller {
  id: string;
  name: string;
  pricePerStem: number;
  image: string;
}

export interface WrappingOption {
  id: string;
  name: string;
  price: number;
  image: string;
  isEco: boolean;
  type: "wrapping" | "container";
}

export interface BouquetBuilderState {
  flowers: { flower: BuilderFlower; quantity: number }[];
  fillers: { filler: BuilderFiller; quantity: number }[];
  colorPalette: string;
  wrapping: WrappingOption | null;
  messageCard: MessageCard | null;
  step: number;
}

// ── Filters ──

export interface BrowseFilters {
  occasion?: Occasion;
  flowerType?: FlowerType;
  colorScheme?: ColorScheme;
  category?: ProductCategory;
  deliveryType?: DeliveryType;
  priceMin?: number;
  priceMax?: number;
  sort?: "popular" | "price-low" | "price-high" | "newest" | "rating";
  search?: string;
}

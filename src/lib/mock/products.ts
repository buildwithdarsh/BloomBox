import type { Product, AddOn, SubscriptionPlanInfo } from "@/lib/types";

// ── Add-Ons ──

export const addOns: AddOn[] = [
  {
    id: "addon-cake-choco",
    name: "Belgian Chocolate Cake",
    description: "Rich dark chocolate truffle cake, 500g",
    price: 599,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop",
    category: "cake",
  },
  {
    id: "addon-choco-box",
    name: "Premium Chocolate Box",
    description: "Assorted Belgian pralines, 12 pieces",
    price: 499,
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200&h=200&fit=crop",
    category: "chocolate",
  },
  {
    id: "addon-teddy",
    name: "Plush Teddy Bear",
    description: "Soft 12-inch teddy bear",
    price: 399,
    image: "https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=200&h=200&fit=crop",
    category: "teddy",
  },
  {
    id: "addon-candle",
    name: "Scented Soy Candle",
    description: "Lavender & vanilla, 200g, 40hr burn",
    price: 349,
    image: "https://images.unsplash.com/photo-1602607651024-9a205a4e1fbe?w=200&h=200&fit=crop",
    category: "candle",
  },
];

// ── Products ──

export const products: Product[] = [
  // ── Bouquets ──
  {
    id: "prod-001",
    slug: "blush-rose-eucalyptus",
    name: "Blush Rose & Eucalyptus",
    description: "A romantic hand-tied bouquet of soft pink roses interspersed with fragrant eucalyptus and baby's breath. Perfect for anniversaries and romantic gestures. Each stem is hand-selected for peak freshness.",
    shortDescription: "Soft pink roses with eucalyptus & baby's breath",
    images: [
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&h=1000&fit=crop",
    ],
    category: "bouquets",
    occasions: ["anniversary", "valentine", "just-because"],
    flowerTypes: ["roses"],
    colorScheme: "pink",
    sizes: [
      { size: "S", label: "Petite (12 stems)", price: 799, stemCount: "12 stems" },
      { size: "M", label: "Classic (24 stems)", price: 1299, stemCount: "24 stems" },
      { size: "L", label: "Grand (36 stems)", price: 1899, stemCount: "36 stems" },
    ],
    flowerComposition: [
      { flower: "Pink Rose", color: "Blush Pink", count: 12 },
      { flower: "Eucalyptus", color: "Green", count: 6 },
      { flower: "Baby's Breath", color: "White", count: 8 },
    ],
    freshnessDays: 7,
    rating: 4.8,
    reviewCount: 124,
    floristId: "florist-001",
    tags: ["bestseller", "romantic", "roses"],
    isBestseller: true,
    addOns,
  },
  {
    id: "prod-002",
    slug: "sunshine-delight",
    name: "Sunshine Delight",
    description: "Brighten anyone's day with this cheerful bouquet of golden sunflowers, orange gerberas, and sunny yellow carnations. Wrapped in natural kraft paper for a rustic touch.",
    shortDescription: "Sunflowers, gerberas & yellow carnations",
    images: [
      "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&h=1000&fit=crop",
    ],
    category: "bouquets",
    occasions: ["birthday", "get-well", "congratulations", "thank-you"],
    flowerTypes: ["sunflowers", "gerberas", "carnations"],
    colorScheme: "yellow",
    sizes: [
      { size: "S", label: "Petite (8 stems)", price: 699, stemCount: "8 stems" },
      { size: "M", label: "Classic (15 stems)", price: 1099, stemCount: "15 stems" },
      { size: "L", label: "Grand (24 stems)", price: 1699, stemCount: "24 stems" },
    ],
    flowerComposition: [
      { flower: "Sunflower", color: "Yellow", count: 5 },
      { flower: "Gerbera", color: "Orange", count: 5 },
      { flower: "Carnation", color: "Yellow", count: 5 },
    ],
    freshnessDays: 6,
    rating: 4.6,
    reviewCount: 89,
    floristId: "florist-002",
    tags: ["cheerful", "birthday"],
    addOns,
  },
  {
    id: "prod-003",
    slug: "classic-red-roses",
    name: "Classic Red Roses",
    description: "The timeless expression of love. Premium long-stem red roses arranged in a spiral hand-tie with lush greenery. Available in multiple sizes for every budget.",
    shortDescription: "Long-stem red roses in classic spiral arrangement",
    images: [
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&h=1000&fit=crop",
    ],
    category: "bouquets",
    occasions: ["valentine", "anniversary", "just-because"],
    flowerTypes: ["roses"],
    colorScheme: "red",
    sizes: [
      { size: "S", label: "12 Roses", price: 999, stemCount: "12 stems" },
      { size: "M", label: "24 Roses", price: 1799, stemCount: "24 stems" },
      { size: "L", label: "50 Roses", price: 2999, stemCount: "50 stems" },
      { size: "XL", label: "100 Roses", price: 4999, stemCount: "100 stems" },
    ],
    flowerComposition: [
      { flower: "Red Rose", color: "Deep Red", count: 24 },
      { flower: "Ruscus", color: "Green", count: 8 },
    ],
    freshnessDays: 7,
    rating: 4.9,
    reviewCount: 312,
    floristId: "florist-001",
    tags: ["bestseller", "romantic", "premium"],
    isBestseller: true,
    addOns,
  },
  {
    id: "prod-004",
    slug: "lavender-dreams",
    name: "Lavender Dreams",
    description: "A soothing pastel arrangement of purple roses, lavender sprigs, and white lisianthus. Wrapped in tissue paper with a satin ribbon — ideal for calming gestures.",
    shortDescription: "Purple roses, lavender & white lisianthus",
    images: [
      "https://images.unsplash.com/photo-1495231916356-a86217efff12?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=1000&fit=crop",
    ],
    category: "bouquets",
    occasions: ["birthday", "get-well", "thank-you", "just-because"],
    flowerTypes: ["roses", "mixed"],
    colorScheme: "purple",
    sizes: [
      { size: "S", label: "Petite", price: 849 },
      { size: "M", label: "Classic", price: 1399 },
      { size: "L", label: "Grand", price: 1999 },
    ],
    flowerComposition: [
      { flower: "Purple Rose", color: "Lavender", count: 8 },
      { flower: "Lavender", color: "Purple", count: 10 },
      { flower: "Lisianthus", color: "White", count: 6 },
    ],
    freshnessDays: 6,
    rating: 4.7,
    reviewCount: 67,
    floristId: "florist-003",
    tags: ["pastel", "calming"],
    addOns,
  },
  // ── Vase Arrangements ──
  {
    id: "prod-005",
    slug: "orchid-elegance-vase",
    name: "Orchid Elegance",
    description: "Stunning white phalaenopsis orchid in a minimalist ceramic pot. A statement piece for modern homes and executive desks. Lasts 4–8 weeks with proper care.",
    shortDescription: "White phalaenopsis orchid in ceramic pot",
    images: [
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=600&fit=crop",
    ],
    category: "vase-arrangements",
    occasions: ["corporate", "housewarming", "thank-you"],
    flowerTypes: ["orchids"],
    colorScheme: "white",
    sizes: [
      { size: "S", label: "Single Stem", price: 1299 },
      { size: "M", label: "Double Stem", price: 1999 },
      { size: "L", label: "Triple Stem", price: 2799 },
    ],
    flowerComposition: [
      { flower: "Phalaenopsis Orchid", color: "White", count: 2 },
    ],
    freshnessDays: 42,
    rating: 4.9,
    reviewCount: 156,
    floristId: "florist-001",
    tags: ["luxury", "long-lasting", "corporate"],
    addOns,
  },
  // ── Box Arrangements ──
  {
    id: "prod-006",
    slug: "rose-hat-box",
    name: "Rose Hat Box",
    description: "Luxurious arrangement of mixed roses nestled in a velvet-lined hat box. The box itself becomes a keepsake. Available in signature pink or classic black.",
    shortDescription: "Mixed roses in premium velvet hat box",
    images: [
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&h=1000&fit=crop",
    ],
    category: "box-arrangements",
    occasions: ["birthday", "anniversary", "valentine", "mothers-day"],
    flowerTypes: ["roses"],
    colorScheme: "mixed",
    sizes: [
      { size: "S", label: "Petite Box (15 roses)", price: 1499 },
      { size: "M", label: "Classic Box (25 roses)", price: 2299 },
      { size: "L", label: "Grand Box (40 roses)", price: 3499 },
    ],
    flowerComposition: [
      { flower: "Rose", color: "Mixed (Pink, Red, White)", count: 25 },
    ],
    freshnessDays: 7,
    rating: 4.8,
    reviewCount: 203,
    floristId: "florist-002",
    tags: ["luxury", "gift", "keepsake"],
    isBestseller: true,
    addOns,
  },
  // ── Indoor Plants ──
  {
    id: "prod-007",
    slug: "peace-lily-ceramic",
    name: "Peace Lily in Ceramic",
    description: "An elegant peace lily in a handcrafted ceramic pot. Air-purifying, low-maintenance, and pet-friendly — perfect for homes and offices. Comes with a detailed care guide.",
    shortDescription: "Air-purifying peace lily in handcrafted ceramic pot",
    images: [
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=800&h=1000&fit=crop",
    ],
    category: "indoor-plants",
    occasions: ["housewarming", "corporate", "just-because"],
    flowerTypes: ["mixed"],
    colorScheme: "white",
    sizes: [
      { size: "S", label: "Small (6-inch pot)", price: 599 },
      { size: "M", label: "Medium (8-inch pot)", price: 899 },
      { size: "L", label: "Large (10-inch pot)", price: 1299 },
    ],
    flowerComposition: [
      { flower: "Peace Lily", color: "Green/White", count: 1 },
    ],
    freshnessDays: 365,
    rating: 4.7,
    reviewCount: 98,
    floristId: "florist-003",
    tags: ["air-purifying", "pet-safe", "low-maintenance", "plant"],
    addOns: [],
  },
  // ── Dried & Preserved ──
  {
    id: "prod-008",
    slug: "pampas-dried-bouquet",
    name: "Pampas & Dried Rose Bouquet",
    description: "A gorgeous arrangement of natural pampas grass, dried roses, bunny tails, and preserved eucalyptus. Lasts 1–2 years with zero maintenance. Instagram-worthy home decor.",
    shortDescription: "Pampas grass, dried roses & bunny tails",
    images: [
      "https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=800&h=600&fit=crop",
    ],
    category: "dried-flowers",
    occasions: ["housewarming", "birthday", "just-because"],
    flowerTypes: ["mixed"],
    colorScheme: "pastel",
    sizes: [
      { size: "S", label: "Mini Bundle", price: 799 },
      { size: "M", label: "Classic Bundle", price: 1499 },
      { size: "L", label: "Statement Bundle", price: 2499 },
    ],
    flowerComposition: [
      { flower: "Pampas Grass", color: "Natural", count: 5 },
      { flower: "Dried Rose", color: "Blush", count: 6 },
      { flower: "Bunny Tail", color: "White", count: 8 },
    ],
    freshnessDays: 730,
    rating: 4.6,
    reviewCount: 145,
    floristId: "florist-001",
    tags: ["long-lasting", "dried", "home-decor", "zero-maintenance"],
    isNew: true,
    addOns: [],
  },
  // ── Combos ──
  {
    id: "prod-009",
    slug: "roses-chocolate-teddy",
    name: "Love Bundle",
    description: "The ultimate gifting combo — a bouquet of red roses paired with premium Belgian chocolates and a cuddly teddy bear. All beautifully gift-wrapped together.",
    shortDescription: "Red roses + chocolates + teddy bear combo",
    images: [
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=1000&fit=crop",
    ],
    category: "combos",
    occasions: ["valentine", "birthday", "anniversary"],
    flowerTypes: ["roses"],
    colorScheme: "red",
    sizes: [
      { size: "S", label: "Sweet (12 roses + chocolate)", price: 1299 },
      { size: "M", label: "Deluxe (24 roses + chocolate + teddy)", price: 2199 },
      { size: "L", label: "Grand (36 roses + cake + chocolate + teddy)", price: 3499 },
    ],
    flowerComposition: [
      { flower: "Red Rose", color: "Red", count: 24 },
    ],
    freshnessDays: 7,
    rating: 4.7,
    reviewCount: 178,
    floristId: "florist-002",
    tags: ["combo", "gift", "bestseller"],
    isBestseller: true,
    addOns: [],
  },
  // ── Wedding ──
  {
    id: "prod-010",
    slug: "bridal-cascade-bouquet",
    name: "Bridal Cascade Bouquet",
    description: "An exquisite cascading bridal bouquet with white peonies, garden roses, and trailing greenery. Designed for the modern bride who wants timeless elegance.",
    shortDescription: "White peonies & garden roses cascading bouquet",
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1000&fit=crop",
    ],
    category: "bouquets",
    occasions: ["wedding"],
    flowerTypes: ["roses", "mixed"],
    colorScheme: "white",
    sizes: [
      { size: "M", label: "Classic Cascade", price: 3999 },
      { size: "L", label: "Grand Cascade", price: 5999 },
    ],
    flowerComposition: [
      { flower: "White Peony", color: "White", count: 8 },
      { flower: "Garden Rose", color: "Ivory", count: 10 },
      { flower: "Eucalyptus", color: "Green", count: 12 },
    ],
    freshnessDays: 5,
    rating: 5.0,
    reviewCount: 45,
    floristId: "florist-001",
    tags: ["wedding", "bridal", "premium"],
    addOns: [],
  },
  // ── Religious ──
  {
    id: "prod-011",
    slug: "puja-marigold-garland",
    name: "Puja Marigold & Rose Thali",
    description: "Fresh marigold garlands, rose petals, jasmine strings, and a curated puja thali — everything you need for daily worship or special ceremonies.",
    shortDescription: "Marigold garlands, rose petals & jasmine for puja",
    images: [
      "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=800&h=600&fit=crop",
    ],
    category: "religious",
    occasions: ["diwali", "pongal"],
    flowerTypes: ["marigolds", "jasmine"],
    colorScheme: "yellow",
    sizes: [
      { size: "S", label: "Daily Puja", price: 149 },
      { size: "M", label: "Special Puja", price: 399 },
      { size: "L", label: "Festival Thali", price: 699 },
    ],
    flowerComposition: [
      { flower: "Marigold", color: "Orange/Yellow", count: 20 },
      { flower: "Rose Petals", color: "Red", count: 50 },
      { flower: "Jasmine", color: "White", count: 15 },
    ],
    freshnessDays: 2,
    rating: 4.5,
    reviewCount: 234,
    floristId: "florist-003",
    tags: ["religious", "daily", "puja"],
    addOns: [],
  },
  // ── Succulents ──
  {
    id: "prod-012",
    slug: "succulent-garden-set",
    name: "Succulent Garden Set",
    description: "A curated collection of 5 mini succulents in hand-painted ceramic pots. Perfect for desks, windowsills, and shelves. Includes a care card and drainage pebbles.",
    shortDescription: "5 mini succulents in hand-painted ceramic pots",
    images: [
      "https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=1000&fit=crop",
    ],
    category: "succulents",
    occasions: ["housewarming", "birthday", "corporate"],
    flowerTypes: ["mixed"],
    colorScheme: "mixed",
    sizes: [
      { size: "S", label: "Set of 3", price: 499 },
      { size: "M", label: "Set of 5", price: 799 },
      { size: "L", label: "Set of 8", price: 1199 },
    ],
    flowerComposition: [
      { flower: "Echeveria", color: "Green/Pink", count: 2 },
      { flower: "Haworthia", color: "Green", count: 1 },
      { flower: "Jade Plant", color: "Green", count: 1 },
      { flower: "Aloe Vera", color: "Green", count: 1 },
    ],
    freshnessDays: 365,
    rating: 4.8,
    reviewCount: 87,
    floristId: "florist-002",
    tags: ["plant", "beginner-friendly", "low-maintenance"],
    isNew: true,
    addOns: [],
  },
];

// ── Subscription Plans ──

export const subscriptionPlans: SubscriptionPlanInfo[] = [
  {
    id: "petite",
    name: "Petite",
    description: "A charming mini bouquet to brighten your space",
    contents: "5–7 seasonal stems, kraft-wrapped",
    pricePerDelivery: 399,
    frequencies: ["weekly", "bi-weekly"],
    targetCustomer: "Budget-friendly, first-time subscribers",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Our most popular plan with a full, lush bouquet",
    contents: "10–12 stems, premium wrap, flower food included",
    pricePerDelivery: 699,
    frequencies: ["weekly", "bi-weekly"],
    targetCustomer: "Regular home decor enthusiasts",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    description: "A designer arrangement with a beautiful vase",
    contents: "15+ stems, designer vase (first delivery), premium arrangement",
    pricePerDelivery: 999,
    frequencies: ["weekly", "bi-weekly", "monthly"],
    targetCustomer: "Design-conscious, gifting",
  },
  {
    id: "luxe",
    name: "Luxe",
    description: "The ultimate floral experience with exotics",
    contents: "20+ stems, premium container, exotic flowers included",
    pricePerDelivery: 1499,
    frequencies: ["weekly", "bi-weekly"],
    targetCustomer: "High-end homes, corporate reception",
  },
  {
    id: "office-desk",
    name: "Office Desk",
    description: "Compact desk-friendly arrangement",
    contents: "3–5 compact stems, desktop vase (first delivery)",
    pricePerDelivery: 299,
    frequencies: ["weekly", "bi-weekly"],
    targetCustomer: "Office workers, desk decor",
  },
  {
    id: "puja-daily",
    name: "Puja / Daily",
    description: "Fresh loose flowers for daily worship",
    contents: "Marigold, rose petals, jasmine, mogra",
    pricePerDelivery: 79,
    frequencies: ["daily", "alternate-days"],
    targetCustomer: "Daily puja, religious ceremonies",
  },
];

// ── Helper ──

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsByOccasion(occasion: string): Product[] {
  return products.filter((p) => p.occasions.includes(occasion as Product["occasions"][number]));
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller);
}

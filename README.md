> This project is made with the help of Claude (1M context).

# BloomBox

Online floral marketplace for customized bouquets, occasion gifting, and recurring deliveries.

## Overview

BloomBox lets users browse curated collections, build personalized bouquets via an interactive builder, subscribe to weekly/monthly deliveries, discover local florists, and manage orders with real-time tracking. Built for occasion-focused gifting — birthdays, anniversaries, weddings, festivals, and corporate events.

## Features

- **Bouquet builder** — Interactive customization (flower types, colors, occasion)
- **Shop** — Pre-designed bouquets by occasion (birthday, anniversary, wedding, Valentine, Diwali, Christmas)
- **Florist directory** — Discover and filter local florists with ratings
- **Subscriptions** — Weekly/monthly recurring deliveries
- **Event marketplace** — Corporate events, weddings, fundraisers
- **Cart + checkout** — Guest and authenticated flows
- **Real-time toasts** — Order status and delivery tracking via Sonner
- **Dark mode** — next-themes integration
- **Command palette** — Keyboard-driven navigation via cmdk

## Tech Stack

- **Framework:** Next.js 16.2, React 19.2, TypeScript 5
- **Styling:** Tailwind CSS 4 + Base UI + shadcn
- **Animation:** Framer Motion + tw-animate-css
- **Toast:** Sonner
- **Theme:** next-themes
- **Icons:** Lucide React + React Icons
- **SDK:** @buildwithdarsh/sdk

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint

## Project Structure

```
src/
├── app/(shop)/        # home, shop, bouquet-builder, subscriptions, profile, cart, florists, events
├── components/        # Reusable UI (shadcn-style)
├── providers/         # User and cart context providers
├── hooks/             # useUser, useCart
└── lib/
    ├── types.ts       # FlowerType, Occasion, ColorScheme types
    └── mock-data.ts   # Demo products and florists
```

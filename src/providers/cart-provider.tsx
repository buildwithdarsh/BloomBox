"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, AddOn, ArrangementSize, DeliveryType, Product, MessageCard } from "@/lib/types";

interface CartContextValue {
  items: CartItem[];
  deliveryType: DeliveryType;
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  addItem: (product: Product, size: ArrangementSize, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateSize: (itemId: string, size: ArrangementSize) => void;
  toggleAddOn: (itemId: string, addOn: AddOn) => void;
  setMessageCard: (itemId: string, card: MessageCard | undefined) => void;
  toggleGiftWrap: (itemId: string) => void;
  setDeliveryType: (type: DeliveryType) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "bloombox-cart";

const DELIVERY_FEES: Record<DeliveryType, number> = {
  standard: 49,
  express: 199,
  midnight: 249,
  "fixed-slot": 149,
  subscription: 0,
};

function getStoredCart(): { items: CartItem[]; deliveryType: DeliveryType } {
  if (typeof window === "undefined") return { items: [], deliveryType: "standard" };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { items: [], deliveryType: "standard" };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("standard");
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = getStoredCart();
    setItems(stored.items);
    setDeliveryType(stored.deliveryType);
    setHydrated(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, deliveryType }));
  }, [items, deliveryType, hydrated]);

  const addItem = useCallback(
    (product: Product, size: ArrangementSize, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.product.id === product.id && i.size === size
        );
        if (existing) {
          return prev.map((i) =>
            i.id === existing.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        const newItem: CartItem = {
          id: `cart-${Date.now()}`,
          product,
          size,
          quantity,
          addOns: [],
          giftWrap: false,
        };
        return [...prev, newItem];
      });
    },
    []
  );

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  }, []);

  const updateSize = useCallback((itemId: string, size: ArrangementSize) => {
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, size } : i))
    );
  }, []);

  const toggleAddOn = useCallback((itemId: string, addOn: AddOn) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== itemId) return i;
        const has = i.addOns.find((a) => a.id === addOn.id);
        return {
          ...i,
          addOns: has
            ? i.addOns.filter((a) => a.id !== addOn.id)
            : [...i.addOns, addOn],
        };
      })
    );
  }, []);

  const setMessageCard = useCallback(
    (itemId: string, card: MessageCard | undefined) => {
      setItems((prev) =>
        prev.map((i) =>
          i.id === itemId ? { ...i, messageCard: card } : i
        )
      );
    },
    []
  );

  const toggleGiftWrap = useCallback((itemId: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === itemId ? { ...i, giftWrap: !i.giftWrap } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setDeliveryType("standard");
  }, []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    const sizeVariant = item.product.sizes.find((s) => s.size === item.size);
    const basePrice = sizeVariant?.price ?? 0;
    const addOnTotal = item.addOns.reduce((a, ao) => a + ao.price, 0);
    const cardPrice = item.messageCard?.price ?? 0;
    const wrapPrice = item.giftWrap ? 99 : 0;
    return sum + (basePrice + addOnTotal + cardPrice + wrapPrice) * item.quantity;
  }, 0);

  const deliveryFee = DELIVERY_FEES[deliveryType];
  const total = subtotal + deliveryFee;

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      deliveryType,
      itemCount,
      subtotal,
      deliveryFee,
      total,
      addItem,
      removeItem,
      updateQuantity,
      updateSize,
      toggleAddOn,
      setMessageCard,
      toggleGiftWrap,
      setDeliveryType,
      clearCart,
    }),
    [
      items,
      deliveryType,
      itemCount,
      subtotal,
      deliveryFee,
      total,
      addItem,
      removeItem,
      updateQuantity,
      updateSize,
      toggleAddOn,
      setMessageCard,
      toggleGiftWrap,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

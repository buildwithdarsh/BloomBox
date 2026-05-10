"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/lib/types";
import { mockUser } from "@/lib/mock/user";

interface UserContextValue {
  user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const UserContext = createContext<UserContextValue | null>(null);

const STORAGE_KEY = "bloombox-user";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user, hydrated]);

  const login = useCallback(() => {
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      const has = prev.wishlist.includes(productId);
      return {
        ...prev,
        wishlist: has
          ? prev.wishlist.filter((id) => id !== productId)
          : [...prev.wishlist, productId],
      };
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => user?.wishlist.includes(productId) ?? false,
    [user]
  );

  const value = useMemo<UserContextValue>(
    () => ({
      user,
      isLoggedIn: !!user,
      login,
      logout,
      toggleWishlist,
      isInWishlist,
    }),
    [user, login, logout, toggleWishlist, isInWishlist]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

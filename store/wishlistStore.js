import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useWishlistStore = create(
  persist(
    (set) => ({
      items: [],
      toggle: (product) =>
        set((state) => ({
          items: state.items.some((p) => p.id === product.id)
            ? state.items.filter((p) => p.id !== product.id)
            : [...state.items, product],
        })),
    }),
    { name: "creative-child-wishlist" },
  ),
);

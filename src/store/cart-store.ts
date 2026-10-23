import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "cartId">) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  removeItem: (cartId: string) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.variantId === newItem.variantId
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += newItem.quantity;
            return { items: updated, isOpen: true };
          }

          const cartId = `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
          return {
            items: [...state.items, { ...newItem, cartId }],
            isOpen: true,
          };
        });
      },

      updateQuantity: (cartId, quantity) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.cartId === cartId
                ? { ...item, quantity: Math.max(1, quantity) }
                : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      removeItem: (cartId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartId !== cartId),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.unitPrice * item.quantity,
          0
        );
      },
    }),
    {
      name: "hermes-subscriptions-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

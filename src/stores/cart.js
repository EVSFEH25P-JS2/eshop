import { create } from "zustand";

const useCartStore = create((set) => ({
  items: [],

  addOrIncrementItem: (product) => {
    set((prev) => {
      const existing = prev.items.find(
        (item) => item.product.id === product.id,
      );
      if (existing) {
        return {
          items: prev.items.map((item) =>
            item.product.id === product.id
              ? { ...item, amount: item.amount + 1 }
              : item,
          ),
        };
      } else {
        return { items: [...prev.items, { amount: 1, product }] };
      }
    });
  },

  removeItem: (productId) => {
    set((prev) => ({
      items: prev.items.filter((item) => item.product.id !== productId),
    }));
  },

  decrementItem: (productId) => {
    set((prev) => {
      const existing = prev.items.find((item) => item.product.id === productId);
      if (!existing) return { items: prev.items };

      if (existing.amount === 1) {
        return {
          items: prev.items.filter((item) => item.product.id !== productId),
        };
      }

      return {
        items: prev.items.map((item) =>
          item.product.id === productId
            ? { ...item, amount: item.amount - 1 }
            : item,
        ),
      };
    });
  },

  clearItems: () => set({ items: [] }),
}));

const useCartOpenStore = create((set) => ({
  open: false,

  toggle: () =>
    set((state) => ({
      open: !state.open,
    })),
}));

export { useCartStore, useCartOpenStore };

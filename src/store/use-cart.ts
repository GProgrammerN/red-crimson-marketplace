import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);

          if (existingItem) {
            const items = state.items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            );
            return {
              items,
              totalItems: items.reduce((acc, i) => acc + i.quantity, 0),
              totalPrice: items.reduce(
                (acc, i) => acc + i.price * i.quantity,
                0
              ),
            };
          }

          const items = [...state.items, { ...item, quantity: 1 }];
          return {
            items,
            totalItems: items.reduce((acc, i) => acc + i.quantity, 0),
            totalPrice: items.reduce(
              (acc, i) => acc + i.price * i.quantity,
              0
            ),
          };
        });
      },

      removeItem: (id) => {
        set((state) => {
          const items = state.items.filter((i) => i.id !== id);
          return {
            items,
            totalItems: items.reduce((acc, i) => acc + i.quantity, 0),
            totalPrice: items.reduce(
              (acc, i) => acc + i.price * i.quantity,
              0
            ),
          };
        });
      },

      updateQuantity: (id, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            const items = state.items.filter((i) => i.id !== id);
            return {
              items,
              totalItems: items.reduce((acc, i) => acc + i.quantity, 0),
              totalPrice: items.reduce(
                (acc, i) => acc + i.price * i.quantity,
                0
              ),
            };
          }

          const items = state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          );
          return {
            items,
            totalItems: items.reduce((acc, i) => acc + i.quantity, 0),
            totalPrice: items.reduce(
              (acc, i) => acc + i.price * i.quantity,
              0
            ),
          };
        });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    {
      name: "red-crimson-cart",
    }
  )
);

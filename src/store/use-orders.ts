import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OrderItemData = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type OrderData = {
  id: string;
  date: string;
  total: number;
  items: OrderItemData[];
  customerName: string;
  customerEmail: string;
};

type OrdersStore = {
  orders: OrderData[];
  addOrder: (order: OrderData) => void;
  clearOrders: () => void;
};

export const useOrders = create<OrdersStore>()(
  persist(
    (set) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },

      clearOrders: () => {
        set({ orders: [] });
      },
    }),
    {
      name: "red-crimson-orders",
    }
  )
);

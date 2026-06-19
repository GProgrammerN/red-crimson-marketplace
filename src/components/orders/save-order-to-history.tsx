"use client";

import { useEffect } from "react";
import { useOrders } from "@/store/use-orders";

type SaveOrderToHistoryProps = {
  orderId: string;
  total: number;
  customerName: string;
  customerEmail: string;
  items: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }[];
};

/**
 * Client component that saves the completed order to localStorage
 * via the Zustand orders store. Renders nothing visually.
 */
export function SaveOrderToHistory({
  orderId,
  total,
  customerName,
  customerEmail,
  items,
}: SaveOrderToHistoryProps) {
  const addOrder = useOrders((state) => state.addOrder);

  useEffect(() => {
    addOrder({
      id: orderId,
      date: new Date().toISOString(),
      total,
      items,
      customerName,
      customerEmail,
    });
  }, []); // Run once on mount

  return null;
}

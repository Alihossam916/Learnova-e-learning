import { create } from "zustand";


interface Order {
  courseId: string;
  courseTitle: string;
  price: number;
  transactionId?: string;
  status: "pending" | "completed" | "failed";
}

type CheckoutStore = {
  order: Order | null;
  setOrder: (order: Order) => void;
  clearOrder: () => void;
};

export const useCheckoutStore = create<CheckoutStore>((set) =>({
  order: null,
  setOrder: (order: Order) => set({ order }),
  clearOrder: () => set({ order: null }),
}));
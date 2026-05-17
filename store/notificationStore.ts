import { create } from "zustand";

export type NotificationType = "success" | "error" | "info" | "warning";

type NotificationStore = {
  visible: boolean;
  closing: boolean;
  type: NotificationType;
  message: string;
  id: number;
  showNotification: (type: NotificationType, message: string) => void;
  hideNotification: () => void;
  setClosing: (closing: boolean) => void;
};

let nextId = 0;

export const useNotificationStore = create<NotificationStore>((set) => ({
  visible: false,
  closing: false,
  type: "info",
  message: "",
  id: 0,
  showNotification: (type, message) =>
    set({ visible: true, closing: false, type, message, id: ++nextId }),
  hideNotification: () => set({ visible: false, closing: false }),
  setClosing: (closing) => set({ closing }),
}));

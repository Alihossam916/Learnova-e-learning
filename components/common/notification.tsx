"use client";

import { useCallback, useEffect, useRef } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useNotificationStore } from "@/store/notificationStore";

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: "border-chart-3 bg-chart-3/20",
  error: "border-destructive bg-destructive/20",
  warning: "border-chart-5 bg-chart-5/20",
  info: "border-primary bg-primary/20",
};

const iconColorMap = {
  success: "text-chart-3",
  error: "text-destructive",
  warning: "text-chart-5",
  info: "text-primary",
};

const DISPLAY_DURATION = 5000;
const ANIMATION_DURATION = 300;

export function Notification() {
  const { visible, closing, type, message, id, hideNotification, setClosing } =
    useNotificationStore();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHovered = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const close = useCallback(() => {
    clearTimer();
    setClosing(true);
    timerRef.current = setTimeout(() => {
      hideNotification();
    }, ANIMATION_DURATION);
  }, [clearTimer, setClosing, hideNotification]);

  const scheduleAutoClose = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => close(), DISPLAY_DURATION);
  }, [clearTimer, close]);

  useEffect(() => {
    if (visible) {
      if (!isHovered.current) {
        scheduleAutoClose();
      }
    }
  }, [id, scheduleAutoClose, visible]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  if (!visible && !closing) return null;

  const Icon = iconMap[type];

  return (
    <div
      key={id}
      role="alert"
      onMouseEnter={() => {
        isHovered.current = true;
        clearTimer();
      }}
      onMouseLeave={() => {
        isHovered.current = false;
        if (!closing) {
          scheduleAutoClose();
        }
      }}
      className={`fixed top-20 right-0 xs:right-2 sm:right-8 z-50 flex items-start gap-3 max-w-sm w-full p-4 rounded-sm border-2 shadow-lg transition-transform duration-300 ease-in-out ${
        colorMap[type]
      } ${
        closing ? "translate-x-[calc(100%+2rem)]" : "translate-x-0"
      }`}
    >
      <Icon
        className={`size-5 mt-0.5 shrink-0 ${iconColorMap[type]}`}
      />
      <p className="text-sm text-foreground flex-1">{message}</p>
      <button
        onClick={close}
        className="shrink-0 size-5 flex items-center justify-center rounded-sm text-muted-foreground hover:text-foreground hover:bg-input transition-colors duration-200 cursor-pointer"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}

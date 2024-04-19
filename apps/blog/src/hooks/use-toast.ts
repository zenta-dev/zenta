import { createContext, useContext } from "react";

interface ToastProviderState {
  isExpanded: boolean;
  limit: number;
  setIsExpanded: (value: boolean) => void;
  setLimit: (value: number) => void;
}

export const ToastContext = createContext<ToastProviderState | undefined>(
  undefined
);
export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

"use client";
import { Toaster } from "@/components/ui/sonner";
import { ToastContext } from "@/hooks/use-toast";
import { ReactNode, useState } from "react";

export const ToastProvider = ({
  children,
  defaultLimit = 3,
}: {
  children: ReactNode;
  defaultLimit?: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [limit, setLimit] = useState(defaultLimit);
  return (
    <ToastContext.Provider
      value={{ isExpanded, setIsExpanded, limit, setLimit }}
    >
      {children}
      <Toaster
        richColors
        closeButton
        expand={isExpanded}
        visibleToasts={limit}
      />
    </ToastContext.Provider>
  );
};

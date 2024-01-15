import { createContext } from "react";

export type ToastType = "error" | "warning" | "info" | "success"

export const ToastContext = createContext<{ toast: (message: string, kind: ToastType)=>void }>({ toast: (message: string, kind: ToastType) => {} })
export const ToastProvider = ToastContext.Provider
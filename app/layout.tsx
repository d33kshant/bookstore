"use client"

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { Alert, Box, Snackbar } from '@mui/material'
import { useReducer, useState } from 'react'
import AppBar from '@/app/components/AppBar'
import AppDrawer from '@/app/components/AppDrawer'
import { StoreInit, StoreReducer } from "@/app/reducers/StoreReducer"

import './globals.css'
import { CartProvider } from "./contexts/StoreContext"
import { ToastProvider, ToastType } from "./contexts/ToastContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [ state, dispatch ] = useReducer(StoreReducer, { cart: [] }, StoreInit)

  const [toastOpen, setToastOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string, kind: ToastType } | null>(null)

  const [drawerOpen, setDrawerOpen] = useState(false)

  const onMenuClick = () => setDrawerOpen(prev => !prev)
  const onDrawerClose = () => setDrawerOpen(false)
  const onDrawerOpen = () => setDrawerOpen(true)

  const showToast = (message: string, kind: ToastType = "info") => {
    setToast({ message, kind })
    setToastOpen(true)
  }

  const closeToast = () => {
    setToastOpen(false)
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <CartProvider value={{ state, dispatch }}>
          <Box>
            <AppBar onMenuClick={onMenuClick} />
            <AppDrawer open={drawerOpen} onOpen={onDrawerOpen} onClose={onDrawerClose} />
            <ToastProvider value={{ toast: showToast }}>
              <Box display="flex" justifyContent="center">
                <Box width="100%" maxWidth={800} display="flex" flexDirection="column" p={2} gap={2}>
                  {children}
                </Box>
              </Box>
            </ToastProvider>
            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={toastOpen} onClose={closeToast} autoHideDuration={5000}>
              {<Alert variant="filled" onClose={closeToast} severity={toast?.kind || "info"}>{toast?.message || ''}</Alert>}
            </Snackbar>
          </Box>
          </CartProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}

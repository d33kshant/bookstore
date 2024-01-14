"use client"

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { Box } from '@mui/material'
import { useReducer, useState } from 'react'
import AppBar from '@/app/components/AppBar'
import AppDrawer from '@/app/components/AppDrawer'
import { CartInit, CartReducer } from "@/app/reducers/CartReducer"

import './globals.css'
import { CartProvider } from "./contexts/CartContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [ state, dispatch ] = useReducer(CartReducer, { cart: [] }, CartInit)

  const [draweOpen, setDrawerOpen] = useState(false)

  const onMenuClick = () => setDrawerOpen(prev => !prev)
  const onDrawerClose = () => setDrawerOpen(false)
  const onDrawerOpen = () => setDrawerOpen(true)

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
            <AppDrawer open={draweOpen} onOpen={onDrawerOpen} onClose={onDrawerClose} />
            <Box display="flex" justifyContent="center">
              <Box width="100%" maxWidth={800} display="flex" flexDirection="column" p={2} gap={2}>
                {children}
              </Box>
            </Box>
          </Box>
          </CartProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}

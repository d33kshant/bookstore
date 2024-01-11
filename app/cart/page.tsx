"use client"
import { Box, Divider, Paper, Typography } from "@mui/material"
import AppBar from "@/app/components/AppBar"
import { useEffect, useState } from "react"
import { Book } from "@prisma/client"
import CartItem from "../components/CartItem"

export default function CartPage() {
  const [cart, setCart] = useState<Book[]>([])
  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch('/api/books/top')
      const data = await response.json()
      if (data) setCart(data.books)
    }
    fetchCart()
  }, [])
  return (
    <Box>
      <AppBar />
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" width="100%" maxWidth={800} p={2} gap={2}>
          <Paper>
            <Box display="flex" flexDirection="column">
              <Box px={2} py={1}>
                <Typography textTransform="uppercase" variant="h6">Cart (3)</Typography>
              </Box>
              <Divider />
              <Box display="flex" flexDirection="column">
                { cart.map((book, key)=><CartItem key={key} {...book} />) }
              </Box>
            </Box>
          </Paper>
          <Paper>
            <Box>
              <Box px={2} py={1}>
                <Typography textTransform="uppercase" variant="h6">Cart Info</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}
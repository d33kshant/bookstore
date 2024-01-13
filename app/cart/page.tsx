"use client"
import { Box, Button, Divider, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Book } from "@prisma/client"
import CartItem from "@/app/components/CartItem"

export default function CartPage() {
  const [cart, setCart] = useState<Book[]>([])
  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch('/api/books/top')
      const data = await response.json()
      if (data) setCart(data.books.splice(0, 6))
    }
    fetchCart()
  }, [])

  const price = cart.reduce((ac, curr) => ac + curr.original_price, 0)
  const discount = cart.reduce((ac, curr) => ac + (curr.original_price - curr.selling_price), 0)

  return (
    <Box display="flex" width="100%" sx={{ flexDirection: { xs: "column", sm: "row" } }} gap={2}>
      <Paper sx={{ flex: 1 }}>
        <Box display="flex" flexDirection="column">
          <Box px={2} py={1}>
            <Typography textTransform="uppercase" variant="h6">Cart ({cart.length})</Typography>
          </Box>
          <Divider />
          <Box display="flex" flexDirection="column">
            {cart.map((book, key) => <CartItem lastItem={key === cart.length - 1} key={key} {...book} />)}
          </Box>
        </Box>
      </Paper>
      <Paper sx={{ height: "fit-content", minWidth: 300, position: "sticky", top: 80 }}>
        <Box>
          <Box px={2} py={1}>
            <Typography textTransform="uppercase" variant="h6">Cart Info</Typography>
          </Box>
          <Divider />
          <Box display="flex" flexDirection="column" p={1}>
            <Box px={1} py={1} display="flex">
              <Typography flex={1}>Price</Typography>
              <Typography>${price}</Typography>
            </Box>
            <Box p={1} display="flex">
              <Typography flex={1}>Discount</Typography>
              <Typography color="green">${discount}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box p={1} display="flex">
              <Typography variant="h6" fontWeight={500} flex={1}>Total Amount</Typography>
              <Typography variant="h6" fontWeight={500}>${price - discount}</Typography>
            </Box>
            <Divider sx={{ mt: 1 }} />
          </Box>
          <Box display="flex" px={1} mb={1}>
            <Button disableElevation variant="contained" sx={{ flex: 1 }}>Checkout</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
"use client"
import { Box, Button, Divider, Paper, Typography } from "@mui/material"
import { useContext } from "react"
import CartItem from "@/app/components/CartItem"
import { CartContext } from "@/app/contexts/CartContext"
import { CartActionType } from "../reducers/CartReducer"

export default function CartPage() {
  const { state: { cart }, dispatch } = useContext(CartContext)

  const price = cart.reduce((ac, curr) => ac + curr.original_price * curr.count, 0)
  const discount = cart.reduce((ac, curr) => ac + (curr.original_price - curr.selling_price) * curr.count, 0)

  const checkOut = () => {
    alert(`You have to pay ${price-discount} and you saved ${discount} on shoping of ${price}`)
    dispatch({ type: CartActionType.CLR, payload: null })
  }

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
            <Button onClick={checkOut} disableElevation variant="contained" sx={{ flex: 1 }}>Checkout</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
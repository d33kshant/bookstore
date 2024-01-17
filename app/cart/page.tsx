"use client"
import { Box, Button, Divider, Paper, Typography } from "@mui/material"
import { useContext } from "react"
import CartItem from "@/app/components/CartItem"
import { StoreContext } from "@/app/contexts/StoreContext"
import { StoreActionType } from "@/app/reducers/StoreReducer"
import { ToastContext } from "@/app/contexts/ToastContext"
import { AddShoppingCartOutlined } from "@mui/icons-material"

export default function CartPage() {
  const { state: { cart }, dispatch } = useContext(StoreContext)
  const { toast } = useContext(ToastContext)

  const price = cart.reduce((ac, curr) => ac + curr.original_price * curr.count, 0)
  const discount = cart.reduce((ac, curr) => ac + (curr.original_price - curr.selling_price) * curr.count, 0)

  const checkOut = () => {
    toast(`Books of $${price-discount} checked out`, "success")
    dispatch({ type: StoreActionType.CART_CLR, payload: null })
  }

  if (cart.length <= 0) {
    return (
      <Box display="flex" width="100%">
        <Paper sx={{ width: "100%" }}>
          <Box height={300} gap={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <AddShoppingCartOutlined fontSize="large" color="action"/>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography color="gray">Your cart is empty</Typography>
              <Typography color="royalblue" component="a" href="/search">Explore Books</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    )
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
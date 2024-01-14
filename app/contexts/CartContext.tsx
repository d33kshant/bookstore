import { Book } from "@prisma/client"
import { Dispatch, createContext } from "react"
import { CartAction } from "../reducers/CartReducer"

export const CartContext = createContext<{ state: { cart: (Book & { count: number })[] }, dispatch: Dispatch<CartAction> }>({ state: { cart: [] }, dispatch: () => { } })
export const CartProvider = CartContext.Provider
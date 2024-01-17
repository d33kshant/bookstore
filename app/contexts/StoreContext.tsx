import { Dispatch, createContext } from "react"
import { Store, StoreAction } from "@/app/reducers/StoreReducer"

export const StoreContext = createContext<{ state: Store, dispatch: Dispatch<StoreAction> }>({ state: { cart: [], readings: [] }, dispatch: () => { } })
export const CartProvider = StoreContext.Provider
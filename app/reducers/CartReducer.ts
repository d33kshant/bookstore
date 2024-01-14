"use client"
import { Book } from "@prisma/client"

type CartItem = Book & { count: number }

interface CartState {
  cart: CartItem[],
}

export enum CartActionType {
  ADD,
  REM,
  DEL,
  CLR,
}

export interface CartAction {
  type: CartActionType,
  payload: any,
}

export function CartInit(): { cart: CartItem[] } {
  if (typeof window !== 'undefined') {
    const data = window.localStorage.getItem('state')
    return data ? JSON.parse(data) : { cart: [] }
  } else {
    return { cart: [] }
  }
}

export function CartReducer(state: CartState, action: CartAction) {
  switch (action.type) {
    case CartActionType.ADD: {
      const newState = { ...state }
      const index = newState.cart.findIndex(item => item.id === action.payload.id)
      if (index >= 0) {
        newState.cart = [...state.cart.slice(0, index), { ...state.cart[index], count: state.cart[index].count+1 }, ...state.cart.slice(index+1)]
        window.localStorage.setItem('state', JSON.stringify(newState))
        return newState
      } else {
        newState.cart = [ ...newState.cart, { ...action.payload, count: 1 } ]
        window.localStorage.setItem('state', JSON.stringify(newState))
        return newState
      }
    }
    case CartActionType.REM: {
      const newState = { ...state }
      const index = newState.cart.findIndex(item => item.id === action.payload.id)
      if (index >= 0) {
        if (newState.cart[index].count > 1) {
          newState.cart = [...state.cart.slice(0, index), { ...state.cart[index], count: state.cart[index].count-1 }, ...state.cart.slice(index+1)]
          window.localStorage.setItem('state', JSON.stringify(newState))
          return newState
        } else {
          newState.cart = [...state.cart.slice(0, index), ...state.cart.slice(index+1)]
          window.localStorage.setItem('state', JSON.stringify(newState))
          return newState
        }
      } else {
        window.localStorage.setItem('state', JSON.stringify(newState))
        return newState
      }
    }
    case CartActionType.DEL: {
      const newState = { ...state }
      const index = newState.cart.findIndex(item => item.id === action.payload.id)
      if (index >= 0) {
        newState.cart = [...state.cart.slice(0, index), ...state.cart.slice(index+1)]
        window.localStorage.setItem('state', JSON.stringify(newState))
        return newState
      } else {
        window.localStorage.setItem('state', JSON.stringify(newState))
        return newState
      }
    }
    case CartActionType.CLR: {
      const newState = { ...state, cart: [] }
      window.localStorage.setItem('state', JSON.stringify(newState))
      return newState
    }
    default: return state
  }
}
"use client"
import { Book } from "@prisma/client"

type CartItem = Book & { count: number }

interface Store {
  cart: CartItem[],
  readings: Book[],
}

export enum StoreActionType {
  CART_ADD,
  CART_REM,
  CART_DEL,
  CART_CLR,
  READ_ADD,
  READ_REM,
}

export interface StoreAction {
  type: StoreActionType,
  payload: any,
}

export function StoreInit(): Store {
  if (typeof window !== 'undefined') {
    const data = window.localStorage.getItem('state')
    return data ? JSON.parse(data) : { cart: [], readings: [] }
  } else {
    return { cart: [], readings: [] }
  }
}

export function StoreReducer(state: Store, action: StoreAction) {
  switch (action.type) {
    case StoreActionType.CART_ADD: {
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
    case StoreActionType.CART_REM: {
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
    case StoreActionType.CART_DEL: {
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
    case StoreActionType.CART_CLR: {
      const newState = { ...state, cart: [] }
      window.localStorage.setItem('state', JSON.stringify(newState))
      return newState
    }
    case StoreActionType.READ_ADD: {
      const newState = { ...state }
      const index = newState.readings.findIndex(item => item.id === action.payload.id)
      if (index >= 0) {
        window.localStorage.setItem('state', JSON.stringify(newState))
        return newState
      } else {
        newState.readings = [...newState.readings, { ...action.payload }]
        window.localStorage.setItem('state', JSON.stringify(newState))
        return newState
      }
    }
    case StoreActionType.READ_REM: {
      const newState = { ...state }
      const index = newState.readings.findIndex(item => item.id === action.payload.id)
      if (index >= 0) {
        newState.readings = [...newState.readings.slice(0, index), ...newState.readings.slice(index+1)]
        window.localStorage.setItem('state', JSON.stringify(newState))
        return newState
      } else {
        window.localStorage.setItem('state', JSON.stringify(newState))
        return newState
      }
    }
    default: return state
  }
}
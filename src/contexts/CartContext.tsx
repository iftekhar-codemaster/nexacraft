'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  currency: 'USD' | 'BDT'
  quantity: number
  selectedColor: string
  selectedSize: string
  image?: string
}

interface CartState {
  items: CartItem[]
  currency: 'USD' | 'BDT'
  total: number
  itemCount: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'id'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CURRENCY'; payload: 'USD' | 'BDT' }
  | { type: 'LOAD_CART'; payload: CartState }

const initialState: CartState = {
  items: [],
  currency: 'USD',
  total: 0,
  itemCount: 0
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item =>
          item.productId === action.payload.productId &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      )

      let newItems: CartItem[]

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
      } else {
        // Add new item
        const newItem: CartItem = {
          ...action.payload,
          id: `${action.payload.productId}-${action.payload.selectedColor}-${action.payload.selectedSize}-${Date.now()}`
        }
        newItems = [...state.items, newItem]
      }

      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

      return {
        ...state,
        items: newItems,
        itemCount,
        total
      }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

      return {
        ...state,
        items: newItems,
        itemCount,
        total
      }
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0)

      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

      return {
        ...state,
        items: newItems,
        itemCount,
        total
      }
    }

    case 'CLEAR_CART':
      return initialState

    case 'SET_CURRENCY': {
      const newCurrency = action.payload
      const convertedItems = state.items.map(item => ({
        ...item,
        currency: newCurrency,
        // In a real app, you'd convert prices here
        price: item.price // Placeholder - no conversion for demo
      }))

      return {
        ...state,
        currency: newCurrency,
        items: convertedItems
      }
    }

    case 'LOAD_CART':
      return action.payload

    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  setCurrency: (currency: 'USD' | 'BDT') => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('nexacraft-cart')
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: cartData })
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('nexacraft-cart', JSON.stringify(state))
  }, [state])

  const addItem = (item: Omit<CartItem, 'id'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const setCurrency = (currency: 'USD' | 'BDT') => {
    dispatch({ type: 'SET_CURRENCY', payload: currency })
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        setCurrency
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
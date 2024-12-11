import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload.product)
    },
    increaseQtyById: (state, action) => {
      state.items.map((item) => {
        if (item.id === action.payload.id) {
          if (item.qty < 20) item.qty++
        }
      })
    },
    decreaseQtyById: (state, action) => {
      state.items.map((item) => {
        if (item.id === action.payload.id) {
          if (item.qty > 1) item.qty--
        }
      })
    },
    deleteItemById: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id)
    },
    resetCart: (state) => {
      state.items = []
    },
  },
})

export const {
  addToCart,
  increaseQtyById,
  decreaseQtyById,
  deleteItemById,
  resetCart,
} = cartSlice.actions

export default cartSlice.reducer

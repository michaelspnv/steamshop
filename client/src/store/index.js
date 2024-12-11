import { configureStore } from "@reduxjs/toolkit"
import dbOffsetReducer from "./features/dbOffsetSlice"
import cartReducer from "./features/cartSlice"
import { gamesApi } from "../services/games"

export const store = configureStore({
  reducer: {
    dbOffset: dbOffsetReducer,
    cart: cartReducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gamesApi.middleware),
})

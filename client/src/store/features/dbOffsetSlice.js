import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 0,
}

export const dbOffsetSlice = createSlice({
  name: "dbOffset",
  initialState,
  reducers: {
    changeOffset: (state, action) => {
      state.value = action.payload.newValue
    },
  },
})

export const { changeOffset } = dbOffsetSlice.actions

export default dbOffsetSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authStatus: false,
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    updateAuthStatus: (state, action )=> {
      state.authStatus = action;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateAuthStatus } = authSlice.actions

export default authSlice.reducer
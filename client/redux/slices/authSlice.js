import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authStatus: false,
  isLoading: true,
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    updateAuthStatus: (state, action )=> {
      state.authStatus = action.payload;
    },
    updateIsLoading: (state, action) =>{
      state.isLoading = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateAuthStatus, updateIsLoading } = authSlice.actions

export default authSlice.reducer
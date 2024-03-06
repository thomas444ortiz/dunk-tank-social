import { configureStore } from '@reduxjs/toolkit'
// import my slices here
import signupSlice from './signupSlice'
import loginSlice from './loginSlice'
import authSlice from './authSlice'

export const store = configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice,
    auth: authSlice
  },
})
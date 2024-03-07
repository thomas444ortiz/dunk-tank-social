import { configureStore } from '@reduxjs/toolkit'
// import my slices here
import signupSlice from './slices/signupSlice'
import loginSlice from './slices/loginSlice'
import authSlice from './slices/authSlice'

export const store = configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice,
    auth: authSlice
  },
})
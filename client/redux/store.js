import { configureStore } from '@reduxjs/toolkit'
// import my slices here
import signupSlice from './slices/signupSlice'
import loginSlice from './slices/loginSlice'
import authSlice from './slices/authSlice'
import postSlice from './slices/postSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice,
    auth: authSlice,
    post: postSlice,
    user: userSlice
  },
})
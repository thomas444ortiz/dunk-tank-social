import { configureStore } from '@reduxjs/toolkit'
// import my slices here
import signupSlice from './slices/signupSlice'
import loginSlice from './slices/loginSlice'
import authSlice from './slices/authSlice'
import postSlice from './slices/postSlice'
import userSlice from './slices/userSlice'
import commentSlice from './slices/commentSlice'
import upvoteDownvoteSlice from './slices/upvoteDownvoteSlice'
import viewSlice from './slices/viewSlice'

export const store = configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice,
    auth: authSlice,
    post: postSlice,
    user: userSlice,
    comment: commentSlice,
    upvoteDownvote: upvoteDownvoteSlice,
    view: viewSlice
  },
})
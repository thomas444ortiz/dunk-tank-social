import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  postBody: '',
  posts: {},
  needsRerender: false
}

export const postSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {
    updatePostBody: (state, action ) => {
      state.postBody = action.payload;
    },
    updateAllPosts: (state, action) => {
      state.posts = action.payload
    },
    updateNeedsRerender: (state, action) => {
      state.needsRerender = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updatePostBody, updateAllPosts, updateNeedsRerender } = postSlice.actions

export default postSlice.reducer
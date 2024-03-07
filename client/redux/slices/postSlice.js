import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  postBody: '',
  postsArray: [],
  needsRerender: false
}

export const postSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {
    updatePostBody: (state, action ) => {
      state.postBody = action.payload;
    },
    updatePostsArray: (state, action) => {
      state.postsArray = action.payload
    },
    updateNeedsRerender: (state, action) => {
      state.needsRerender = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updatePostBody, updatePostsArray, updateNeedsRerender } = postSlice.actions

export default postSlice.reducer
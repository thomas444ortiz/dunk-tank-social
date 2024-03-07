import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  postBody: '',
  postsArray: []
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
    }
  },
})

// Action creators are generated for each case reducer function
export const { updatePostBody, updatePostsArray } = postSlice.actions

export default postSlice.reducer
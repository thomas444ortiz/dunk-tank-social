import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  numLikes: {},
  isLiked: {}
}

export const likeSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {
    updateIsLiked: (state, action) => {
        state.isLiked[action.payload.postId] = action.payload.isLiked;
    },
    updateNumLikes: (state, action) => {
        state.numLikes[action.payload.postId] = action.payload.numLikes;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateIsLiked, updateNumLikes } = likeSlice.actions

export default likeSlice.reducer
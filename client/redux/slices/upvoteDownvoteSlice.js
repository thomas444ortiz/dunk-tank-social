import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isUpvotedByUser: {},
    isDownvotedByUser: {},
    numUpvotes: {},
    numDownvotes: {},
}

export const upvoteDownvoteSlice = createSlice({
  name: 'upvoteDownvoteSlice',
  initialState,
  reducers: {
    updateIsUpvotedByUser: (state, action )=> {
      state.isUpvotedByUser[action.payload.postId] = action.payload.value;
    },
    updateIsDownvotedByUser: (state, action )=> {
      state.isDownvotedByUser[action.payload.postId] = action.payload.value;
    },
    updateNumUpvotes: (state, action )=> {
      state.numUpvotes[action.payload.postId] = action.payload.value;
    },
    updateNumDownvotes: (state, action )=> {
      state.numDownvotes[action.payload.postId] = action.payload.value;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateIsDownvotedByUser, updateIsUpvotedByUser, updateNumUpvotes, updateNumDownvotes } = upvoteDownvoteSlice.actions

export default upvoteDownvoteSlice.reducer
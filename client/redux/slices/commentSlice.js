import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  commentBody: {},
  usersComments: [],
  usersCommentsNeedsRerender: false,
}

export const commentSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {
    updateCommentBody: (state, action ) => {
      state.commentBody[action.payload.postId] = action.payload.text;
    },
    updateUsersComments: (state, action ) => {
      state.usersComments = action.payload;
    },
    updateUsersCommentsNeedsRerender: (state, action) => {
      state.usersCommentsNeedsRerender = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateCommentBody, updateUsersComments, updateUsersCommentsNeedsRerender } = commentSlice.actions

export default commentSlice.reducer
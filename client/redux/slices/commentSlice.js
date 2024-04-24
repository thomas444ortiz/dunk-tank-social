import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  commentBody: {},
  needsRerender: {},
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
    updateNeedsRerender: (state, action) =>{
      state.needsRerender[action.payload.postId] = action.payload.value;
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
export const { updateCommentBody, updateNeedsRerender,
               updateUsersComments, updateUsersCommentsNeedsRerender } = commentSlice.actions

export default commentSlice.reducer
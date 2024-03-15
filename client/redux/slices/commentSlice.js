import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  commentBody: {},
  commentsArray: {},
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
    updateCommentsArray: (state, action) => {  
      state.commentsArray[action.payload.postId] = action.payload.comments;
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
export const { updateCommentBody, updateCommentsArray, updateNeedsRerender,
               updateUsersComments, updateUsersCommentsNeedsRerender } = commentSlice.actions

export default commentSlice.reducer
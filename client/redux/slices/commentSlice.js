import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  commentBody: {},
  commentsArray: {},
  needsRerender: {}
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
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateCommentBody, updateCommentsArray, updateNeedsRerender } = commentSlice.actions

export default commentSlice.reducer
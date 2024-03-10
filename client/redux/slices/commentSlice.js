import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  commentBody: '',
  commentsArray: {},
  needsRerender: false
}

export const commentSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {
    updateCommentBody: (state, action ) => {
      state.commentBody = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateCommentBody } = commentSlice.actions

export default commentSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  postBody: '',
}

export const postSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {
    updatePostBody: (state, action )=> {
      state.postBody = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updatePostBody } = postSlice.actions

export default postSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userProfileView: 'posts',
    currentPage: 1
}

export const viewSlice = createSlice({
  name: 'viewSlice',
  initialState,
  reducers: {
    updateUserProfileView: (state, action )=> {
      state.userProfileView = action.payload;
    },
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUserProfileView, updateCurrentPage } = viewSlice.actions

export default viewSlice.reducer
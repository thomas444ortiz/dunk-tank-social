import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userProfileView: 'post'
}

export const viewSlice = createSlice({
  name: 'viewSlice',
  initialState,
  reducers: {
    updateUserProfileView: (state, action )=> {
      console.log(action.payload)
      state.userProfileView = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateUserProfileView } = viewSlice.actions

export default viewSlice.reducer
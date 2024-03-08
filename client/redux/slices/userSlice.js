import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  newUsername: '',
  newPassword: '',
  newProfilePicture: ''
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    updateUsername: (state, action )=> {
      state.username = action.payload;
    },
    updateNewUsername: (state, action )=> {
      state.newUsername = action.payload;
    },
    updateNewPassword: (state, action )=> {
      state.newPassword = action.payload;
    },
    updateNewProfilePicture: (state, action )=> {
      state.newProfilePicture = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateUsername, updateNewPassword, updateNewProfilePicture, 
               updateNewUsername } = userSlice.actions

export default userSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: {},
  newUsername: '',
  newPassword: '',
  password: '',
  newProfilePicture: '',
  needsRefresh: false
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    updateUserInfo: (state, action )=> {
      state.userInfo = action.payload;
    },
    updateNewUsername: (state, action )=> {
      state.newUsername = action.payload;
    },
    updateConfirmPassword: (state, action )=> {
      state.newPassword = action.payload;
    },
    updateNewPassword: (state, action )=> {
      state.password = action.payload;
    },
    updateNewProfilePicture: (state, action )=> {
      state.newProfilePicture = action.payload;
    },
    updateNeedsRefresh: (state, action) => {
      state.needsRefresh = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUserInfo, updateNewPassword, updateNewProfilePicture, updateNewUsername, 
               updateNeedsRefresh, updateConfirmPassword } = userSlice.actions

export default userSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  email: '',
  password: '',
}

export const signupSlice = createSlice({
  name: 'signupSlice',
  initialState,
  reducers: {
    updateUsername: (state, action)=>{
      state.username = action.payload;
    },
    updateEmail: (state, action)=>{
      state.email = action.payload;
    },
    updatePassword: (state, action)=>{
      state.password = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUsername, updateEmail, updatePassword } = signupSlice.actions

export default signupSlice.reducer
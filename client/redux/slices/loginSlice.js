import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  password: '',
}

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    updateEmail: (state, action)=>{
      state.email = action.payload;
    },
    updatePassword: (state, action)=>{
      state.password = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateEmail, updatePassword } = loginSlice.actions

export default loginSlice.reducer
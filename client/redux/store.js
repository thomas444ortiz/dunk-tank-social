import { configureStore } from '@reduxjs/toolkit'
// import my slices here
// import slice from './slice'

export const store = configureStore({
  reducer: {
    //and put my reducers here
    // slice: slice,
  },
})
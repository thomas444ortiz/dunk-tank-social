import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  postBody: '',
  posts: {},
  needsRerender: false,
  newPostsLoading: false,
  page: 1,
  isLoading: true
}

export const postSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {
    updatePostBody: (state, action ) => {
      state.postBody = action.payload;
    },
    updateAllPosts: (state, action) => {
      state.posts = action.payload
    },
    updateAddPosts: (state, action) =>{
      state.posts = {...state.posts, ...action.payload}
    },
    updateNeedsRerender: (state, action) => {
      state.needsRerender = action.payload;
    },
    updateNewPostsLoading: (state, action) => {
      state.newPostsLoading = action.payload;
    },
    updatePage: (state, action ) => {
      state.page = action.payload;
    },
    updateIsLoading: (state, action ) => {
      state.isLoading = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updatePostBody, updateAllPosts, updateNeedsRerender, updateNewPostsLoading, 
               updateAddPosts, updatePage, updateIsLoading } = postSlice.actions

export default postSlice.reducer
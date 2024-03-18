import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  postBody: '',
  posts: {},
  needsRerender: false,
  newPostsLoading: false,
  page: 1,
  isLoading: false,
  hasMore: true
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
    updateSinglePost: (state, action) => {
      // Check if the post data is empty
      if (Object.keys(action.payload.data).length === 0) {
        // Delete the post if it exists
        delete state.posts[action.payload.postId];
      } else {
        // If the post already exists, update it
        if (state.posts.hasOwnProperty(action.payload.postId)) {
          state.posts[action.payload.postId] = action.payload.data;
        } else {
          // If it's a new post, insert it at the beginning
          // Create a new object with the new post followed by all existing posts
          const newPosts = {
            [action.payload.postId]: action.payload.data,
            ...state.posts,
          };
          state.posts = newPosts;
        }
      }
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
    },
    updateHasMore: (state, action ) => {
      state.hasMore = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updatePostBody, updateAllPosts, updateNeedsRerender, updateNewPostsLoading, 
               updateAddPosts, updatePage, updateIsLoading, updateHasMore, 
               updateSinglePost } = postSlice.actions

export default postSlice.reducer
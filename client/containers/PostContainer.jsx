import React from 'react';
import '../styles.css'
import Post from '../components/Post'
import { useSelector, useDispatch } from 'react-redux';
import { updateAllPosts, updateNeedsRerender } from '../redux/slices/postSlice';
import { useEffect } from 'react'

export default function PostContainer() {
  const store = useSelector((state) => state.post)
  const dispatch = useDispatch();

  const posts = [];

  useEffect(() => {
    // fetch request to get all posts
    fetch('/post/allPosts', {
      method: 'GET',
      headers: {"Content-Type": "application/json"}
    })
    .then((data)=>{
      return data.json()
    })
    .then((data) => {
      dispatch(updateAllPosts(data))
      // reset the needs rerender boolean back to false
      dispatch(updateNeedsRerender(false))
    })
    .then(()=>{

    })
  }, [store.needsRerender])
  
  if (Object.keys(store.posts).length > 0){
    for(const postId in store.posts){
      posts.push(<Post key={store.posts[postId]._id} id={store.posts[postId]._id} 
        body={store.posts[postId].body} postedBy={store.posts[postId].username} timestamp={store.posts[postId].updatedAt} 
        userPost={store.posts[postId].userId} usernameExposed={store.posts[postId].usernameExposed}
        profilePicture={store.posts[postId].profilePicture}/>)
    }
  }

  return (
    <div className="post-container">
       {posts.length ? posts: "No posts yet..."}
    </div>
  );
}
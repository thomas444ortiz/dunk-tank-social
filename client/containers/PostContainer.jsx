import React from 'react';
import '../styles.css'
import Post from '../components/Post'
import { useSelector, useDispatch } from 'react-redux';
import { updatePostsArray } from '../redux/slices/postSlice';
import { useEffect } from 'react'

export default function PostContainer() {
  const store = useSelector((state) => state.post)
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch request to get all posts
    fetch('/post/getAllPosts', {
      method: 'GET',
      headers: {"Content-Type": "application/json"}
    })
    .then((data)=>{
      return data.json()
    })
    .then((data) =>{
      dispatch(updatePostsArray(data))
    })
  }, [store.postsArray])
  
  const posts = [];

  for(const post of store.postsArray){
    console.log(post)
    posts.push(<Post key={post._id} body={post.body} postedBy = {post.by}/>)
  }
  
  return (
    <div className="post-container">
       {posts}
    </div>
  );
}
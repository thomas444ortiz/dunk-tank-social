import React from 'react';
import '../styles.css'
import { Input, Button } from '@chakra-ui/react'
import { newPostInputStyle } from '../chakra-styles/LoginAndSignupStyles';
import { updatePostBody } from '../redux/slices/postSlice';
import { useSelector, useDispatch } from 'react-redux'

export default function CreatePostContainer() {
  const store = useSelector((state) => state.post)
  const dispatch = useDispatch();

  function createPost(){
    fetch('/post/createPost',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: store.postBody,
      })
    })
    .then(()=>{
      dispatch(updatePostBody(''))
    })
  }

  return (
    <div className="create-post-container">
      <Input onChange={(e)=> dispatch(updatePostBody(e.target.value))} value={store.postBody} placeholder='Create your post...' sx={newPostInputStyle}/>
      <Button onClick={createPost}>Create Post</Button>    
    </div>
  );
}
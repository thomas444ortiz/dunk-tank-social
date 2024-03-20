import React from 'react';
import { Input, Button, useToast } from '@chakra-ui/react'
import { newPostInputStyle } from '../chakra-styles/LoginAndSignupStyles';
import { updatePostBody, updateNeedsRerender } from '../redux/slices/postSlice';
import { useSelector, useDispatch } from 'react-redux'
const utils = require('../../shared/utils')

export default function CreatePostContainer() {
  const store = useSelector((state) => state.post)
  const dispatch = useDispatch();
  const toast = useToast()

  function createPost(){
    if(!utils.isValidPostContent(store.postBody)){
      toast({
        title: "Invalid Post",
        description: 'Posts must be between 5 and 500 characters',
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    fetch('/post/createPost',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: store.postBody,
      })
    })
    .then((data)=> data.json())
    .then((data)=>{
      dispatch(updatePostBody(''))
      dispatch(updateNeedsRerender(data));
    })
  }

  return (
    <div className="create-post-container">
      <Input onChange={(e)=> dispatch(updatePostBody(e.target.value))} value={store.postBody} placeholder='Create your post...' sx={newPostInputStyle}/>
      <Button onClick={createPost}>Create Post</Button>    
    </div>
  );
}
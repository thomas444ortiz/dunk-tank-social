import React from 'react';
import { Input, Button } from '@chakra-ui/react'
import { newPostInputStyle } from '../chakra-styles/LoginAndSignupStyles';
import { updateCommentBody } from '../redux/slices/commentSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function CreateCommentArea(props) {
  const store = useSelector((state)=> state.comment)
  const dispatch = useDispatch();

  function createComment(){
      fetch('/comment/createComment',{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentBody: store.commentBody,
          postId: props.id
        })
      })
      .then(()=>{
        dispatch(updateCommentBody(''))
      })
  }

  return (
    <div>
      <div className="create-post-container">
        <Input value={store.commentBody} onChange={(e)=> dispatch(updateCommentBody(e.target.value))}placeholder='Add a comment...' sx={newPostInputStyle}/>
        <Button onClick={createComment}>Create Post</Button>    
      </div>
      <div>
        Comments will render here
      </div>
    </div>
  );
}
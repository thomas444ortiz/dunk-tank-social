import React from 'react';
import { Button } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { updateNeedsRerender } from '../redux/slices/commentSlice';

export default function Comment(props) {
  const dispatch = useDispatch();

  function deleteComment(){
    fetch('/comment/deleteComment',{
      method: 'DELETE',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        commentId: props.id,
      })
    })
    .then(()=>{
      dispatch(updateNeedsRerender({postId: props.postId, value: true}))
    })
  }

  return (
    <div>
        <div>{props.body}</div>
        <div>Posted by: {props.username}</div>
        {props.userPost? <Button onClick={deleteComment}>Delete Comment</Button>: null}
    </div>
  );
}
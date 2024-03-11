import React from 'react';
import { Button } from '@chakra-ui/react'

export default function Comment(props) {

  function deleteComment(){
    fetch('/comment/deleteComment',{
      method: 'DELETE',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        commentId: props.id,
      })
    })
  }

  return (
    <div>
        <div>{props.body}</div>
        <Button onClick={deleteComment}>Delete Post</Button>
    </div>
  );
}
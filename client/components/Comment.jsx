import React from 'react';
import { Button, Image } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { updateNeedsRerender, updateUsersCommentsNeedsRerender } from '../redux/slices/commentSlice';

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
      dispatch(updateUsersCommentsNeedsRerender(true));
    })
  }

  return (
    <div className='comment-component'>
      <div className='comment-top-bar'>
        <div className='comment-user-info'>
          <Image 
            src={props.profilePicture} 
            alt='Profile Picture'
            borderRadius='full'
            boxSize='30px'
            marginRight='5px'
          />
          <div className="comment-username">{props.username}</div>
        </div>
        {props.userPost? <Button size='s' onClick={deleteComment}>Delete Comment</Button>: null}
      </div>
        <div className="comment-body">{props.body}</div>
    </div>
  );
}
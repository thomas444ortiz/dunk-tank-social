import React from 'react';
import '../styles.css'
import { Text, Button } from '@chakra-ui/react'
import { updateNeedsRerender } from '../redux/slices/postSlice';
import { useDispatch } from 'react-redux'
import CommentArea from './CommentArea';
import LikeBar from './LikeBar';

export default function Post(props) {
  const dispatch = useDispatch();
  
  function deletePost(id){
    fetch('/post/deletePost',{
      method: 'DELETE',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        postId: id,
      })
    })
    .then(() => {
      dispatch(updateNeedsRerender(true));
    })
  }

  return (
    <div className="post-component">
        <Text>{props.body}</Text>
        <div>
            <div>Posted by: {props.postedBy}</div>         
            <div>Timestamp: {props.timestamp}</div>
        </div>
        {props.userPost? <Button onClick={(e)=> deletePost(props.id)}>Delete Post</Button> : null}
        <LikeBar key={`${props.id}`+ 'likebar'} id={props.id}/>
        <CommentArea key={props.id} id={props.id}/>
    </div>
  );
}
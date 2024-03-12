import React, { useEffect } from 'react';
import '../styles.css'
import { Button } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { updateIsDownvotedByUser, updateIsUpvotedByUser, updateNumUpvotes, updateNumDownvotes } from '../redux/slices/upvoteDownvoteSlice';
import { updateNeedsRerender } from '../redux/slices/postSlice';

export default function UpvoteDownvoteBar(props) {
  const store = useSelector((state) => state.upvoteDownvote)

  const dispatch = useDispatch();

  function handleLike(isUpvote){
      fetch('/upvoteDownvote/toggleUpvoteDownvote',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: props.id,
          upvote: isUpvote
        })
      })
      .then((data)=> data.json())
      .then((response)=> {
        dispatch(updateIsUpvotedByUser({postId: props.id, value: isUpvote}))
        dispatch(updateIsDownvotedByUser({postId: props.id, value: !isUpvote}))
        if(response.exposed){
          dispatch(updateNeedsRerender(true));
          window.alert('Congrats, you have just exposed a post!')
        }
      })
  }

  fetch('/upvoteDownvote/upvotesDownvotesFromPost',{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId: props.id,
      upvotes: store.numUpvotes[props.id],
      downvotes: store.numDownvotes[props.id],     
    })
  })
  .then((data)=> data.json())
  .then((data)=> {
    dispatch(updateNumUpvotes({postId: props.id, value: data.numUpvotes}))
    dispatch(updateNumDownvotes({postId: props.id, value: data.numDownvotes}))
    dispatch(updateIsUpvotedByUser({postId: props.id, value: data.isUpvotedByUser}))
    dispatch(updateIsDownvotedByUser({postId: props.id, value: data.isDownvotedByUser}))
  })

  return (
    <div>
        <Button onClick={()=> handleLike(true)}>{ store.isUpvotedByUser[props.id] ? null: 'Upvote'}</Button>
        <div>Number of upvotes: {store.numUpvotes[props.id]}</div>
        <Button onClick={()=>handleLike(false)}>{ store.isDownvotedByUser[props.id] ? null: 'Downvote'}</Button>
        <div>Number of downvotes: {store.numDownvotes[props.id]}</div>
    </div>
  );
}
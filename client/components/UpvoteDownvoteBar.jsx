import React, { useEffect } from 'react';
import '../styles.css'
import { Button } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { updateIsDownvotedByUser, updateIsUpvotedByUser } from '../redux/slices/upvoteDownvoteSlice';
import { updateNeedsRerender } from '../redux/slices/postSlice';
import { IconButton } from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon, TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons'

export default function UpvoteDownvoteBar(props) {
  const store = useSelector((state) => state.upvoteDownvote)
  const postStore = useSelector((state) => state.post);
  const dispatch = useDispatch();

  function handleLike(isUpvote){
    if(store.isUpvotedByUser[props.id] || store.isDownvotedByUser[props.id]){
      if(isUpvote && store.isUpvotedByUser[props.id] === isUpvote) return;
      else if(store.isDownvotedByUser[props.id] === !isUpvote) return; 
    }
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
      dispatch(updateNeedsRerender(true));
      if(response.exposed){
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
    })
  })
  .then((data)=> data.json())
  .then((data)=> {
    dispatch(updateIsUpvotedByUser({postId: props.id, value: data.isUpvotedByUser}))
    dispatch(updateIsDownvotedByUser({postId: props.id, value: data.isDownvotedByUser}))
  })

  return (
    <div className="upvotedownvote-bar">
        <IconButton 
          icon={ store.isUpvotedByUser[props.id] ? <TriangleUpIcon color="red"/> : <ChevronUpIcon/> } 
          onClick={()=> handleLike(true)}
        />

        {/* <Button onClick={()=> handleLike(true)}>{ store.isUpvotedByUser[props.id] ? null: 'Upvote'}</Button> */}
        <div>Number of upvotes: {postStore.posts[props.id].upvotes}</div>
        {/* <Button onClick={()=>handleLike(false)}>{ store.isDownvotedByUser[props.id] ? null: 'Downvote'}</Button> */}
        <IconButton 
          icon={ store.isDownvotedByUser[props.id] ? <TriangleDownIcon color="red"/> : <ChevronDownIcon/> } 
          onClick={()=> handleLike(false)}
        />
        
        <div>Number of downvotes: {postStore.posts[props.id].downvotes}</div>
    </div>
  );
}
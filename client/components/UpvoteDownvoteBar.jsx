import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateIsDownvotedByUser, updateIsUpvotedByUser } from '../redux/slices/upvoteDownvoteSlice';
import { updateNeedsRerender } from '../redux/slices/postSlice';
import { IconButton, useToast, } from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon, TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons'

export default function UpvoteDownvoteBar(props) {
  const store = useSelector((state) => state.upvoteDownvote)
  const postStore = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const toast = useToast()

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
      dispatch(updateNeedsRerender(props.id));
      if(response.exposed){
        toast({
          title: "Exposed!",
          description: "Congrats, you have just exposed a post!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
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
      <div className="upvotedownvote">
        <IconButton 
          icon={ store.isUpvotedByUser[props.id] ? <TriangleUpIcon color="red"/> : <ChevronUpIcon/> } 
          onClick={()=> handleLike(true)}
        />
        <div className='upvotedownvotecount'>{postStore.posts[props.id].upvotes}</div>
      </div>
      <div className="upvotedownvote">
        <IconButton 
          icon={ store.isDownvotedByUser[props.id] ? <TriangleDownIcon color="red"/> : <ChevronDownIcon/> } 
          onClick={()=> handleLike(false)}
        />
        <div className='upvotedownvotecount'>{postStore.posts[props.id].downvotes}</div>
      </div>
    </div>
  );
}
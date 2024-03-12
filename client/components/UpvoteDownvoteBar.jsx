import React from 'react';
import '../styles.css'
import { Button } from '@chakra-ui/react'
// import { useSelector, useDispatch } from 'react-redux'

export default function UpvoteDownvoteBar(props) {
  // const store = useSelector((state) => state.like)
  // const dispatch = useDispatch();

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
      .then((response)=>{
          console.log('this is the response', response);
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
      console.log('this is the data', data)
      // dispatch(updateNumLikes({postId: props.id, numLikes: data.numLikes}))
      // dispatch(updateIsLiked({postId: props.id, isLiked: data.isLikedByUser}))
    })

  return (
    <div>
        <Button onClick={()=> handleLike(true)}>Upvote</Button>
        <Button onClick={()=>handleLike(false)}>Downvote</Button>
    </div>
  );
}
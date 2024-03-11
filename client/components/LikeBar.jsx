import React from 'react';
import '../styles.css'
import { Button } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { updateIsLiked, updateNumLikes } from '../redux/slices/likeSlice'

export default function LikeBar(props) {
  const store = useSelector((state) => state.like)
  const dispatch = useDispatch();

  function handleLike(){
      fetch('/like/toggleLike',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: props.id
        })
      })
  }

    fetch('/like/likesFromPost',{
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
      dispatch(updateNumLikes({postId: props.id, numLikes: data.numLikes}))
      dispatch(updateIsLiked({postId: props.id, isLiked: data.isLikedByUser}))
    })

  return (
    <div>
        <Button onClick={handleLike}>{store.isLiked[props.id] ? 'unlike': 'like'}</Button>
        <div>Number of likes: {store.numLikes[props.id]} </div>
    </div>
  );
}
import React from 'react';
import { Input, Button } from '@chakra-ui/react'
import { newPostInputStyle } from '../chakra-styles/LoginAndSignupStyles';
import { updateCommentBody, updateCommentsArray } from '../redux/slices/commentSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'
import Comment from './Comment'

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

  useEffect(()=>{
    fetch('/comment/postComments',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: props.id
      })
    })
    .then((data) => {
      return data.json()
    })
    .then((data) => {
      return dispatch(updateCommentsArray({postId: props.id, comments: data}))
    })
  }, [])

  const comments = [];

  if(store.commentsArray[props.id]){
    for(const comment of store.commentsArray[props.id]){
      comments.push(<Comment key={comment._id} body={comment.body}/>)
    }
  }

  return (
    <div>
      <div className="create-post-container">
        <Input value={store.commentBody} onChange={(e)=> dispatch(updateCommentBody(e.target.value))}placeholder='Add a comment...' sx={newPostInputStyle}/>
        <Button onClick={createComment}>Create Post</Button>    
      </div>
      <div>
        {comments}
      </div>
    </div>
  );
}
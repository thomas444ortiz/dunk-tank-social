import React from 'react';
import { Input, Button } from '@chakra-ui/react'
import { newPostInputStyle } from '../chakra-styles/LoginAndSignupStyles';
import { updateCommentBody, updateCommentsArray, updateNeedsRerender } from '../redux/slices/commentSlice';
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
          commentBody: store.commentBody[props.id],
          postId: props.id
        })
      })
      .then(()=>{
        dispatch(updateCommentBody({postId: props.id, text: ''}))
        dispatch(updateNeedsRerender({postId: props.id, value: true}))
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
      dispatch(updateCommentsArray({postId: props.id, comments: data}))
      dispatch(updateNeedsRerender({postId: props.id, value: false}))
    })
  }, [store.needsRerender[props.id]])

  const comments = [];

  if(store.commentsArray[props.id]){
    for(const comment of store.commentsArray[props.id]){
      comments.push(<Comment key={comment._id} body={comment.body}/>)
    }
  }

  return (
    <div>
      <div className="create-post-container">
        <Input value={store.commentBody[props.id] ? store.commentBody[props.id] : '' } onChange={(e)=> dispatch(updateCommentBody({postId: props.id, text: e.target.value}))}placeholder='Add a comment...' sx={newPostInputStyle}/>
        <Button onClick={createComment}>Comment</Button>    
      </div>
      <div>
        {comments}
      </div>
    </div>
  );
}
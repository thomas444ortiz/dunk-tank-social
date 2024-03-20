import React from 'react';
import { Input, Button, useToast } from '@chakra-ui/react'
import { newPostInputStyle } from '../chakra-styles/LoginAndSignupStyles';
import { updateCommentBody, updateCommentsArray, updateNeedsRerender } from '../redux/slices/commentSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'
import Comment from './Comment'
import utils from '../../shared/utils.js';

export default function CreateCommentArea(props) {
  const store = useSelector((state)=> state.comment)
  const dispatch = useDispatch();
  const toast = useToast();

  const comments = [];

  function createComment(){
      if(!utils.isValidPostContent(store.commentBody[props.id])) {
        toast({
          title: "Invalid Comment",
          description: 'Comments must be between 5 and 500 characters',
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
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

  if(store.commentsArray[props.id]){
    for(const commentID in store.commentsArray[props.id]){
      comments.push(<Comment key={store.commentsArray[props.id][commentID]._id} id={store.commentsArray[props.id][commentID]._id} 
        body={store.commentsArray[props.id][commentID].body} userPost={store.commentsArray[props.id][commentID].userId} 
        username={store.commentsArray[props.id][commentID].username} postId={props.id}
        profilePicture={store.commentsArray[props.id][commentID].profilePicture}
        />) 
    }
  }

  return (
    <div>
      <div className="create-post-container">
        <Input value={store.commentBody[props.id] ? store.commentBody[props.id] : '' } 
               onChange={(e)=> dispatch(updateCommentBody({postId: props.id, text: e.target.value}))}
               placeholder='Add a comment...' sx={newPostInputStyle}
        />
        <Button onClick={createComment}>Comment</Button>    
      </div>
      <div>
        {comments}
      </div>
    </div>
  );
}
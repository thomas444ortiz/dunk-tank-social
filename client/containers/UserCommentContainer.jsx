import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsersComments, updateUsersCommentsNeedsRerender } from '../redux/slices/commentSlice';
import Comment from '../components/Comment'
import { useEffect } from 'react';

export default function UserCommentContainer(props) {
  const store = useSelector((state) => state.comment)
  const dispatch = useDispatch()

    const comments = [];

    useEffect(()=>{
        fetch('/comment/allOfUsersComments',{
          method: 'GET',
          headers: {"Content-Type": "application/json"},
        })
        .then((data)=> {
            return data.json()
        })
        .then((data)=>{
            dispatch(updateUsersComments(data))
            dispatch(updateUsersCommentsNeedsRerender(false));
        })
    },[store.usersCommentsNeedsRerender])

  for(const comment of store.usersComments){
    comments.push(<Comment key={'userComment'+comment.key} 
        id={comment._id} 
        body={comment.body} 
        userPost={true} 
        username={comment.username} 
        postId={comment.postId}/>)
  }

  return (
    <div>
        {comments.length ? comments : 'No comments yet...'}
    </div>
  );
}
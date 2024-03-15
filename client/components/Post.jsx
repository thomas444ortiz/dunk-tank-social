import React, { useState } from 'react';
import '../styles.css'
import { Text, Button, Input } from '@chakra-ui/react'
import { updateNeedsRerender } from '../redux/slices/postSlice';
import { useDispatch } from 'react-redux'
import CommentArea from './CommentArea';
import UpvoteDownvoteBar from './UpvoteDownvoteBar';
import { Heading, Image, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

export default function Post(props) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editableBody, setEditableBody] = useState(props.body);

  function deletePost(){
    fetch('/post/deletePost',{
      method: 'DELETE',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        postId: props.id,
      })
    })
    .then(() => {
      dispatch(updateNeedsRerender(true));
    })
  }

  function handleEditChange(e) {
    setEditableBody(e.target.value);
  }

  function editPost(){
    setIsEditing(!isEditing);
    // Reset editable content if cancelling edit
    if (isEditing) setEditableBody(props.body);
  }

  function saveChanges(){
    fetch('/post/updatePost',{
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        postId: props.id,
        newBody: editableBody
      })
    })
    .then((data)=> data.json())
    .then((data)=> console.log(data))
    .then(()=>{
      setIsEditing(false);
      dispatch(updateNeedsRerender(true));
    })
  }

  return (
    <div className="post-component">
      <div className="post-top-bar">
        <div className="post-info-post">
            <Image 
              src={props.usernameExposed ? props.profilePicture : 'https://image.made-in-china.com/2f0j00rknuUpYzYlbd/Mini-Yellow-Rubber-Duck-Bath-Toy-Sound-Floating-Ducks.webp'} 
              alt='Rubber Duck'
              borderRadius='full'
              boxSize='50px'
              marginRight='5px'
            />
          <Heading>{props.postedBy}</Heading>
        </div>
        {props.userPost && 
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton isActive={isOpen} as={Button}>
                  <HamburgerIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={deletePost}>Delete Post</MenuItem>
                  <MenuItem onClick={editPost}>{isEditing ? 'Discard Changes' : 'Edit'}</MenuItem>
                  {isEditing && <MenuItem onClick={saveChanges}>Save Changes</MenuItem>}
                </MenuList>
              </>
            )}
          </Menu>
        }
      </div>
              
      {isEditing ? (
        <Input
          value={editableBody}
          onChange={handleEditChange}
          placeholder="Edit post body"
          size="md"
        />
      ) : (
        <Text fontSize='2xl'>{props.body}</Text>
      )}

      {/* <Text fontSize='2xl'>{props.body}</Text> */}
      <div className='post-timestamp'>{props.timestamp}</div>

      <UpvoteDownvoteBar key={`${props.id}`+ 'upvotedownvotebar'} id={props.id}/>
      <CommentArea key={props.id} id={props.id}/>
    </div>
  );
}
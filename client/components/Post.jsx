import React from 'react';
import '../styles.css'
import { Text, Button } from '@chakra-ui/react'
import { updateNeedsRerender } from '../redux/slices/postSlice';
import { useDispatch } from 'react-redux'
import CommentArea from './CommentArea';
import UpvoteDownvoteBar from './UpvoteDownvoteBar';
import { Heading, Image, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

export default function Post(props) {
  const dispatch = useDispatch();
  
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
        {props.userPost? 
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton isActive={isOpen} as={Button}>
                  <HamburgerIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={deletePost}>Delete Post</MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        : null}
      </div>
              
      <Text fontSize='2xl'>{props.body}</Text>
      <div>{props.timestamp}</div>

      <UpvoteDownvoteBar key={`${props.id}`+ 'upvotedownvotebar'} id={props.id}/>
      <CommentArea key={props.id} id={props.id}/>
    </div>
  );
}
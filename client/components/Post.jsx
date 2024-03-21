import React, { useState } from 'react';
import { Box, Flex, Text, Button, Input, Heading, Image, Menu, MenuButton, Center, MenuItem, MenuList, VStack, useColorModeValue } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { updateNeedsRerender } from '../redux/slices/postSlice';
import CommentArea from './CommentArea';
import UpvoteDownvoteBar from './UpvoteDownvoteBar';

export default function Post(props) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editableBody, setEditableBody] = useState(props.body);

  function deletePost() {
    fetch('/post/deletePost', {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: props.id })
    })
    .then(() => dispatch(updateNeedsRerender(props.id)));
  }

  function handleEditChange(e) {
    setEditableBody(e.target.value);
  }

  function editPost() {
    setIsEditing(!isEditing);
    if (isEditing) setEditableBody(props.body);
  }

  function saveChanges() {
    fetch('/post/updatePost', {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: props.id,
        newBody: editableBody
      })
    })
    .then(() => {
      setIsEditing(false);
      dispatch(updateNeedsRerender(props.id));
    })
  }

  return (
    <Box bg="white" p={0} rounded="md" shadow="sm" pb={5} mb={8}>
      <Flex justifyContent="space-between" alignItems="center" pt={5} pb={2} pr={5} pl={5}>
        <Flex alignItems="center" >
          <Image 
            src={props.usernameExposed ? props.profilePicture : 'https://image.made-in-china.com/2f0j00rknuUpYzYlbd/Mini-Yellow-Rubber-Duck-Bath-Toy-Sound-Floating-Ducks.webp'} 
            alt="Profile Picture"
            borderRadius="full"
            boxSize="50px"
            mr={3}
          />
          <Heading size="md">{props.postedBy}</Heading>
        </Flex>
        {props.userPost && 
          <Menu placement="bottom-end">
            <MenuButton as={Button}>
              <Center>
                <HamburgerIcon />
              </Center>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={deletePost}>Delete Post</MenuItem>
              <MenuItem onClick={editPost}>{isEditing ? 'Discard Changes' : 'Edit'}</MenuItem>
              {isEditing && <MenuItem onClick={saveChanges}>Save Changes</MenuItem>}
            </MenuList>
          </Menu>
        }
      </Flex>

      <Box pt={0} pb={0} pl={5}>
        {isEditing ? (
          <VStack spacing={4} align="stretch" mr={5} mb={0}>
            <Input
              value={editableBody}
              onChange={handleEditChange}
              placeholder="Edit post body"
            />
            <Flex justifyContent="flex-end">
              <Button mr={2} onClick={editPost}>Discard Changes</Button>
              <Button colorScheme="blue" onClick={saveChanges}>Save Changes</Button>
            </Flex>
          </VStack>
        ) : (
          <Text fontSize="xl" mb={2}>{props.body}</Text>
        )}

        <Text color="gray.500" mb={4}>{props.timestamp}</Text>
      </Box>

      <UpvoteDownvoteBar key={`${props.id}-upvotedownvote`} id={props.id}/>
      <CommentArea key={`${props.id}-comments`} id={props.id}/>
    </Box>
  );
}

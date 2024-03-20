import React from 'react';
import { Box, Button, Image, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateNeedsRerender, updateUsersCommentsNeedsRerender } from '../redux/slices/commentSlice';

export default function Comment(props) {
  const dispatch = useDispatch();
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const color = useColorModeValue('black', 'white');

  function deleteComment() {
    fetch('/comment/deleteComment', {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        commentId: props.id,
      })
    })
    .then(() => {
      dispatch(updateNeedsRerender({ postId: props.postId, value: true }))
      dispatch(updateUsersCommentsNeedsRerender(true));
    })
  }

  return (
    <Box bg={bgColor} color={color} p={4} rounded="md" shadow="md" my={2}>
      <Flex justify="space-between" align="center" mb={2}>
        <Flex align="center">
          <Image 
            src={props.profilePicture} 
            alt="Profile Picture"
            borderRadius="full"
            boxSize="30px"
            mr={2}
          />
          <Text fontWeight="bold">{props.username}</Text>
        </Flex>
        {props.userPost ? <Button size="sm" colorScheme="blue" onClick={deleteComment}>Delete Comment</Button> : null}
      </Flex>
      <Text>{props.body}</Text>
    </Box>
  );
}

import React from 'react';
import { Flex, Input, Button, useToast } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePostBody, updateNeedsRerender } from '../redux/slices/postSlice';
const utils = require('../../shared/utils');

export default function CreatePostContainer() {
  const store = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const toast = useToast();

  function createPost() {
    if (!utils.isValidPostContent(store.postBody)) {
      toast({
        title: "Invalid Post",
        description: 'Posts must be between 5 and 500 characters',
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    fetch('/post/createPost', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: store.postBody,
      })
    })
    .then((data) => data.json())
    .then((data) => {
      dispatch(updatePostBody(''));
      dispatch(updateNeedsRerender(data));
    });
  }

  return (
    <Flex w="full" p={4} boxShadow="md" rounded="lg" bg="white" alignItems="center" justifyContent="space-between" mt={4} mb={8}>
      <Input 
        onChange={(e) => dispatch(updatePostBody(e.target.value))}
        value={store.postBody}
        placeholder='Create your post...'
        bg="gray.100"
        _placeholder={{ color: 'gray.500' }}
        flex="1"
        mr={4}
      />
      <Button 
        colorScheme="blue"
        onClick={createPost}
      >
        Create Post
      </Button>
    </Flex>
  );
}

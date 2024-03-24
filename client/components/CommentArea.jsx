import React, { useEffect } from 'react';
import { Box, Flex, Input, Button, useToast, Divider, VStack } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCommentBody, updateCommentsArray, updateNeedsRerender } from '../redux/slices/commentSlice';
import Comment from './Comment';
import utils from '../utils.js';

export default function CreateCommentArea(props) {
  const store = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const toast = useToast();

  const comments = [];

  function createComment() {
    if (!utils.isValidPostContent(store.commentBody[props.id])) {
      toast({
        title: "Invalid Comment",
        description: 'Comments must be between 5 and 500 characters',
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    fetch('/comment/createComment', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentBody: store.commentBody[props.id],
        postId: props.id
      })
    })
    .then(() => {
      dispatch(updateCommentBody({postId: props.id, text: ''}));
      dispatch(updateNeedsRerender({postId: props.id, value: true}));
    });
  }

  useEffect(() => {
    fetch('/comment/postComments', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: props.id
      })
    })
    .then((data) => data.json())
    .then((data) => {
      dispatch(updateCommentsArray({postId: props.id, comments: data}));
      dispatch(updateNeedsRerender({postId: props.id, value: false}));
    });
  }, [store.needsRerender[props.id], props.id]);

  if (store.commentsArray[props.id]) {
    for (const commentID in store.commentsArray[props.id]) {
      comments.push(
        <Comment key={store.commentsArray[props.id][commentID]._id}
                 id={store.commentsArray[props.id][commentID]._id}
                 body={store.commentsArray[props.id][commentID].body}
                 userPost={store.commentsArray[props.id][commentID].userId}
                 username={store.commentsArray[props.id][commentID].username}
                 postId={props.id}
                 profilePicture={store.commentsArray[props.id][commentID].profilePicture}
        />
      );
    }
  }

  return (
    <Box w="100%">
      <Divider my={4} />
      <Flex alignItems="center" justifyContent="space-between" pl={5} pt={1} pb={1} pr={5}>
        <Input value={store.commentBody[props.id] ? store.commentBody[props.id] : ''} 
               onChange={(e) => dispatch(updateCommentBody({postId: props.id, text: e.target.value}))}
               placeholder='Add a comment...' 
               bg="gray.100"
               _placeholder={{ color: 'gray.500' }}
               flex="1"
               mr={4}
        />
        <Button colorScheme="blue" onClick={createComment}>Comment</Button>
      </Flex>
      <Divider my={4} />
      <VStack spacing={4} align="stretch" px={5}>
        {comments.length ? comments: <div>No comments yet...</div>}
      </VStack>
    </Box>
  );
}

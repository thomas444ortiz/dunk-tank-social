import React, { useEffect, useState } from 'react';
import { Box, Flex, Input, Button, useToast, Divider, VStack, Spinner } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCommentBody, updateNeedsRerender } from '../redux/slices/commentSlice';
import Comment from './Comment';
import utils from '../utils.js';
 
export default function CreateCommentArea(props) {
  const store = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [commentsArray, setCommentsArray] = useState([])
  const [isLoading, setIsLoading] = useState(false);

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

  function loadPosts(){
    setIsLoading(true);
    fetch('/comment/postComments', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: props.id,
        page: page
      })
    })
    .then((data) => data.json())
    .then((data) => {
      setPage(page + 1)
      setCommentsArray([...commentsArray, ...data]);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    loadPosts()
  }, [store.needsRerender[props.id], props.id]);


  for(const comm of commentsArray){
    comments.push(
      <Comment key={comm._id}
        id={comm._id}
        body={comm.body}
        userPost={comm.userId}
        username={comm.username}
        postId={props.id}
        profilePicture={comm.profilePicture}
    />  
    )
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
       {isLoading ?         
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner size="xl"/>
          </div> 
          : <Button colorScheme="blue" onClick={createComment}>Comment</Button>
        } 
      </Flex>
      <Divider my={4} />
      <VStack spacing={4} align="stretch" px={5}>
        {comments.length ? comments: <div>No comments yet...</div>}
        <Button onClick={loadPosts}>Load more comments...</Button>
      </VStack>
    </Box>
  );
}

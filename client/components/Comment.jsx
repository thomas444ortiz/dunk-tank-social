import React from 'react';
import { Box, Button, Image, Text, Flex, useColorModeValue } from '@chakra-ui/react';

export default function Comment(props) {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const color = useColorModeValue('black', 'white');

  function editCommentBody(){
    console.log('Invoked')
  }


  return (
    <Box bg={bgColor} color={color} p={3} rounded="md" shadow="md" mt={1}>
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
        {props.userPost ? <Button size="sm" colorScheme="blue" onClick={() => props.deleteMethod(props.id)}>Delete</Button> : null}
      </Flex>
      <Text>{props.body}</Text>
    </Box>
  );
}

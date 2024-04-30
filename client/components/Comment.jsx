import React, {useState} from 'react';
import { Box, Flex, Text, Button, Input, Heading, Image, Menu, MenuButton, useColorModeValue, 
  Center, MenuItem, MenuList, VStack } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

export default function Comment(props) {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const color = useColorModeValue('black', 'white');
  const [isEditing, setIsEditing] = useState(false);
  const [editableBody, setEditableBody] = useState(props.body);
  const [body, setBody] = useState(props.body);

  function saveChanges(){
    setIsEditing(true);
    fetch('/comment/editComments', {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentId: props.id,
        newBody: editableBody
      })
    })
    .then((data) => data.json())
    .then((data) => {
      setBody(data.body);
      setIsEditing(false);
    })
  }

  function editComment() {
    setIsEditing(!isEditing);
    if (isEditing) setEditableBody(body);
  }

  function handleEditChange(e) {
    setEditableBody(e.target.value);
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
        {/* {props.userPost ? <Button size="sm" colorScheme="blue" onClick={() => props.deleteMethod(props.id)}>Delete</Button> : null}
        {props.userPost ? <Button size="sm" colorScheme="blue" onClick={editComment}>Edit</Button> : null}
         */}
        {props.userPost && 
          <Menu placement="bottom-end">
            <MenuButton as={Button}>
              <Center>
                <HamburgerIcon />
              </Center>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => props.deleteMethod(props.id)}>Delete Comment</MenuItem>
              <MenuItem onClick={editComment}>{isEditing ? 'Discard Changes' : 'Edit'}</MenuItem>
              {isEditing && <MenuItem onClick={saveChanges}>Save Changes</MenuItem>}
            </MenuList>
          </Menu>
        }
      </Flex>

      {isEditing ? (
          <VStack spacing={4} align="stretch" mr={5} mb={0}>
            <Input
              value={editableBody}
              onChange={handleEditChange}
            />
            <Flex justifyContent="flex-end">
              <Button mr={2} onClick={editComment}>Discard Changes</Button>
              <Button colorScheme="blue" onClick={saveChanges}>Save Changes</Button>
            </Flex>
          </VStack>
        ) : (
          <Text fontSize="xl" mb={2}>{body}</Text>
        )}

    </Box>
  );
}

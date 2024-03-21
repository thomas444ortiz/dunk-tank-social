import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { updateNewUsername, updateNeedsRefresh } from '../redux/slices/userSlice';
const utils = require('../utils');

export default function ChangeUsernameForm() {
  const toast = useToast();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.user);

  function updateUsername(e) {
    e.preventDefault()
    if (!utils.isValidUsername(store.newUsername)) {
      toast({
        title: "Invalid Username",
        description: "The provided username does not meet the requirements.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    fetch('/user/updateUsername', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({newUsername: store.newUsername})
    })
    .then((response) => {
      if(response.ok){
        dispatch(updateNewUsername(''));
        dispatch(updateNeedsRefresh(true));
        toast({
          title: "Username updated.",
          description: "Your username has been successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      else{
        toast({
          title: "Invalid Username.",
          description: "Your username is not valid.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    })
  }

  return (
    <form onSubmit={updateUsername}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor='new-username'>New Username</FormLabel>
          <Input id='new-username' type='text' placeholder='(3-20 chars, a-z, 0-9, or _)' value={store.newUsername} onChange={(e) => dispatch(updateNewUsername(e.target.value))}/>
        </FormControl>
        <Button type='submit' colorScheme='blue' width='full'>Update Username</Button>
      </VStack>
    </form>
  );
}

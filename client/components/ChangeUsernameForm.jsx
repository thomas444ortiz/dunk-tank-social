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
const utils = require('../../shared/utils');

export default function ChangeUsernameForm() {
  const toast = useToast();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.user);

  function updateUsername() {
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
    .then(() => {
      dispatch(updateNewUsername(''));
      dispatch(updateNeedsRefresh(true));
    })
    .then(() => {
      toast({
        title: "Username updated.",
        description: "Your username has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
  }

  return (
    <form onSubmit={updateUsername}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor='new-username'>New Username</FormLabel>
          <Input id='new-username' type='text' value={store.newUsername} onChange={(e) => dispatch(updateNewUsername(e.target.value))}/>
        </FormControl>
        <Button type='submit' colorScheme='blue' width='full'>Update Username</Button>
      </VStack>
    </form>
  );
}

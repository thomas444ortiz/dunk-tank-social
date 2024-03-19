import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAuthStatus } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function DeleteAccountForm() {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.user);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    const expectedConfirmation = `${store.userInfo.username}-delete`;
    
    if (deleteConfirmation !== expectedConfirmation) {
      toast({
        title: "Error",
        description: "Please enter your username followed by '-delete' to confirm.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    fetch('/user/deleteAccount',{
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    })
    .then(() => { 
        dispatch(updateAuthStatus(false))
        navigate('/login')
    })
  };

  return (
    <form onSubmit={handleDeleteAccount}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor='delete-confirmation'>Type "{store.userInfo.username}-delete" to confirm</FormLabel>
          <Input id='delete-confirmation' type='text' value={deleteConfirmation} onChange={(e) => setDeleteConfirmation(e.target.value)} />
        </FormControl>
        <Button type='submit' colorScheme='red' width='full'>Delete Account</Button>
      </VStack>
    </form>
  );
}

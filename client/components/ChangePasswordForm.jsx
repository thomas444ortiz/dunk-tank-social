import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useSelector, useDispatch} from 'react-redux'
import { updateNewPassword, updateConfirmPassword, updateNeedsRefresh } from '../redux/slices/userSlice'
const utils = require('../utils')

export default function ChangePasswordForm() {
  const toast = useToast();
  const dispatch = useDispatch();
  const store = useSelector((state)=> state.user)

  // function to update user information
  function updatePassword(e){
    e.preventDefault()
    if(store.password !== store.newPassword){
      e.preventDefault()
      toast({
        title: "Passwords Do Not Match.",
        description: "Please Ensure Your Passwords Are Matching.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if(!utils.isValidPassword(store.password)) {
      e.preventDefault()
      toast({
        title: "Invalid Password",
        description: 'Passwords must be between 8 and 64 characters',
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    fetch('/user/updatePassword', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({password: store.password})
    })
    .then(() => {
      dispatch(updateNewPassword(''))
      dispatch(updateConfirmPassword(''))
      dispatch(updateNeedsRefresh(true))
    })
    .then(()=>{
        toast({
            title: "Password updated.",
            description: "Your password has been successfully updated.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
      })
    }

  return (
    <form onSubmit={updatePassword}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor='current-password'>Current Password</FormLabel>
          <Input id='current-password' type='password' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='new-password'>New Password</FormLabel>
          <Input id='new-password' type='password' value={store.newPassword} onChange={(e) => dispatch(updateConfirmPassword(e.target.value))}/>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='confirm-new-password'>Confirm New Password</FormLabel>
          <Input id='confirm-new-password' type='password' value={store.password} onChange={(e) => dispatch(updateNewPassword(e.target.value))}/>
        </FormControl>
        <Button type='submit' colorScheme='blue' width='full'>Update Password</Button>
      </VStack>
    </form>
  );
}

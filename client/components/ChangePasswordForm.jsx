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
import { updateNewPassword, updateNeedsRefresh } from '../redux/slices/userSlice'
const utils = require('../../shared/utils')

export default function ChangePasswordForm() {
  const toast = useToast();
  const dispatch = useDispatch();
  const store = useSelector((state)=> state.user)

    // function to update user information
    function updateUserData(route, field, slice){
        // validate the password
        if(field === 'password'){
          if(!utils.isValidPassword(store.password)) return;
        }
        // validate the username 
        if(field === 'newUsername'){
          if(!utils.isValidUsername(store.newUsername)) return;
        }
    
        const reqBody = {}
        reqBody[field] = store[field]
        fetch(route, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody)
        })
        .then(() => {
          dispatch(slice(''))
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
    <form onSubmit={() => updateUserData('/user/updatePassword', 'password', updateNewPassword)}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor='current-password'>Current Password</FormLabel>
          <Input id='current-password' type='password' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='new-password'>New Password</FormLabel>
          <Input id='new-password' type='password' />
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

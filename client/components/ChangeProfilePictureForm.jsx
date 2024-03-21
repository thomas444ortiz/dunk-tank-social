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
import { updateNewProfilePicture, updateNeedsRefresh } from '../redux/slices/userSlice';

export default function ChangeProfilePictureForm() {
  const toast = useToast();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.user);

  function updateProfilePicture(e) {
    e.preventDefault()
    fetch('/user/updateProfilePicture', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({newProfilePicture: store.newProfilePicture})
    })
    .then(() => {
      dispatch(updateNewProfilePicture(''));
      dispatch(updateNeedsRefresh(true));
    })
    .then(() => {
      toast({
        title: "Profile picture updated.",
        description: "Your profile picture has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
  }

  return (
    <form onSubmit={updateProfilePicture}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor='new-profile-picture'>New Profile Picture URL</FormLabel>
          <Input id='new-profile-picture' type='text' value={store.newProfilePicture} onChange={(e) => dispatch(updateNewProfilePicture(e.target.value))}/>
        </FormControl>
        <Button type='submit' colorScheme='blue' width='full'>Update Profile Picture</Button>
      </VStack>
    </form>
  );
}

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

  function updateUserData(route, field, slice) {
    const reqBody = {};
    reqBody[field] = store[field];
    fetch(route, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody)
    })
    .then(() => {
      dispatch(slice(''));
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
    <form onSubmit={() => updateUserData('/user/updateProfilePicture', 'newProfilePicture', updateNewProfilePicture)}>
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

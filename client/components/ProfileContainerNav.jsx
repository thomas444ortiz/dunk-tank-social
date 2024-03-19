import React from 'react';
import { Button } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { updateUserProfileView } from '../redux/slices/viewSlice';

export default function ProfileContainerNav() {
    const dispatch = useDispatch();

    function updateProfileContainerView(view){
        dispatch(updateUserProfileView(view))
    }

  return (
    <div className="profile-container-navbar">
        <Button onClick={()=>updateProfileContainerView('posts')}>Posts</Button>
        <Button onClick={()=>updateProfileContainerView('comments')}>Comments</Button>
        <Button onClick={()=>updateProfileContainerView('update')}>Update Profile</Button>
    </div>
  );
}
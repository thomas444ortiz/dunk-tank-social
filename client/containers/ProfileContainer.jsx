import React from 'react';
import '../styles.css'
import { useSelector, useDispatch} from 'react-redux'
import { updateNewUsername, updateNewPassword, updateNewProfilePicture } from '../redux/slices/userSlice'
import { Input, Button } from '@chakra-ui/react'
import { updateProfileInfoInputStyle, updateProfileInfoButtonStyle } from '../chakra-styles/LoginAndSignupStyles';

export default function ProfileContainer() {
  const store = useSelector((state)=> state.user)
  const dispatch = useDispatch();

  function updateInputField(text, callback){
    dispatch(callback(text));
  }

  // function to update username
  
  // function to update password

  // function to update profile picture

  //function to delete account


  return (
    <div className="outer-profile-container"> 
      <div className="inner-profile-container">
        <div>{store.username}'s account information</div>
        <div className="update-profile-info">
          <Input onChange={(e) => updateInputField(e.target.value, updateNewUsername)} sx={updateProfileInfoInputStyle}/>
          <Button sx={updateProfileInfoButtonStyle}>Update Username</Button>  
        </div>
        <div className="update-profile-info">
          <Input onChange={(e) => updateInputField(e.target.value, updateNewPassword)} sx={updateProfileInfoInputStyle}/>
          <Button sx={updateProfileInfoButtonStyle}>Update Password</Button>  
        </div>
        <div className="update-profile-info">
          <Input onChange={(e) => updateInputField(e.target.value, updateNewProfilePicture)} sx={updateProfileInfoInputStyle}/>
          <Button sx={updateProfileInfoButtonStyle}>Update Profile Picture</Button>  
        </div>
        <Button>Delete Account</Button>  
      </div>
    </div>
  );
}
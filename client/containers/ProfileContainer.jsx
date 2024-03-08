import React from 'react';
import '../styles.css'
import { useSelector, useDispatch} from 'react-redux'
import { updateNewUsername, updateNewPassword, updateNewProfilePicture, updateNeedsRefresh } from '../redux/slices/userSlice'
import { Input, Button } from '@chakra-ui/react'
import { profileInfoInputStyle, profileInfoButtonStyle } from '../chakra-styles/LoginAndSignupStyles';

export default function ProfileContainer() {
  const store = useSelector((state)=> state.user)
  const dispatch = useDispatch();

  function updateInputField(text, callback){
    dispatch(callback(text));
  }

  // function to update username
  function updateUsername(){
    fetch('/user/updateUsername',{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newUsername: store.newUsername
      })
    })
    .then(() => {
      dispatch(updateNewUsername(''))
      dispatch(updateNeedsRefresh(true))
    })
  }
  // function to update password

  // function to update profile picture

  //function to delete account


  return (
    <div className="outer-profile-container"> 
      <div className="inner-profile-container">
        <div>{store.username}'s account information</div>
        <div className="update-profile-info">
          <Input value={store.newUsername} onChange={(e) => updateInputField(e.target.value, updateNewUsername)} sx={profileInfoInputStyle}/>
          <Button onClick={updateUsername} sx={profileInfoButtonStyle}>Update Username</Button>  
        </div>
        <div className="update-profile-info">
          <Input value={store.newPassword} onChange={(e) => updateInputField(e.target.value, updateNewPassword)} sx={profileInfoInputStyle}/>
          <Button sx={profileInfoButtonStyle}>Update Password</Button>  
        </div>
        <div className="update-profile-info">
          <Input value={store.newProfilePicture} onChange={(e) => updateInputField(e.target.value, updateNewProfilePicture)} sx={profileInfoInputStyle}/>
          <Button sx={profileInfoButtonStyle}>Update Profile Picture</Button>  
        </div>
        <Button>Delete Account</Button>  
      </div>
    </div>
  );
}
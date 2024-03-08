import React from 'react';
import '../styles.css'
import { useSelector, useDispatch} from 'react-redux'
import { updateNewUsername, updateNewPassword, updateNewProfilePicture, updateNeedsRefresh } from '../redux/slices/userSlice'
import { Input, Button } from '@chakra-ui/react'
import { profileInfoInputStyle, profileInfoButtonStyle } from '../chakra-styles/LoginAndSignupStyles';
import { useNavigate } from 'react-router-dom';
import { updateAuthStatus } from '../redux/slices/authSlice';

export default function ProfileContainer() {
  const store = useSelector((state)=> state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function updateInputField(text, callback){
    dispatch(callback(text));
  }

  // function to update user information
  function updateUserData(route, field, slice){
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
  }

  function deleteAccount(){
    fetch('/user/deleteAccount',{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(()=>{ 
      dispatch(updateAuthStatus(true))
      navigate('/')
    })
  }

  return (
    <div className="outer-profile-container"> 
      <div className="inner-profile-container">
        <div>{store.username}'s account information</div>
        <img src={store.profilePicture} />
        <div className="update-profile-info">
          <Input value={store.newUsername} onChange={(e) => updateInputField(e.target.value, updateNewUsername)} sx={profileInfoInputStyle}/>
          <Button onClick={() => updateUserData('/user/updateUsername', 'newUsername', updateNewUsername)} sx={profileInfoButtonStyle}>Update Username</Button>  
        </div>
        <div className="update-profile-info">
          <Input value={store.password} onChange={(e) => updateInputField(e.target.value, updateNewPassword)} sx={profileInfoInputStyle}/>
          <Button onClick={() => updateUserData('/user/updatePassword', 'password', updateNewPassword)} sx={profileInfoButtonStyle}>Update Password</Button>  
        </div>
        <div className="update-profile-info">
          <Input value={store.newProfilePicture} onChange={(e) => updateInputField(e.target.value, updateNewProfilePicture)} sx={profileInfoInputStyle}/>
          <Button onClick={() => updateUserData('/user/updateProfilePicture', 'newProfilePicture', updateNewProfilePicture)} sx={profileInfoButtonStyle}>Update Profile Picture</Button>  
        </div>
        <Button onClick={deleteAccount} >Delete Account</Button>  
      </div>
    </div>
  );
}
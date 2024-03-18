import React from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { updateNewUsername, updateNewPassword, updateNewProfilePicture, updateNeedsRefresh } from '../redux/slices/userSlice'
import { Input, Button, Image, Box } from '@chakra-ui/react'
import { profileInfoInputStyle, profileInfoButtonStyle } from '../chakra-styles/LoginAndSignupStyles';
import { useNavigate } from 'react-router-dom';
import { updateAuthStatus } from '../redux/slices/authSlice';
import UserPostContainer  from './UserPostContainer'
import UserCommentContainer  from './UserCommentContainer'
import ProfileContainerNav from '../components/ProfileContainerNav';
import UpdateProfileInputs from './UpdateProfileInputs';
const utils = require('../../shared/utils')

export default function ProfileContainer() {
  const store = useSelector((state)=> state.user)
  const view = useSelector((state)=> state.view);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function updateInputField(text, callback){
    dispatch(callback(text));
  }

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
        <Box className="navbar-user-info">
          <Image 
            src={store.userInfo.profilePicture} 
            alt='Profile Picture'
            borderRadius='full'
            boxSize='100px'
            marginRight='5px'
            />
          <div className='profile-page-username'>{store.userInfo.username}'s Account Information</div>
        </Box>

        <ProfileContainerNav />
          
        {view.userProfileView === 'posts' ? 
          <div className='user-post-inner'>
            <h1>Your Posts</h1>
            <UserPostContainer />
          </div>
          :
          null
        }

        {view.userProfileView === 'comments' ? 
          <div className='userpost-inner'>
            <h1>Your Comments</h1>
            <UserCommentContainer />
          </div>   
          :
          null
        }
        
        {view.userProfileView === 'update' ? 
          <UpdateProfileInputs />
          :
          null
        }
      </div>
    </div>
  );
}
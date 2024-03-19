import React from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { updateNeedsRefresh } from '../redux/slices/userSlice'
import { Image, Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import UserPostContainer  from './UserPostContainer'
import UserCommentContainer  from './UserCommentContainer'
import ProfileContainerNav from '../components/ProfileContainerNav';
import UpdateProfileMenu from '../components/UpdateProfileMenu';
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
          <div className='max-width'>
            <h1>Your Comments</h1>
            <UserCommentContainer />
          </div>   
          :
          null
        }
        
        {view.userProfileView === 'update' ? 
          <UpdateProfileMenu/>
          :
          null
        }
      </div>
    </div>
  );
}
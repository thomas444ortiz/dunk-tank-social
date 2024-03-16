import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Image } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { updateAuthStatus } from '../redux/slices/authSlice';
import { updateUserInfo, updateNeedsRefresh } from '../redux/slices/userSlice';
import { useEffect } from 'react'
import { IoHome } from "react-icons/io5";
import { RiUserSettingsFill } from "react-icons/ri";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state.user)

  // going to fetch user data here
  useEffect(() => {
    fetch('/user/userInfo', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) => data.json())
    .then((data) =>{
      dispatch(updateUserInfo(data))
      dispatch(updateNeedsRefresh(false))
    })
  }, [store.needsRefresh])

  function logout(){
    fetch('/auth/logout',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({})
    })
    .then(response => {
      if(response.ok) {
        // update the auth status and redirect
        dispatch(updateAuthStatus(true))
        navigate('/');
      } else {
        // Handle login failure
        alert('Logout failed.');
      }
      return response.json();
    })
  }
  
  return (
    <div className="navbar">
      <Box
        className="navbar-link-container"
        onClick={()=> navigate('/home')}
        cursor="pointer"
      >
        <IoHome />
        Home
      </Box>
      <Box
        className="navbar-link-container"
        onClick={()=> navigate('/profile')}
        cursor="pointer"
      >
        <RiUserSettingsFill />
        Profile
      </Box>
      <Box className="navbar-user-info">
        <Image 
          src={store.userInfo.profilePicture} 
          alt='Profile Picture'
          borderRadius='full'
          boxSize='40px'
          marginRight='5px'
        />
        <div className="navbar-username">{store.userInfo.username}</div>
      </Box>
      <Button colorScheme='blue' onClick={logout}>Logout</Button>
    </div>
  );
}
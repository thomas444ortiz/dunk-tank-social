import React from 'react';
import { Box, Input, Button } from '@chakra-ui/react'
import { signupContainerStyle, signupInputStyle, buttonStyle } from '../chakra-styles/LoginAndSignupStyles'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { updateUsername, updateEmail, updatePassword } from '../redux/slices/signupSlice';
import { updateAuthStatus } from '../redux/slices/authSlice';
const utils = require('../../shared/utils')

export default function SignupContainer() {
  const store = useSelector((state) => state.signup);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  function signup() {
    // validate email, username, password
    if(!utils.isValidEmail(store.email)) {
      alert('Invalid email');
      return;
    };
    if(!utils.isValidUsername(store.username)) {
      alert('Usernames must be between 3 and 20 characters, and only include letters or the following characters: @, _, -');
      return;
    };
    if(!utils.isValidPassword(store.password)) {
      alert('Passwords must be between 8 and 64 characters');
      return;
    };
    // make post request with the email, username, and password in the request body
    fetch('/auth/signup',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: store.username,
        email: store.email,
        password: store.password
      })
    })
    .then(response => {
      // clear the fields
      dispatch(updateEmail(''));
      dispatch(updatePassword(''));  
      dispatch(updateUsername(''));
      if(response.ok) {
        // update the auth status and redirect
        dispatch(updateAuthStatus(true))
        navigate('/home');
      } else {
        // Handle login failure
        alert('Signup failed. Please ensure your username and email are unique.');
      }
      return response.json();
    })
  }

  return (
      <Box sx={signupContainerStyle}>
          <h1 className="login-header" >Signup</h1>
          <Input placeholder='Username (3-20 chars, a-z or _)' value={store.username} onChange={(e)=> dispatch(updateUsername(e.target.value))} sx={signupInputStyle}/>
          <Input placeholder='Email' value={store.email} onChange={(e)=> dispatch(updateEmail(e.target.value))} sx={signupInputStyle}/>
          <Input placeholder='Password (8-64 chars)' value={store.password} onChange={(e)=> dispatch(updatePassword(e.target.value))} type={'password'} sx={signupInputStyle}/>
          <Button colorScheme='gray' onClick={signup} sx={buttonStyle}>Sign Up</Button>
          <div className="login-link-text">Already have an account?
            <Link to="/" className="login-link">Log in</Link>
          </div>
      </Box>
  );
}
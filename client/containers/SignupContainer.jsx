import React from 'react';
import { Box, Input, Button } from '@chakra-ui/react'
import { signupContainerStyle, signupInputStyle, buttonStyle } from '../chakra-styles/LoginAndSignupStyles'
import '../styles.css'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { updateUsername, updateEmail, updatePassword } from '../redux/slices/signupSlice';
import { updateAuthStatus } from '../redux/slices/authSlice';

export default function SignupContainer() {
  const store = useSelector((state) => state.signup);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  function signup() {
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
          <Input placeholder='Username' value={store.username} onChange={(e)=> dispatch(updateUsername(e.target.value))} sx={signupInputStyle}/>
          <Input placeholder='Email' value={store.email} onChange={(e)=> dispatch(updateEmail(e.target.value))} sx={signupInputStyle}/>
          <Input placeholder='Password' value={store.password} onChange={(e)=> dispatch(updatePassword(e.target.value))} type={'password'} sx={signupInputStyle}/>
          <Button colorScheme='gray' onClick={signup} sx={buttonStyle}>Sign Up</Button>
          <div className="login-link-text">Already have an account?
            <Link to="/" className="login-link">Log in</Link>
          </div>
      </Box>
  );
}
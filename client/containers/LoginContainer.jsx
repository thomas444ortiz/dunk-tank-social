import React from 'react';
import { Box, Input, Button } from '@chakra-ui/react'
import { signupContainerStyle, signupInputStyle, buttonStyle } from '../chakra-styles/LoginAndSignupStyles'
import '../styles.css'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateEmail, updatePassword } from '../redux/slices/loginSlice'
import { updateAuthStatus } from '../redux/slices/authSlice';

export default function SignupContainer() {
  const store = useSelector((state)=> state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  function login(){
    // make post request with the email, username, and password in the request body
    fetch('/auth/login',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: store.email,
        password: store.password
      })
    })
    .then(response => {
      // clear the fields
      dispatch(updateEmail(''));
      dispatch(updatePassword(''));  
      if(response.ok) {
        // update the auth status and redirect
        dispatch(updateAuthStatus(true))
        navigate('/home');
      } else {
        // Handle login failure
        alert('Login failed. Please check your credentials.');
      }
      return response.json();
    })
  }

  return (
      <Box sx={signupContainerStyle}>
          <h1 className="login-header" >Login</h1>
          <Input placeholder='Email' value={store.email} onChange={(e)=> dispatch(updateEmail(e.target.value))} sx={signupInputStyle}/>
          <Input placeholder='Password' value={store.password} onChange={(e)=> dispatch(updatePassword(e.target.value))} type={'password'} sx={signupInputStyle}/>
          <Button colorScheme='gray' onClick={login} sx={buttonStyle}>Log In</Button>
          <div className="login-link-text">Don't yet have an account?
            <Link to="/signup" className="login-link">Sign Up</Link>
          </div>
      </Box>
  );
}
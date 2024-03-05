import React from 'react';
import { Box, Input, Button } from '@chakra-ui/react'
import { signupContainerStyle, signupInputStyle, buttonStyle } from '../chakra-styles/LoginAndSignupStyles'
import '../styles.css'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { updateUsername, updateEmail, updatePassword } from '../redux/signupSlice';

export default function SignupContainer() {
  const store = useSelector((state) => state.signup);
  const dispatch = useDispatch()

  return (
      <Box sx={signupContainerStyle}>
          <h1 className="login-header" >Signup</h1>
          <Input placeholder='Username' value={store.username} onChange={(e)=> dispatch(updateUsername(e.target.value))} sx={signupInputStyle}/>
          <Input placeholder='Email' value={store.email} onChange={(e)=> dispatch(updateEmail(e.target.value))} sx={signupInputStyle}/>
          <Input placeholder='Password' value={store.password} onChange={(e)=> dispatch(updatePassword(e.target.value))} type={'password'} sx={signupInputStyle}/>
          <Button colorScheme='gray' sx={buttonStyle}>Sign Up</Button>
          <div className="login-link-text">Already have an account?
            <Link to="/" className="login-link">Log in</Link>
          </div>
      </Box>
  );
}
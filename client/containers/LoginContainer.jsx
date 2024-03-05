import React from 'react';
import { Box, Input, Button } from '@chakra-ui/react'
import { signupContainerStyle, signupInputStyle, buttonStyle } from '../chakra-styles/LoginAndSignupStyles'
import '../styles.css'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateEmail, updatePassword } from '../redux/loginSlice'

export default function SignupContainer() {
  const store = useSelector((state)=> state.login);
  const dispatch = useDispatch();

  return (
      <Box sx={signupContainerStyle}>
          <h1 className="login-header" >Login</h1>
          <Input placeholder='Email' value={store.email} onChange={(e)=> dispatch(updateEmail(e.target.value))} sx={signupInputStyle}/>
          <Input placeholder='Password' value={store.password} onChange={(e)=> dispatch(updatePassword(e.target.value))} type={'password'} sx={signupInputStyle}/>
          <Button colorScheme='gray' sx={buttonStyle}>Log In</Button>
          <div className="login-link-text">Don't yet have an account?
            <Link to="/signup" className="login-link">Sign Up</Link>
          </div>
      </Box>
  );
}
import React from 'react';
import { Box, Input, Button } from '@chakra-ui/react'
import { signupContainerStyle, signupInputStyle, buttonStyle } from '../chakra-styles/LoginAndSignupStyles'
import '../styles.css'
import { Link } from 'react-router-dom';

export default function SignupContainer() {

  return (
      <Box sx={signupContainerStyle}>
          <h1 className="login-header" >Signup</h1>
          <Input placeholder='Username' sx={signupInputStyle}/>
          <Input placeholder='Email' sx={signupInputStyle}/>
          <Input placeholder='Password' type={'password'} sx={signupInputStyle}/>
          <Button colorScheme='gray' sx={buttonStyle}>Sign Up</Button>
          <div className="login-link-text">Already have an account?
            <Link to="/" className="login-link">Log in</Link>
          </div>
      </Box>
  );
}
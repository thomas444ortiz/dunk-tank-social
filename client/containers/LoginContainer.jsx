import React from 'react';
import { Box, Input, Button, useToast, Text, VStack, Link as ChakraLink, Heading } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { updateEmail, updatePassword } from '../redux/slices/loginSlice'
import { updateAuthStatus } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupContainer() {
  const store = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast()

  function login() {
    fetch('/auth/login', {
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
      dispatch(updateEmail(''));
      dispatch(updatePassword(''));  
      if(response.ok) {
        dispatch(updateAuthStatus(true))
        navigate('/home');
      } else {
        toast({
          title: "Login Failed",
          description: 'Login failed. Please check your credentials.',
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      return response.json();
    })
  }

  return (
    <Box p="6" borderRadius="lg" bg="gray.50" shadow="md" width="30%" mx="auto" mt="10">
      <VStack spacing="6">
        <Heading size="lg">Login</Heading>
        <Input placeholder='Email' value={store.email} onChange={(e) => dispatch(updateEmail(e.target.value))} bg="white"/>
        <Input placeholder='Password' value={store.password} onChange={(e) => dispatch(updatePassword(e.target.value))} type='password' bg="white"/>
        <Button colorScheme='blue' width="40%" onClick={login}>Log In</Button>
        <Text>
          Don't yet have an account?{' '}
          <ChakraLink as={Link} to="/signup" color="blue.500" fontWeight="semibold">
            Sign Up
          </ChakraLink>
        </Text>
      </VStack>
    </Box>
  );
}

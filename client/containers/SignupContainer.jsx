import React from 'react';
import { Box, Input, Button, useToast, Text, VStack, Heading, Link as ChakraLink } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUsername, updateEmail, updatePassword } from '../redux/slices/signupSlice';
import { updateAuthStatus } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
const utils = require('../../shared/utils');

export default function SignupContainer() {
  const store = useSelector((state) => state.signup);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  function signup() {
    if (!utils.isValidEmail(store.email)) {
      toast({
        title: "Invalid Email",
        description: 'Please ensure your email is in a valid format',
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (!utils.isValidUsername(store.username)) {
      toast({
        title: "Invalid Username",
        description: 'Usernames must be between 3 and 20 characters, and only include letters or the following characters: @, _, -',
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (!utils.isValidPassword(store.password)) {
      toast({
        title: "Invalid Password",
        description: 'Passwords must be between 8 and 64 characters',
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    fetch('/auth/signup', {
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
      dispatch(updateEmail(''));
      dispatch(updatePassword(''));
      dispatch(updateUsername(''));
      if (response.ok) {
        dispatch(updateAuthStatus(true));
        navigate('/home');
      } else {
        toast({
          title: "Signup Failed",
          description: 'Signup failed. Please ensure your username and email are unique.',
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      return response.json();
    });
  }

  return (
    <Box p="6" borderRadius="lg" bg="gray.50" shadow="md" width="30%" mx="auto" mt="10">
      <VStack spacing="6">
        <Heading size="lg">Signup</Heading>
        <Input placeholder='Username (3-20 chars, a-z or _)' value={store.username} onChange={(e) => dispatch(updateUsername(e.target.value))} bg="white"/>
        <Input placeholder='Email' value={store.email} onChange={(e) => dispatch(updateEmail(e.target.value))} bg="white"/>
        <Input placeholder='Password (8-64 chars)' value={store.password} onChange={(e) => dispatch(updatePassword(e.target.value))} type='password' bg="white"/>
        <Button colorScheme='blue' width="40%" onClick={signup}>Sign Up</Button>
        <Text>
          Already have an account?{' '}
          <ChakraLink as={Link} to="/" color="blue.500" fontWeight="semibold">
            Log in
          </ChakraLink>
        </Text>
      </VStack>
    </Box>
  );
}

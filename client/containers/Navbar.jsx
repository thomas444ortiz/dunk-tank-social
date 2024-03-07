import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react'
import '../styles.css'
import { useDispatch } from 'react-redux';
import { updateAuthStatus } from '../redux/authSlice';

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
      <Button colorScheme='blue' onClick={logout}>Logout</Button>
    </div>
  );
}
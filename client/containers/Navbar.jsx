import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react'
import '../styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateAuthStatus } from '../redux/slices/authSlice';
import { updateUsername } from '../redux/slices/userSlice';
import { useEffect } from 'react'

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state.user)

  // going to fetch user data here
  useEffect(()=>{
    fetch('/user/userInfo', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) => data.json())
    .then((data) =>{
      dispatch(updateUsername(data.username))
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
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
      <div>Logged in as: {store.username}</div>
      <Button colorScheme='blue' onClick={logout}>Logout</Button>
    </div>
  );
}
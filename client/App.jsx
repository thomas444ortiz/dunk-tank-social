import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import PrivateRoutes from './PrivateRoutes'
import { updateAuthStatus, updateIsLoading } from './redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux'
import './styles.css'

export default function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const store = useSelector((state)=> state.auth);

  useEffect(()=>{
    console.log('going to validate session')
    fetch('/auth/validateSession', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch(updateIsLoading(false));
      if(response.ok){
        dispatch(updateAuthStatus(true));
        navigate('/home')
      }
    })
  }, [])

  if(store.isLoading) return null;

  return (
    <div className="app">
      <Routes className="app">
        <Route  path="/" element={<LoginPage/>}/>
        <Route  path="/signup" element={<SignupPage/>}/>
        <Route element={<PrivateRoutes />}>
          <Route  path="/home" element={<HomePage/>}/>
          <Route  path="/profile" element={<ProfilePage/>}/>
        </Route>
      </Routes>
    </div>
  );
}
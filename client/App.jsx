import React from 'react';
import { Routes, Route} from 'react-router-dom'
import Navbar from './containers/Navbar'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import './styles.css'

export default function App() {
  return (
    <div className="app">
      <Routes className="app">
        <Route  path="/" element={<LoginPage/>}/>
        <Route  path="/home" element={<HomePage/>}/>
        <Route  path="/signup" element={<SignupPage/>}/>
        <Route  path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </div>
  );
}
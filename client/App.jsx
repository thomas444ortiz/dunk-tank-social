import React from 'react';
import { Routes, Route} from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import PrivateRoutes from './PrivateRoutes'
import './styles.css'

export default function App() {
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
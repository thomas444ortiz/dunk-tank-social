import React from 'react';
import { Routes, Route} from 'react-router-dom'
import Navbar from './containers/Navbar'
import SignupPage from './containers/SignupContainer'
import Login from './containers/LoginContainer'

export default function App() {
  return (
    <div>
      <Routes >
        <Route  path="/" element={<Login />}/>
        <Route  path="/home" element={<Navbar />}/>
        <Route  path="/signup" element={<SignupPage />}/>
      </Routes>
    </div>
  );
}
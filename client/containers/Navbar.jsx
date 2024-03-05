import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'

export default function App() {
  return (
    <div className="navbar">
      <Link to="/">Log in</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
}
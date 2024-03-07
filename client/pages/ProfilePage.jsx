import React from 'react';
import Navbar from '../containers/Navbar'
import ProfileContainer from '../containers/ProfileContainer'

export default function ProfilePage() {
  return (
    <div className="page-container">
        <Navbar />
        <ProfileContainer />
    </div>
  )
};
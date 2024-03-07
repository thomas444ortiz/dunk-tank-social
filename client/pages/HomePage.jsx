import React from 'react';
import Navbar from '../containers/Navbar'
import FeedContainer from '../containers/FeedContainer';

export default function HomePage() {
  return (
    <div className="page-container">
        <Navbar />
        <FeedContainer />
    </div>
  )
};
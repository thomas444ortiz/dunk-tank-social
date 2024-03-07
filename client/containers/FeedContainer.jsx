import React from 'react';
import '../styles.css'
import CreatePostContainer from './CreatePostContainer';
import PostContainer from './PostContainer';

export default function FeedContainer() {
  return (
    <div className="feed-outer-container">
      <div className="feed-inner-container">
        <CreatePostContainer />
        <PostContainer />
      </div>
    </div>
  );
}
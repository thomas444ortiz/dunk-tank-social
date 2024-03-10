import React from 'react';
import '../styles.css'
import { Button } from '@chakra-ui/react'

export default function LikeBar(props) {
    function handleLike(){
        console.log('HandleLike invoked', props.id)
    }

  return (
    <div>
        <Button onClick={handleLike}>Like</Button>
    </div>
  );
}
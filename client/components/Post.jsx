import React from 'react';
import '../styles.css'
import { Text } from '@chakra-ui/react'

export default function Post(props) {
  return (
    <div className="post-component">
        <Text>{props.body}</Text>
        <div>
            <div>Posted by: {props.postedBy}</div>         
            <div>Timestamp</div>
        </div>
    </div>
  );
}
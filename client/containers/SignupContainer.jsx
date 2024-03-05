import React from 'react';
import { Box, Input, Stack } from '@chakra-ui/react'

export default function SignupContainer() {
  const someSampleStyle = {"background-color": "red", "height": "100%"}
  
  return (
    <Box sx={someSampleStyle}>
        <Stack>
            <Input placeholder='Email'/>
            <Input placeholder='Password' />
        </Stack>
    </Box>
  );
}
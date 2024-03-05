import React from "react";
import { createRoot } from "react-dom/client";
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'

// this will first go to the dom, and get the div with the id of "root",
// and then render the app into that
const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider>
          <App />        
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
);

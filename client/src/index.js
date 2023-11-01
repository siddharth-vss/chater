import React from 'react';
import ReactDOM from 'react-dom/client';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { ChakraProvider } from '@chakra-ui/react'
import './index.css';
import App from './App';
import AppContex from './context/appContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <GoogleOAuthProvider clientId="184076318503-rpapm9p6bpdbltre1q8rao6e67epv4h8.apps.googleusercontent.com">
  <React.StrictMode>
    <AppContex>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AppContex>
  </React.StrictMode>
  // </GoogleOAuthProvider>,
);

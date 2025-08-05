import ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

const clerkPubKey = "pk_test_Y2hvaWNlLWxvY3VzdC04MS5jbGVyay5hY2NvdW50cy5kZXYk";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
);

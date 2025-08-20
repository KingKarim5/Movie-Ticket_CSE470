import ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { initializeLanguage } from './libraries/i18n'
import { AppProvider } from './context/Appcontext.jsx';

const clerkPubKey = "pk_test_Y2hvaWNlLWxvY3VzdC04MS5jbGVyay5hY2NvdW50cy5kZXYk";

// Initialize language system
initializeLanguage();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </ClerkProvider>
);

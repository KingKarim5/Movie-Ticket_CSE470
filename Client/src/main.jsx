import { ClerkProvider } from '@clerk/clerk-react'
import ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { initializeLanguage } from './libraries/i18n'
import { AppProvider } from './context/Appcontext.jsx';


// Initialize language system
initializeLanguage();

const clerkPubKey = "pk_test_Y2hvaWNlLWxvY3VzdC04MS5jbGVyay5hY2NvdW50cy5kZXYk";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </ClerkProvider>
);

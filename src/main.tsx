import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App';
import theme from './theme';
import './index.css';

const stripePromise = loadStripe("pk_test_51OeHRDJZNiO58W1E1SwL9wKxAP8zxUszzaEtUrqgdNb8UAbGhEVYAj7NmAGBuocM1phHpKVlZyEVKBMGR8FEMIui00YRJS6RHh");

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Elements stripe={stripePromise}>
        <Router>
          <App />
        </Router>
      </Elements>
    </ChakraProvider>
  </React.StrictMode>
);

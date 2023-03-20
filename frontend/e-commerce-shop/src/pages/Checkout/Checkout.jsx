import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements,CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Mf9OdDdApvbMXPjhYh5n96iBLygysfIwidxLU4nhJGoUcuwYvEOMxzv4moKORVplSdhwqQQZnDCNyyx6UWKCy2F008b22HaRX');

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CardElement/>
    </Elements>
  );
};

export default Checkout;

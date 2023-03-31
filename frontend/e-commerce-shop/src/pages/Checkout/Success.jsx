import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { api } from "../../utils/config";

const Success = () => {
  const location = useLocation();
  const [paymentIntent, setPaymentIntent] = useState(null);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      const stripe = await loadStripe("pk_test_51Mf9OdDdApvbMXPjhYh5n96iBLygysfIwidxLU4nhJGoUcuwYvEOMxzv4moKORVplSdhwqQQZnDCNyyx6UWKCy2F008b22HaRX");
    
      const params = new URLSearchParams(location.search);
      const paymentIntentId = params.get('payment_intent');
    
      const response = await fetch(api+'/create-payment-intent',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ paymentIntentId })
      });
      const data = await response.json();
      console.log(data);
      setPaymentIntent(data);
    };
    
    fetchPaymentIntent();
  }, [location.search]);

  console.log(paymentIntent.success);
 
  return (
    <div className='mx-auto w-1/2 text-center pt-14'>
      {paymentIntent.success === true ? (
        <div className='grid gap-y-6'>
          <p className='text-2xl'>Payment successfull.</p>
          <p className='text-xl'>Thank you for your purchase!</p>
          <p className='text-lg'>Amount: {paymentIntent.paymentIntent.amount / 100}0{paymentIntent.paymentIntent.currency.toUpperCase()}</p>
        </div>
      ): (
        <div>Something went wrong! No payment received!</div>
      )}
    </div>
  );
};

export default Success;

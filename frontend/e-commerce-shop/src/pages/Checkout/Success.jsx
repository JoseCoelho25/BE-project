import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { api } from "../../utils/config";
import Cookies from 'js-cookie';

const Success = () => {
  const userCookie = Cookies.get('user');
  const userParsed = JSON.parse(userCookie);

  
  const location = useLocation();
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [order, setOrder] = useState({})

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
      
      setPaymentIntent(data);
    };
    
    fetchPaymentIntent();
  }, [location.search]);
  
  useEffect(() => {
    const handleClick = async(userParsed) => {
      try {
        const response = await fetch(api + '/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data)
        setOrder(data.orders)
      } catch (err) {
        console.log(err);
      }
    }

    handleClick();
  }, []);

  console.log(order._id)

  return (
    <div className='mx-auto w-1/2 text-center pt-14'>
      {paymentIntent && paymentIntent.success === true ? (
        <div className='grid gap-y-6'>
          <p className='text-2xl'>Payment successfull.</p>
          <p className='text-xl'>Thank you for your purchase!</p>
          <p className='text-lg'>Amount: {paymentIntent.paymentIntent.amount / 100}0{paymentIntent.paymentIntent.currency.toUpperCase()}</p>
        </div>
      ): (
        <div>Something went wrong! No payment received!</div>
      )}
      <Link to={`/order/${order._id}`}>
        <button className='border border-black px-2 mt-4'>Receipt</button>
      </Link>
      
    </div>
  );
};

export default Success;

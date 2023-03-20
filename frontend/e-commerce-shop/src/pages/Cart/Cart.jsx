import React, {useState, useEffect} from 'react'
import { api } from "../../utils/config";
import {AiOutlinePlus,AiOutlineMinus} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';



const Cart = () => {
  const [cart, setCart] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(api + '/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          productId: productId,
        }),
      });
      const data = await response.json();

      // update the cart state after removing the item
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecreaseItem = async (productId) => {
    try {
      const response = await fetch(api + '/cart/descreaseItemToCart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          productId: productId,
        }),
      });
      const data = await response.json();

      // update the cart state after removing the item
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleIncreaseItem = async (productId) => {
    try {
      const response = await fetch(api + '/cart/addItemToCart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          productId: productId,
        }),
      });
      const data = await response.json();

      // update the cart state after removing the item
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  };

  

  const makePayment = async () => { 
    const stripe = await loadStripe("pk_test_51Mf9OdDdApvbMXPjhYh5n96iBLygysfIwidxLU4nhJGoUcuwYvEOMxzv4moKORVplSdhwqQQZnDCNyyx6UWKCy2F008b22HaRX"); 
    const body = { cart }; 
    const headers = { 
      "Content-Type": "application/json", 
      
    }; 
  
    
    const response = await fetch( 
      "http://localhost:5000/api/checkout", 
      { 
        method: "POST", 
        headers: headers, 
        credentials: 'include',
        body: JSON.stringify({
          body:body,
        }), 
      } 
    ); 

    const sessionData = await response.json(); 
    const sessionId = sessionData.id;

 
    const result = stripe.redirectToCheckout({ 
      sessionId: sessionId, 
      
    }); 
 
    if (result.error) { 
      console.log(result.error); 
    } 
  }; 

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(api + '/cart',{
          credentials: 'include'
        });
        const data = await response.json();
        setCart(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCart();
  },[]);

  useEffect(() => {
    // calculate the total price of all products in the cart
    let total = 0;
    if (cart.data) {
      for (const product of cart.data) {
        total += product.product.price * product.quantity;
      }
    }
    setTotalPrice(total);
  }, [cart]);

console.log((totalPrice).toFixed(2))
  return (
    <div className='w-1/2 mx-auto pb-20'>
      <h1 className='text-3xl text-center mb-6'>Cart Products</h1>
      {cart.data && cart.data.map((product) => (
        <div key={product.productId} className='flex'>
          <div className='w-1/3'>
            <img src={product.product.imageUrl} alt="cart-img" className='h-72' />
            <p className='text-xl mt-4'>{product.product.title}</p>
            <p className='text-xl mt-4'>{(product.product.price*product.quantity).toFixed(2)}€</p>
            <div className='flex text-xl mx-2 gap-x-6 mt-4'>
              <button onClick={()=> handleDecreaseItem(product.productId)}><AiOutlineMinus /></button>
              <p className=' font-bold '>{product.quantity}</p>
              <button onClick={()=> handleIncreaseItem(product.productId)}><AiOutlinePlus /> </button>
            </div>
          </div>
          <div className='grid grid-cols-1 content-end'>
            <button className='align-bottom border p-2 border-black' onClick={()=> handleRemoveItem(product.productId)}>Remove item from cart</button>
          </div>
          
        </div>
      ))}
      <div className='fixed top-1/3 right-1/3 border border-black p-4 rounded-lg h-1/3 shadow-2xl'>
        <h2 className='text-xl mt-4 text-center'>Amount to pay:</h2>
        <p className='text-xl mt-6 text-center'>{(totalPrice).toFixed(2)}€</p>
        
          <button className='border border-black mt-8 px-2 py-4' onClick={makePayment}>Proceed to Payment</button>
        
 
      </div>
      
    </div>
  );
  
}

export default Cart
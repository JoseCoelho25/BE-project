import React, {useState, useEffect} from 'react'
import { api } from "../../utils/config";
import {AiOutlinePlus,AiOutlineMinus} from 'react-icons/ai'


const Cart = () => {
  const [cart, setCart] = useState({});

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
      console.log(data);
      // update the cart state after removing the item
      setCart(data);
    } catch (err) {
      console.log(err);
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


  return (
    <div className='w-1/2 mx-auto pb-20'>
      <div className='text-3xl text-center mb-6'>Cart Products</div>
      {cart.data && cart.data.map((product) => (
        <div key={product.productId} className='flex'>
          <div className='w-1/3'>
            <img src={product.product.imageUrl} alt="cart-img" className='h-72' />
            <p className='text-xl mt-4'>{product.product.title}</p>
            <p className='text-xl mt-4'>{product.product.price}€</p>
            <div className='flex text-xl mx-2 gap-x-6 mt-4'>
              <AiOutlineMinus className='mt-1'/>
              <p className=' font-bold '>{product.quantity}</p>
              <AiOutlinePlus className='mt-1'/>  
            </div>
          </div>
          <div className='grid grid-cols-1 content-end'>
            <button className='align-bottom border p-2 border-black' onClick={()=> handleRemoveItem(product.productId)}>Remove item from cart</button>
          </div>
          
        </div>
      ))}
    </div>
  );
  
}

export default Cart
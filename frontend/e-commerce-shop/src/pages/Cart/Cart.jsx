import React, {useState, useEffect} from 'react'
import { api } from "../../utils/config";
import { useSelector } from 'react-redux'


const Cart = () => {
  const [cart, setCart] = useState({});
  const userToken = useSelector((state) => state.auth.user);

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
    <div className='w-1/2 mx-auto'>
      <div className='text-3xl text-center mb-6'>Cart Products</div>
      {cart.data && cart.data.map((product) => (
        <div key={product.productId} className='flex'>
          <img src={product.product.imageUrl} alt="cart-img" className='h-72' />
          <p className='mx-2 text-xl font-bold mt-4'>{product.quantity}</p>
          <p className='text-xl mt-4'>{product.product.title}</p>
          <button className='mt-20 border w-full border-black p-2 bg' onClick={()=> handleRemoveItem(product.productId)}>Remove item from cart</button>
        </div>
      ))}
    </div>
  );
  
}

export default Cart
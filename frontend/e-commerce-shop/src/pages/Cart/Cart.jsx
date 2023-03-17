import React, {useState, useEffect} from 'react'
import { api } from "../../utils/config";
import { useSelector } from 'react-redux'

const Cart = () => {
  const [cart, setCart] = useState({});
  const userToken = useSelector((state) => state.auth.user);
  //console.log(userToken.token)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(api + '/cart',{
          headers: {
            Authorization: `Bearer ${userToken.token}`
          }
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
        </div>
      ))}
    </div>
  );
  
}

export default Cart
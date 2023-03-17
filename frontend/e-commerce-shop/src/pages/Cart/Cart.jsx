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

  console.log(cart)
  return (
    <div>
      <div>Cart Products</div>
      {cart.data && cart.data.map((product) => (
        <div key={product.productId}>
          <p>{product.productId}</p>
          <p>{product.quantity}</p>
        </div>
      ))}
    </div>
  );
  
}

export default Cart
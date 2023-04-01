import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../utils/config';

const SingleOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${api}/orders/${orderId}`, {
          credentials: 'include'
        });
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <div className='mx-auto w-1/2 grid gap-y-4'>
        <h2 className='text-center text-2xl'>Order Receipt:</h2>
        <p className='text-xl'>Amount: {order?.order?.amount} EUR</p>
        <p className='text-xl'>Products:</p>
        <ul>
        {order?.order?.products &&
        order?.order?.products.map((product) => (
            <li key={product._id}>
                {product.product.title} - {product.product.price} EUR
            </li>
        ))}
        </ul>

    </div>
  );
};

export default SingleOrder;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from "../../utils/config";
import Chat from '../../components/Chat'

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = async () => {
    try {
      const response = await fetch(api + '/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ _id: productId })
      });
      const data = await response.json();
      console.log(data);
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(api + `/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className='flex justify-end mb-20'>
      {product?.data?.imageUrl && <img src={`http://localhost:5000/uploads/${product.data.imageUrl}`} alt="product-img" className='w-1/3'/>}
      <div className='w-1/3 p-48 '>
        <h1>{product?.data?.title}</h1>
        <p className='mb-10'>{product?.data?.price} EUR</p>
        <p className='text-sm tracking-wide leading-loose'>{product?.data?.description}</p>
        <button className='mt-20 border w-full border-black p-2 bg' onClick={handleAddToCart}>Adicionar ao carrinho</button>
        {addedToCart && <div className="text-green-500 text-xl mt-6 text-center">Produto adicionado ao carrinho</div>}
      </div>
      <Chat />
    </div>
  );
};

export default ProductDetails;

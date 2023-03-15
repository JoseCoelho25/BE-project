import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from "../../utils/config";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

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
    <div>
      
      <img src={product?.data?.imageUrl} alt="product-img" />
      <p>{product?.data?.title}</p>
    </div>
  );
};

export default ProductDetails;

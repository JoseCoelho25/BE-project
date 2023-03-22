import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from "../../utils/config";

const Editproduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(api + `/edit-products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [productId]);

  console.log(product)
  return (
    <div>Edit-product</div>
  )
}

export default Editproduct
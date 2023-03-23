import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from "../../utils/config";

const Editproduct = () => {
  const { productId } = useParams();
  const [image, setImage] = useState(null);

  const [product, setProduct] = useState({
    category: [],
    description: '',
    imageUrl: '',
    price: 0,
    title: '',
  });
  const navigate = useNavigate()
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', image);
      Object.entries(product).forEach(([key, value]) => formData.append(key, value));

    const response = await fetch(api + `/admin/edit-products/${productId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
      credentials: 'include',
    });

      const data = await response.json();
      console.log(data);
      navigate('/products')
    } catch (err) {
      console.log(err);
    }
  };
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(api + `/admin/edit-products/${productId}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        setProduct(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'image' ? prevProduct.image : value,
    }));
  };
  

  return (
    <form onSubmit={handleSubmit} className='mx-auto w-2/3'>
      <div className='flex'>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={product.title}
          onChange={handleChange}
          className='ml-4 w-full'
        />
      </div>
      <div className='flex'>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          className='ml-4 w-full'
        />
      </div>
      <div>
  <label htmlFor="image">Image</label>
  <input type="file" id="image" name="image" onChange={(e) => setImage(e.target.files[0])} />
</div>

      <div className='flex'>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          className='ml-4 w-full'
        />
      </div>
      <div className='flex'>
        <label htmlFor="category">Category</label>
        <input
          type='text'
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
          className='ml-4 w-full'
        />
      </div>
      
        <button type="submit" >Save</button>
      
      
    </form>
  );
};

export default Editproduct;

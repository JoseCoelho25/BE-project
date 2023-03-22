import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Cookies from "js-cookie";
import { api } from "../../utils/config";


const Products = () => {
    const [products, setProducts] = useState({})


    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await fetch(api + '/admin/products',{
              method: 'GET',
              headers: {
                    'Content-Type': 'application/json',
              },
              credentials: 'include',
            });
            const data = await response.json();
            setProducts(data);
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchProduct();
      }, []);

return (
    <div className='mx-auto w-2/3'>
      {products.data.map((product) => (
        <div key={product._id} className='grid grid-cols-3'>
          <div>
            <p>Product Name</p>
            <p>{product.title}</p>
          </div>
          <div>
            <p>Product Price</p>
            <p>{product.price}</p>
          </div>
          <div>
            <p>Product Category</p>
            <p>{product.category}</p>
          </div>
      </div>
      ))}
    </div>
)
}

export default Products
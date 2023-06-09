import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Cookies from "js-cookie";
import { api } from "../../utils/config";


const Products = () => {
    const [products, setProducts] = useState({})



        const fetchProducts = async () => {
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
        }
    
        useEffect(() => {
          fetchProducts();
        }, []);

        const handleRemove = async (_id) => {
          console.log(_id);
          try {
            const response = await fetch(api + '/admin/products', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                productId: _id,
              }),
            });
            const data = await response.json();
            
            if (data.success) {
              // Remove the deleted product from the products state
              setProducts(prevProducts => ({
                ...prevProducts,
                data: prevProducts.data.filter(product => product._id !== _id)
              }));
            }
          } catch (err) {
            console.log(err);
          }
        };
      

return (
    <div className='mx-auto w-2/3'>
      <Link to='/create' className='text-xl border border-black p-2'>
        Create new Product
      </Link>
      
      <div className='grid grid-cols-5 mb-2 mt-16 text-2xl'>
          <p>Product Name</p>
          <p>Product Price</p>
          <p>Product Category</p>
      </div>
      {products.data && products?.data.map((product) => (
        <div key={product._id} className='grid grid-cols-5 mb-2'>
            <p className='grid content-center'>{product.title}</p>
            <p className='grid content-center'>{product.price}€</p>
            <p className='grid content-center'>{product.category.join(', ')}</p>
            <Link to={`/edit-product/${product._id}`} className='border border-black w-28 h-10 text-center content-center grid'>Edit Product</Link>
            <button className='border border-black w-32 h-10 text-center content-center grid' onClick={()=> handleRemove(product._id)}>Remove Product</button>
      </div>
      ))}
    </div>
)
}

export default Products
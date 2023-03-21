import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAdminProducts } from '../../slices/shopSlice';

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.shop.products);
    const status = useSelector((state) => state.shop.status);
    const error = useSelector((state) => state.shop.error);

useEffect(() => {
    dispatch(fetchAllAdminProducts());
}, [dispatch]);

if (status === 'loading') {
    return <div>Loading...</div>;
}

if (status === 'failed') {
    return <div>{error}</div>;
}
return (
    <div className='grid grid-cols-2 mx-8 gap-y-2'>
    {products.map((product) => (
        <div key={product._id} >
            <div className='grid grid-cols-3 mr-20'>
                <div>
                    <h1>Name</h1>
                    <h2>{product.title}</h2>
                </div>
                <div>
                    <h1>Price</h1>
                    <p className=''>{product.price}€</p>
                </div>
                <div>
                    <h1>Category</h1>
                    <p>{product.category}</p>
                </div>
            </div>
          {/* <p>{product.description}</p> */}
        </div>))}
    </div>
)
}

export default Products
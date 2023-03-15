import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../slices/shopSlice';

const Home = ({product}) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shop.products);
  const status = useSelector((state) => state.shop.status);
  const error = useSelector((state) => state.shop.error);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div className='grid grid-cols-2 mx-8 gap-y-10 mb-20'>
      {products.map((product) => (
        <div key={product._id} >
          <Link to={`/products/${product._id}`}>
            <img src={product.imageUrl} alt="clothes imgs" />
          </Link>
          <div className='grid grid-cols-2 mr-20'>
            <h2>{product.title}</h2>
            <p className='text-end'>{product.price}€</p>
          </div>
          {/* <p>{product.description}</p> */}
        </div>))}
    </div>
  )
}

export default Home
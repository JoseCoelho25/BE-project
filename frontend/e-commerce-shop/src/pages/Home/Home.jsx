import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../slices/shopSlice';

const Home = () => {
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
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.title}</h2>
          <p>{product.price}</p>
          <img src={product.imageUrl} alt="clothes imgs" srcset="" />
          <p>{product.description}</p>
          </div>))}
          </div>
  )
}

export default Home
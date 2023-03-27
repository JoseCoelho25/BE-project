import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../slices/shopSlice';
import {BsColumnsGap} from 'react-icons/bs'

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

  const [numCols, setNumCols] = useState(2);


  return (
    <div>
      <div className='flex justify-end mr-28 mb-6'>
        <BsColumnsGap onClick={() => setNumCols(numCols === 1 ? 3 : 1)} className='h-10 w-10 cursor-pointer active:bg-gray-400'/>
      </div>
      
    <div className={`grid grid-cols-${numCols} mx-8 gap-y-10 mb-20`}>
      

      {products?.map((product) => (
        <div key={product._id} >
          <Link to={`/products/${product._id}`}>
            <img src={`http://localhost:5000/uploads/${product.imageUrl}`} alt="clothes imgs" />
          </Link>
          <div className='grid grid-cols-2 mr-20'>
            <h2>{product.title}</h2>
            <p className='text-end'>{product.price}€</p>
          </div>
          {/* <p>{product.description}</p> */}
        </div>))}
    </div>
    </div>
  )
}

export default Home
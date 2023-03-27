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
  const [gridWidth, setGridWidth] = useState('w-1/2');

  useEffect(() => {
    if (numCols === 4) {
      setGridWidth('w-full');
    } else {
      setGridWidth('w-1/2');
    }
  }, [numCols]);


  return (
    <div>
      <div className='flex justify-end mr-28 mb-6'>
        <BsColumnsGap onClick={() => setNumCols(numCols === 1 ? 4 : 1)} className='h-10 w-10 cursor-pointer active:bg-gray-400'/>
      </div>
      
    <div className={`grid grid-cols-${numCols - 1}  gap-y-10 mb-20 mx-auto ${gridWidth}`}>
      

      {products?.map((product) => (
        <div key={product._id} >
          <Link to={`/products/${product._id}`}>
            <img src={`http://localhost:5000/uploads/${product.imageUrl}`} alt="clothes imgs" />
          </Link>
          <div className='grid grid-cols-2 mx-auto'>
            <h2>{product.title}</h2>
            <p className='text-end mr-14'>{product.price}€</p>
          </div>
          {/* <p>{product.description}</p> */}
        </div>))}
    </div>
    </div>
  )
}

export default Home
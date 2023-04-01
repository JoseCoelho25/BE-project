import './App.css';

//Pages
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Layout from './components/Mainlayout/Layout';
import ProductDetails from './pages/Home/ProductDetails'
import Success from './pages/Checkout/Success'
import Cancel from './pages/Checkout/Cancel'
import EditProduct from './pages/Admin/Editproduct';
import Products from './pages/Admin/Products';
import Cart from './pages/Cart/Cart';
import CreateProduct from './pages/Admin/CreateProduct';
import ResetPassword from './pages/Auth/ResetPassword';

//import EditProfile from './pages/EditProfile/EditProfile'

//Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Hooks
import { useAuth } from './hooks/useAuth';
import SingleOrder from './pages/Order/SingleOrder';



function App() {
  const {auth, loading} = useAuth()

  if(loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={auth ? <Home /> : <Navigate to='/login'/>} />
          <Route path="/products" element={auth ? <Products /> : <Navigate to='/login'/>} />
          <Route path="/edit-product/:productId" element={auth ? <EditProduct /> : <Navigate to='/login'/>} />
          <Route path="/products/:productId" element={auth ? <ProductDetails/> : <Navigate to='/login'/>} ></Route>
          <Route path='/create' element={auth ? <CreateProduct/> : <Navigate to='/login'/>} />
          <Route path='/cart' element={auth ? <Cart/> : <Navigate to='/login'/>} />
          <Route path='/order/:orderId' element={auth ? <SingleOrder/> : <Navigate to='/login'/>} />
          <Route path="/success" element={auth ? <Success/> : <Navigate to='/login'/>} /> 
          <Route path="/cancel" element={auth ? <Cancel/> : <Navigate to='/login'/>} /> 
          <Route path="/login" element={!auth ? <Login /> : <Navigate to='/' />} />
          <Route path="/register" element={!auth ? <Register /> : <Navigate to='/' />} />
          <Route path="/resetPassword" element={!auth ? <ResetPassword /> : <Navigate to='/' />} />
        </Routes>
      </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;

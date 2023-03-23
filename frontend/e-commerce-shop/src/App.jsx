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

//import EditProfile from './pages/EditProfile/EditProfile'

//Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Hooks
import { useAuth } from './hooks/useAuth';
import Cart from './pages/Cart/Cart';
import CreateProduct from './pages/Admin/CreateProduct';




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
          <Route path='/create' element={<CreateProduct/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path="/success" element={<Success />} /> 
          <Route path="/cancel" element={<Cancel />} /> 
          <Route path="/login" element={!auth ? <Login /> : <Navigate to='/' />} />
          <Route path="/register" element={!auth ? <Register /> : <Navigate to='/' />} />
        </Routes>
      </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;

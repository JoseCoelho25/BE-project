import './App.css';

//Pages
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Layout from './components/Mainlayout/Layout';
import ProductDetails from './pages/Home/ProductDetails'
//import EditProfile from './pages/EditProfile/EditProfile'

//Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Hooks
import { useAuth } from './hooks/useAuth';

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
          {/* <Route path="/profile" element={auth ? <EditProfile /> : <Navigate to='/login' />} /> */}
          <Route path="/products/:productId" element={<ProductDetails/>} ></Route>
          <Route path="/login" element={!auth ? <Login /> : <Navigate to='/' />} />
          <Route path="/register" element={!auth ? <Register /> : <Navigate to='/' />} />
        </Routes>
      </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;

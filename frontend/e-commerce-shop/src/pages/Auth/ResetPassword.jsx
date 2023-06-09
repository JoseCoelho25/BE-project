import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../../components/Message'

//Redux
import { resetPassword,reset, } from '../../slices/authSlice'

const ResetPassword = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const {loading, error} = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault();
        
    const user = {
        email,
        password
    }

    dispatch(resetPassword(user))
      .then(() => {
        navigate('/login');
      });
}

  //Clean all auth states
    useEffect(()=> {
        dispatch(reset());
    }, []);
    
  return (
    <div className="bg-black w-1/2 xl:w-1/3 mx-auto p-10 my-20 border-2 border-gray-700">
        <h2 className="text-6xl text-center text-white">Shop Easy</h2>
        <p className="text-2xl tracking-wider my-10 text-white text-center">Escreva o seu email e sua nova password!</p>
        <form onSubmit={handleSubmit} className="border-b-2 border-gray-800 grid grid-cols-1 gap-y-4">
            <input type="email" placeholder="E-mail" className="py-2 pl-2"  onChange={(e) => setEmail(e.target.value)} value={email || ''}/>
            <input type="password" placeholder="Password" className="py-2 pl-2"  onChange={(e) => setPassword(e.target.value)} value={password || '' }/>
            {!loading && <input type="submit" value="Modificar" className="bg-blue-500 text-white font-bold cursor-pointer py-2 rounded-md text-xl mt-5 mb-12 hover:opacity-80" />}
            {loading && <input type="submit" value="Aguarde..." className="bg-blue-500 text-white font-bold cursor-pointer py-2 rounded-md text-xl mt-5 mb-12 hover:opacity-80" />}
            {error && <Message msg={error} type='error'/>}
        </form>
  </div>
  )
}

export default ResetPassword
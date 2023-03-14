import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../../components/Message'

//Redux
import { register, reset } from '../../slices/authSlice'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

const dispatch = useDispatch(); //this allows me to use redux functions

const { loading, error } = useSelector((state) => state.auth);

const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
        name,
        email,
        password,
        confirmPassword
    }
    console.log(user)

    dispatch(register(user));
}

   // Clean all auth states
useEffect(() => {
    dispatch(reset());
}, [dispatch]);

return (
    <div className="bg-black w-1/2 xl:w-1/3 mx-auto p-10 my-20 border-2 border-gray-700">
    <h2 className="text-6xl text-center text-white">Shop Easy</h2>
    <p className="text-center text-2xl tracking-wider my-10 text-white">Faça login para começar a comprar!</p>
    <form onSubmit={handleSubmit} className="border-b-2 border-gray-800 grid grid-cols-1 gap-y-4">
        <input type="text" placeholder="Nome" className="py-2 pl-2" onChange={(e)=> setName(e.target.value)} value={name || ''} />
        <input type="email" placeholder="E-mail" className="py-2 pl-2" onChange={(e)=> setEmail(e.target.value)} value={email || ''} />
        <input type="password" placeholder="Password" className="py-2 pl-2" onChange={(e)=> setPassword(e.target.value)} value={password || ''} />
        <input type="password" placeholder="Confirme a password" className="py-2 pl-2" onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword || ''} />
        {!loading && <input type="submit" value="Register" className="bg-blue-500 text-white font-bold cursor-pointer py-2 rounded-md text-xl mt-5 mb-12 hover:opacity-80" />}
        {loading && <input type="submit" value="Aguarde..." className="bg-blue-500 text-white font-bold cursor-pointer py-2 rounded-md text-xl mt-5 mb-12 hover:opacity-80" />}
        {error && <Message msg={error} type='error'/>}
    </form>
    <p className="text-xl mt-10 text-center text-white">
        Já tem conta? <Link to="/login" className="text-blue-500 font-bold">Clique aqui.</Link>
    </p>
    </div>
    
)
}

export default Register
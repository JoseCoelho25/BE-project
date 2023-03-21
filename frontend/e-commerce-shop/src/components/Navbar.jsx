import React, {useState} from 'react'

import { NavLink, Link } from 'react-router-dom'
import {BsSearch, BsHouseDoorFill,BsFillCartDashFill, BsFillPersonFill, BsFillCameraFill} from 'react-icons/bs'

//Hooks
import { useAuth } from '../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//Redux
import { logout,reset } from '../slices/authSlice'
import Cookies from 'js-cookie'; // import Cookies

const Navbar = () => {
    const {auth} = useAuth();
    const {user} = useSelector((state) => state.auth)

    const userCookie = Cookies.get('user');
    const userData = userCookie ? JSON.parse(userCookie) : null;
    console.log(userData)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())

        navigate('/login')
    }

return (
    <nav className="flex justify-between align-middle border-t-2 border-[#363636] p-4 mx-8 mb-20">
        <Link to="/" className="py-2 text-4xl">Shop Easy</Link>
        {userData?.role === 'publisher' ? (
            <>
            <NavLink>
                <p>Admin Edit Product</p>
            </NavLink>
            <NavLink>
                <p>Admin Products</p>
            </NavLink>
            </>
        ): (
            ''
        )}
        
        <form className="flex relative w-1/4 rounded-lg ml-20 border-2 border-black">
            <BsSearch className="absolute  top-2 h-6 w-6 left-1"/>
            <input type="text" placeholder='Search' className="pl-8 py-2 w-full rounded-lg"/>
        </form>
        <ul className="flex align-middle gap-x-6 cursor-pointer">
            {auth ? (
                <>
                    <NavLink to="/" >
                        <BsHouseDoorFill className="h-8 w-8"/>
                    </NavLink>
                    {user && (
                        <NavLink to={'/cart'}>
                            <BsFillCartDashFill className="h-8 w-8"/>
                        </NavLink>
                    )}
                    <span className="text-2xl" onClick={handleLogout}>Exit</span>
                </>
            ) : (
                <>
                    <NavLink to="/login" className="py-2">
                    Login
                    </NavLink>
                    <NavLink to="/register" className="py-2">
                    Register
                    </NavLink>
                </>
            )}
            
        </ul>
    </nav>
)
}

export default Navbar
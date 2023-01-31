import React, { useState } from 'react';

import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css'
import { useContext } from 'react';
import { AuthContext } from '../ContextApi/UserContext';

const Header = () => {
    const [open, setOpen] = useState(false)
    const { user, logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    const logOutHandler = () => {
        const decision = window.confirm("Are You Want to Log Out")
        if (decision) {
            logOut()
                .then(() => {
                    navigate('/login')
                })
        }

    }
    return (
        <div className='bg-black text-white'>
            <div onClick={() => setOpen(!open)} className='lg:hidden lg:mx-0 mx-5 py-5'>
                {
                    open ? <FontAwesomeIcon icon={faXmark} className='h-7 icon' /> :
                        <FontAwesomeIcon icon={faBars} className='h-7 icon' ></FontAwesomeIcon>
                }
            </div>
            <div className='text-center lg:py-5 '>
                <ul className={`lg:flex  justify-center lg:static absolute  w-full ulStyle
               ${open ? 'top-[50px] bg-black' : 'top-[-400px]'}`}>
                    <li className='lg:mx-10'>
                        <NavLink className={({ isActive }) =>
                            isActive ? "navlink" : undefined
                        } to='/'>Home</NavLink>
                    </li>
                    <li className='lg:mx-10 my-3 lg:my-0 '>
                        <NavLink className={({ isActive }) =>
                            isActive ? "navlink" : undefined
                        } to='/add'>Add Data</NavLink>
                    </li>
                    <li className='lg:mx-10'>
                        <NavLink className={({ isActive }) =>
                            isActive ? "navlink" : undefined
                        } to='/dashboard'>Dashboard</NavLink>
                    </li>
                    {
                        user ? <li className='logout lg:mx-10 lg:my-0 my-3 lg:pb-0 pb-5 ' onClick={logOutHandler}>Log Out</li> : <li className='lg:mx-10 my-3 lg:pb-0 pb-5 lg:my-0'>
                            <NavLink className={({ isActive }) =>
                                isActive ? "navlink" : undefined
                            } to='/login'>Login</NavLink>
                        </li>
                    }
                </ul>
            </div>
        </div >
    );
};

export default Header;
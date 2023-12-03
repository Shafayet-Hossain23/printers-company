import React, { useState } from 'react';

import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css'
import { useContext } from 'react';
import { AuthContext } from '../ContextApi/UserContext';
import logo1 from './../Asset/printers.png'

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
        <div className='bg-[#FACAC0] text-black font-medium tracking-widest'>
            <div onClick={() => setOpen(!open)} className='lg:hidden lg:mx-0 mx-5  py-5 flex justify-between'>
                <div>
                    {
                        open ? <FontAwesomeIcon icon={faXmark} className='h-7 icon' /> :
                            <FontAwesomeIcon icon={faBars} className='h-7 icon' ></FontAwesomeIcon>
                    }
                </div>
                <div className='text-lg font-semibold tracking-widest'>
                    <p >BEST PRINTERS LTD.</p>
                </div>
            </div>
            <div className='text-center  '>
                <div className='lg:flex justify-between antialiased  hidden'>
                    <div className='text-3xl font-semibold pl-10 pt-4'>
                        <p >Best Printers LTD.</p>
                    </div>
                    <div className='bg-black'>
                        <img className="w-20 h-20 " src={logo1} alt="" />
                    </div>
                </div>
                <ul className={`lg:flex z-50 justify-center lg:static absolute w-full ulStyle pb-5 transition-all duration-300 ${open ? 'top-[50px] bg-[#FACAC0] shadow-xl' : 'top-[-400px]'}`}>


                    <li className='lg:mx-10 lg:my-0 my-6'>
                        <NavLink className={({ isActive }) =>
                            isActive ? "navlink" : 'hoverStyle  p-[10px] hover:duration-500'
                        } to='/'>Home</NavLink>
                    </li>


                    <li className='lg:mx-10 lg:my-0 my-6'>
                        <NavLink className={({ isActive }) =>
                            isActive ? "navlink" : 'hoverStyle  p-[10px] hover:duration-500'
                        } to='/add'>Add Expenses</NavLink>

                    </li>

                    <li className='lg:mx-10 lg:my-0 my-6'>
                        <NavLink className={({ isActive }) =>
                            isActive ? "navlink" : 'hoverStyle  p-[10px] hover:duration-500'
                        } to='/dashboard'>Dashboard</NavLink>
                    </li>

                    {
                        user ? <li className='logout lg:mx-10 lg:my-0 my-6 lg:pb-0 pb-5  ' onClick={logOutHandler}>
                            <NavLink className="hoverStyle hover:duration-500 p-[10px]">Logout</NavLink>
                        </li> :
                            <li className='lg:mx-10 lg:my-0 my-6'>
                                <NavLink className={({ isActive }) =>
                                    isActive ? "navlink" : ' my-3 lg:pb-0 pb-5 lg:my-0 p-[10px] hoverStyle hover:duration-500'
                                } to='/login'>Login</NavLink>
                            </li>

                    }
                </ul>
            </div>
        </div >
    );
};

export default Header;
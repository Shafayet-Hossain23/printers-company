import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import ShowAllData from './ShowAllData';
import './DashBoard.css'
import Footer from '../Footer/Footer';
import { useState } from 'react';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleOptionClick = () => {
        setIsOpen(false); // Close the dropdown when an option is clicked
    };

    return (
        <div>
            <Header></Header>
            <div >
                <div className=' flex justify-end mr-10'>
                    <div className="dropdown">

                        <button onClick={toggleDropdown} className="dropdown-toggle  lg:mt-5 mt-9 p-3  hover:cursor-pointer border hover:bg-[black] hover:border hover:text-[#FACAC0] rounded-md  font-semibold tracking-widest hover:duration-500">
                            🔍 Data Filter
                        </button>
                        {isOpen && (
                            <ul className="dropdown-menu">
                                <Link onClick={handleOptionClick} to="/dashboard"><li>
                                    All Data
                                </li></Link>


                                <Link onClick={handleOptionClick} to='/dashboard/showByDate'>
                                    <li>Show Data By Date</li>
                                </Link>


                                <Link onClick={handleOptionClick} to='/dashboard/showByMonth'><li>
                                    Show Data By Month</li></Link>


                                <Link onClick={handleOptionClick} to='/dashboard/showByYear'><li>
                                    Show Data By Year</li></Link>


                                <Link onClick={handleOptionClick} to='/dashboard/showByCatg'><li>Show Data By Catgegory</li></Link>

                            </ul>
                        )}
                    </div>
                </div>
                {/* <div className='lg:w-1/6  lg:h-screen lg:sticky top-0 bg-slate-300 '>
                    <div className='lg:mt-20 lg:pl-4 pl-10'>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashLink" : undefined
                        } to='/dashboard/showByDate'><button className="btn btn-ghost">Show Data By Date</button></NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashLink" : undefined
                        } to='/dashboard/showByMonth'><button className="btn btn-ghost">Show Data By Month</button></NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashLink" : undefined
                        } to='/dashboard/showByYear'><button className="btn btn-ghost">Show Data By Year</button></NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashLink" : undefined
                        } to='/dashboard/showByCatg'><button className="btn btn-ghost mb-3">Show Data By Catg</button></NavLink>
                    </div>
                </div> */}
                <div className='w-full'>
                    <Outlet></Outlet>

                </div>

            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;
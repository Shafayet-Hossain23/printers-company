import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import ShowAllData from './ShowAllData';
import './DashBoard.css'
import Footer from '../Footer/Footer';

const Dashboard = () => {
    return (
        <div>
            <Header></Header>
            <div className='lg:flex '>
                <div className='lg:w-1/6  lg:h-screen lg:sticky top-0 bg-slate-300 '>
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
                </div>
                <div className='lg:w-5/6'>
                    <Outlet></Outlet>

                </div>

            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;
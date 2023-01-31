import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../ContextApi/UserContext';

const ErrorPage = () => {
    const { user, logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    const logOutHandler = () => {

        logOut()
            .then(() => {
                navigate('/login')
            })
            .catch(error => {

            })


    }
    return (

        <div className='lg:w-2/6 w-2/3 mx-auto  shadow-xl   mt-24 bg-slate-300 lg:p-8 lg:pb-5 p-8 mb-8'>
            <div>
                <p>
                    Your Session is Expired. Please logout and login again.
                </p>
                <button className="link link-primary" onClick={logOutHandler}>Logout</button>
            </div>
        </div>

    );
};

export default ErrorPage;
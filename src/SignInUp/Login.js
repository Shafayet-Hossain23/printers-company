import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import useToken from '../Components/useToken';
import { AuthContext } from '../ContextApi/UserContext';

const Login = () => {
    const { user, loginEmailPass, passwordReset } = useContext(AuthContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [pageLoader, setPageLoader] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || '/'
    const [tokenEmail, setTokenEmail] = useState('')
    const token = useToken(tokenEmail)
    useEffect(() => {
        if (token) {
            setPageLoader(false)
            setProcessing(false)
            navigate(from, { replace: true });
        }
    }, [token])
    const formHandler = (data) => {
        const { userEmail, userPassword } = data
        setError('')
        setProcessing(true)
        loginEmailPass(userEmail, userPassword)
            .then(result => {
                const user = result.user
                setPageLoader(true)
                setTokenEmail(userEmail)
            })
            .catch(error => {
                const message = error.message
                setProcessing(false)
                setError(message)
            })
    }
    // const emailCollectorHandler = (data) => {
    //     const { userEmail, userPassword } = data
    //     console.log(data)
    // }

    if (pageLoader) {
        return <Loading></Loading>
    }
    return (
        <div className='bg-[#FACAC0] lg:pt-10 pb-10'>
            <div className='lg:w-1/3 w-9/12  shadow-xl mx-auto   bg-[white] text-black rounded-lg lg:p-14  lg:pb-5 p-8 mb-8'>
                <div>
                    <p className='text-center text-3xl font-semibold mb-5 tracking-widest'>Login Now</p>
                </div>
                <form onSubmit={handleSubmit(formHandler)} >
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Your Email?</span>

                        </label>
                        <input
                            {...register("userEmail", {
                                required: "Email is required"
                            })}
                            name="userEmail" type="email" placeholder="Email" className="input input-bordered w-full " />
                        {
                            errors.userEmail && <div className='text-error' type='alert'>{errors.userEmail?.message}</div>
                        }

                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Your Password?</span>

                        </label>
                        <input
                            {...register("userPassword", {
                                required: "Password is required"
                            })}
                            type="password" placeholder="Password" className="input input-bordered w-full " />
                        {
                            errors.userPassword && <div className='text-error' type='alert'>{errors.userPassword?.message}</div>
                        }
                        {/* <label className="label">
                        <span className="label-text-alt"></span>
                        <span className="label-text-alt link link-primary">Reset Password</span>
                    </label> */}

                    </div>
                    <div>
                        {
                            error && <div className='text-red-600 mt-4'>{error}</div>
                        }
                    </div>
                    <div>
                        <button type="submit" disabled={processing} className='btn btn-outline mt-8 w-full text-black hover:bg-black hover:text-white tracking-widest'>Login Now</button>
                    </div>
                </form>
                <div className="divider text-black">OR</div>
                <div className='text-center text-black'>
                    <p>New to this website? <Link to='/register' className='text-primary'>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
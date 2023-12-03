import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import useToken from '../Components/useToken';
import { AuthContext } from '../ContextApi/UserContext';

const Register = () => {
    const { profileUpdate, setLoading, registerWithEmailPass, emailVerification } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [userCreatedEmail, setUserCreatedEmail] = useState('')
    const [pageLoader, setPageLoader] = useState(false)
    const [processing, setProcessing] = useState(false)
    const token = useToken(userCreatedEmail)
    useEffect(() => {
        if (token) {
            setPageLoader(false)
            setProcessing(false)
            navigate('/')
        }
    }, [token])
    const registerHandler = (data) => {
        const { userName, userEmail, userPassword } = data
        // console.log(userName)
        setError('')
        setProcessing(true)
        registerWithEmailPass(userEmail, userPassword)
            .then(result => {
                const user = result.user
                profileUpdate(userName)
                    .then(result => {
                        setPageLoader(true)
                        saveUserData(userName, userEmail)
                    })
            })
            .catch(error => {
                const message = error.message
                // console.log(message)

                setProcessing(false)
                setError(message)
            })
    }
    const saveUserData = (name, email) => {
        const userInfo = {
            name,
            email,
            // status: "admin"
        }
        fetch(`https://printers-server.vercel.app/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.acknowledged) {
                    setLoading(false)
                    setUserCreatedEmail(email)
                }
            })
    }
    if (pageLoader) {
        return <Loading></Loading>
    }
    return (
        <div className='bg-[#FACAC0] lg:pt-10 pb-10'>
            <div className='lg:w-1/3 w-9/12  shadow-xl mx-auto   bg-[white] rounded-lg lg:p-8 lg:pb-5 p-8 pb-8'>
                <div>
                    <p className='text-center text-3xl font-semibold mb-1 text-black tracking-widest'>Register Now</p>
                </div>
                <form onSubmit={handleSubmit(registerHandler)}>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text text-black">Your name?</span>

                        </label>
                        <input
                            {...register("userName",
                                {
                                    required: "Name is required"
                                }
                            )}
                            type="text" placeholder="Type Name" className="input input-bordered w-full" />
                        {
                            errors.userName && <div className='text-error' type='alert'>{errors.userName?.message}</div>
                        }
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Email?</span>

                        </label>
                        <input
                            {...register("userEmail",
                                {
                                    required: "Email is required"
                                }
                            )}
                            type="email" placeholder="Type Email" className="input input-bordered w-full " />
                        {
                            errors.userEmail && <div className='text-error' type="alert">
                                {errors.userEmail?.message}
                            </div>
                        }

                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">Password?</span>
                        </label>
                        <input
                            {...register("userPassword",
                                {
                                    minLength: { value: 6, message: "Password should be atleast 6 characters" },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*?/])(?=.*[0-9])(?=.*[a-z])/, message: "Password must have a uppercase,lowercase,number & special character" }

                                }

                            )}
                            type="password" placeholder="Type Password" className="input input-bordered w-full " />
                        {
                            errors.userPassword && <div className='text-error' type="alert">
                                {errors.userPassword?.message}
                            </div>
                        }

                    </div>
                    <div>
                        {
                            error && <div className='text-red-600 mt-4'>{error}</div>
                        }
                    </div>
                    <button type="submit" disabled={processing} className='btn btn-outline mt-8 w-full text-black hover:bg-black hover:text-white tracking-widest'>Register</button>
                </form>
                <div className="divider text-black">OR</div>
                <div className='text-center text-black'>
                    <p>Already have an account? <Link to='/login' className='text-primary'>Login</Link></p>
                </div>

            </div>
        </div>
    );
};

export default Register;
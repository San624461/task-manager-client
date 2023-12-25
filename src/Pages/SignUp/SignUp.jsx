import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../Providers/Authprovider';



const SignUp = () => {

    const [error, setError] = useState('')
    const location = useLocation()

    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext)


    const navigate = useNavigate()

    let from = location.state?.from?.pathname || "/";
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const handleGoogleSignIn = async(data) => {
      
        try {
            const result = await googleSignIn(data?.email,data?.password);
            

            Swal.fire(
                'Good job!',
                'Logged In Successfully!',
                'success'
            )

            navigate(from, { replace: true });

        } catch (error) {
            setError(error);
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }


    }

    const submit = async (data) => {
        console.log(data);

        try {
            // Create user account
            const createUserResult = await createUser(data.email, data.password);
            

            const loggerUser = createUserResult.user;
          

            // Update user profile with name and photo
            await updateUserProfile(data.name, data.photo);

           
      

            const userInfo = {

                name: data.name,
                email: data.email,
                
            }
        

            fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userInfo)
    
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if(data.insertedId){
                        Swal.fire({
                            title: 'Success!',
                            text: 'Product added Successfully',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                          })
                    }

                    navigate('/');
                    window.location.reload()
                   
                })



        } catch (error) {
            console.error('Error during sign-up:', error);

            Swal.fire({
                title: 'Error!',
                text: 'Failed To Sign Up',
                icon: 'error',
                confirmButtonText: 'Cool'
            });
        }
    };





    return (
        <div>
            {/*sign up  */}

            <div className="hero min-h-screen">
                <div className="hero-content flex-col ">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl  text-center font-bold ">Sign Up To Join</h1>
                        {/* <img src={signIn} alt="" /> */}
                    </div>
                    <div className="card shrink-0 w-full lg:w-[600px] shadow-2xl bg-base-100">
                        <form className="card-body bg-black" onSubmit={handleSubmit(submit)}>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-white">Name</span>
                                </label>
                                <input  {...register("name")} type="text" placeholder="Your Name"
                                    className="input" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text   font-bold  text-white">PhotoUrl</span>
                                </label>
                                <input  {...register("photo", { required: true })} type="text" placeholder="Photo URL"
                                    className="input 
                                    
                                   input-bordered" />
                                {errors.photo && <span className="text-red-600">Photo is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-white">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="Your Email" name="email"
                                    className="input input-bordered" required />
                                {errors.email && <span className='text-red-600'>Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text   font-bold text-white">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true, minLength: 6, maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} placeholder="Your Password"
                                    name="password"
                                    className="input input-bordered" />

                                {errors.password?.type === "required" && (
                                    <p className="text-red-600">Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-600">Password must be 6 character</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className="text-red-600">Password must be less than 20 character</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-600">Password must be one uppercase ,one lowercase ,one number and one special character</p>
                                )}

                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value='Sign Up' className="btn  bg-pink-400" />

                            </div>

                            <p className="px-4 text-white"><small>Already Have An Account <Link className='text-blue-300' to='/login'> Log In</Link></small></p>
                        </form>
                        <button onClick={handleGoogleSignIn} className="btn">
                            Google
                            <FaGoogle></FaGoogle>
                        </button>

                        {/* <SocialLogin></SocialLogin> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../Providers/Authprovider';
import Swal from 'sweetalert2';
const Login = () => {

    const { signIn, googleSignIn } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    let from = location.state?.from?.pathname || "/";

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


    const handleLogin = async (data) => {

        console.log(data);
        
        
                try {
                    const result = await signIn(data?.email,data?.password);
                    
        
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
    return (
        <div className="hero min-h-screen">
        <div className="hero-content flex-col">
            <div className="text-center md:w-1/2 lg:text-left">
                <h1 className="text-4xl  text-center font-bold">Login</h1>
                {/* <img src={} alt="" /> */}
            </div>
            <div className="card shrink-0 w-full lg:w-[600px] shadow-2xl bg-base-100">
                <form className="card-body bg-black" onSubmit={handleSubmit(handleLogin)}>



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
                            required: true
                        })} placeholder="Your Password"
                            name="password"
                            className="input input-bordered" />



                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" value='Login' className="btn  bg-pink-400" />

                    </div>

                    <p className="px-4 text-white"><small>Already Have An Account <Link className='text-blue-300' to='/signup'>Sign Up</Link></small></p>
                </form>


                <button onClick={handleGoogleSignIn} className="btn">
                    Google
                    <FaGoogle></FaGoogle>
                </button>

                {/* <SocialLogin></SocialLogin> */}
            </div>
        </div>
    </div>
    );
};

export default Login;
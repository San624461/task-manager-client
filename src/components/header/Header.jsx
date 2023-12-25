import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Providers/Authprovider';
import Swal from 'sweetalert2';
import img from '../../media/background.webp'

const Header = () => {
  const { user, logOut } = useContext(AuthContext)

  const handleLogout = () => {
    logOut()
      .then(() => {


        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Logged Out",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(error => console.error(error))
  }
  return (
    <div>
      <div className="navbar bg-pink-400">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Task Manager</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
           <NavLink to='/blog'> <li><a>Blog</a></li></NavLink>
            {
              user ? <>
                <li><NavLink to='/dashboard'>Dashboard</NavLink></li>

                <li><button onClick={handleLogout} className='btn py-0 pt-3'>Log Out</button></li></>

                :
                <><li><NavLink to='/signup'>Sign Up</NavLink></li>
                  <li><NavLink to='/login'>Log In</NavLink></li></>

              //   <li>
              //   <details>
              //     <summary>
              //       Join
              //     </summary>
              //     <ul className="p-2 bg-base-100 rounded-t-none">
              //    <li><NavLink to='/signup'>Sign UP</NavLink></li>
              //    <li><NavLink to='/login'>Log In</NavLink></li>
              //     </ul>
              //   </details>
              // </li>


            }
          </ul>
        </div>
      </div>

{/* banner */}
<div>
<div className="hero min-h-screen" style={{backgroundImage: 'url(https://i.ibb.co/2sFpkjf/background.webp)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold text-pink-300">Organize it all</h1>
      <p className="mb-5">With Task Manager</p>
     <Link to='/login'> <button className="btn btn-primary bg-white text-pink-300 border-none">Let's Explore</button></Link>
    </div>
  </div>
</div>
  
  </div>      
    </div>
  );
};

export default Header;
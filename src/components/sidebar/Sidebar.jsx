import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/Authprovider';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <ul className='bg-pink-400 text-white h-[100vh] p-4 list-none space-y-3 max-w-[20vw]'>
                <li>{user?.displayName}</li>
                <li>
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src={user?.photoURL} />
                        </div>
                    </div>
                </li>
                <li>
                    <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li>
                    <Link to='/'>Home</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
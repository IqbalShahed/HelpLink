import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-lg font-bold"><Link to="/">HelpLink</Link></h1>
                <ul className="flex space-x-4">
                    <li><Link to="/" className="hover:underline">Home</Link></li>
                    {user && user.role === 'volunteer' && (
                        <li><Link to="/volunteer-dashboard" className="hover:underline">Dashboard</Link></li>
                    )}
                    {user && user.role === 'organization' && (
                        <li><Link to="/organization-dashboard" className="hover:underline">Dashboard</Link></li>
                    )}
                    {user ? (
                        <li className='hover:underline cursor-pointer' onClick={logout}>Logout</li>
                    ) : (
                        <li><Link to="/login" className="hover:underline">Login</Link></li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
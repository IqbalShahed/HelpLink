import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';




const Login = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'volunteer',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`https://helplink.onrender.com/api/${formData.role}/login`, formData);

            // Store JWT in local storage
            localStorage.setItem('token', response.data.token);

            // Decode JWT to get user data (if needed)
            const decodedUser = jwtDecode(response.data.token);
            // Update user context with fetched user data
            setUser(decodedUser);
            // console.log('user', user);
            // Redirect based on role
            if (user.role === 'volunteer') {
                navigate('/volunteer-dashboard');
                // console.log('Volunteer')
            } else if (user.role === 'organization') {
                navigate('/organization-dashboard');
                // console.log('Organization')
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
            // console.log(err)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="border rounded py-2 px-3 w-full"
                        >
                            <option value="volunteer">Volunteer</option>
                            <option value="organization">Organization</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border rounded py-2 px-3 w-full"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border rounded py-2 px-3 w-full"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 px-4 bg-blue-500 text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>

                    <div className="text-center">
                        <p>
                            Not registered yet?{' '}
                            <Link className="text-blue-700 underline" to="/register">
                                Register Now
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

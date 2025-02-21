import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [isVolunteer, setIsVolunteer] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        skills: '', // Comma-separated for volunteers
        mission: '', // Specific to organizations
        website: '', // Specific to organizations
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Toggle form type
    const toggleForm = () => {
        setIsVolunteer(!isVolunteer);
        setFormData({
            name: '',
            email: '',
            phone: '',
            location: '',
            skills: '',
            mission: '',
            website: '',
            password: '',
            confirmPassword: '',
        });
        setError('');
        setSuccess('');
    };

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Validate inputs
    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~-]).{8,}$/;

        if (!formData.name.trim()) {
            return 'Name is required.';
        }

        if (!emailRegex.test(formData.email)) {
            return 'Invalid email format.';
        }

        if (!phoneRegex.test(formData.phone)) {
            return 'Phone number must be between 10-15 digits.';
        }

        if (!passwordRegex.test(formData.password)) {
            return 'Enter a strong password';
        }

        if (formData.password !== formData.confirmPassword) {
            return 'Passwords do not match.';
        }

        if (!isVolunteer) {
            if (!formData.mission.trim()) {
                return 'Mission is required for organizations.';
            }
            if (!formData.location.trim()) {
                return 'Location is required for organizations.';
            }
        }

        return '';
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const validationError = validateInputs();
        if (validationError) {
            setError(validationError);
            return;
        }

        const payload = isVolunteer
            ? {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                location: formData.location,
                skills: formData.skills.split(',').map((skill) => skill.trim()),
                password: formData.password,
                role: 'volunteer',
            }
            : {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                mission: formData.mission,
                location: formData.location,
                website: formData.website,
                password: formData.password,
                role: 'organization',
            };

        try {
            const response = await axios.post(`https://helplink.onrender.com/api/${payload.role}/register`, payload);
            // setSuccess('Registration successful! Please login.');

            if (response.status === 201) {
                setSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

                <div className="flex justify-center mb-6">
                    <button
                        onClick={toggleForm}
                        disabled={isVolunteer}
                        className={`px-4 py-2 mr-2 text-white rounded-lg ${isVolunteer ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        Volunteer
                    </button>
                    <button
                        onClick={toggleForm}
                        disabled={!isVolunteer}
                        className={`px-4 py-2 text-white rounded-lg ${!isVolunteer ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        Organization
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {isVolunteer ? (
                        <input
                            type="text"
                            name="skills"
                            placeholder="Skills (comma-separated)"
                            value={formData.skills}
                            onChange={handleChange}
                            className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <>
                            <input
                                type="text"
                                name="mission"
                                placeholder="Mission"
                                value={formData.mission}
                                onChange={handleChange}
                                required
                                className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="website"
                                placeholder="Website"
                                value={formData.website}
                                onChange={handleChange}
                                className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </>
                    )}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </form>

                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                {success && <p className="text-green-500 mt-4 text-center">{success}</p>}

                <div className="mt-6 text-center">
                    <p>
                        Already registered?{' '}
                        <Link className="text-blue-700 underline hover:text-blue-900" to="/login">
                            Login Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

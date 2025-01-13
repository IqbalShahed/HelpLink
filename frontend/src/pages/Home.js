import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';

const Home = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOpportunities = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/opportunities/allOpportunities');
                setOpportunities(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch opportunities.');
            }
        };

        fetchOpportunities();
    }, []);

    const handleDetailsClick = (opportunityId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            navigate(`/opportunity/${opportunityId}`);
        }
    };

    return (
        <div className="home-page p-8 bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <div className="hero-section bg-blue-500 text-white p-10 rounded-lg mb-8 text-center">
                <h2 className="text-3xl font-bold mb-2">Welcome to HelpLink!</h2>
                <p className="text-lg">Connecting volunteers with opportunities to make a difference.</p>
            </div>

            {/* Opportunities Section */}
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Explore Opportunities</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {opportunities.map((opportunity) => (
                    <Card
                        key={opportunity._id}
                        title={opportunity.title}
                        description={opportunity.description}
                        location={opportunity.location}
                        onClick={() => handleDetailsClick(opportunity._id)}
                    />
                ))}
            </div>

            {/* Call-to-Action Section */}
            {/* <div className="cta-section mt-8 text-center">
                <Link to='/opportunitySearch'>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg"
                    >
                        Explore More
                    </button>
                </Link>
            </div> */}
        </div>

    );
};

export default Home;

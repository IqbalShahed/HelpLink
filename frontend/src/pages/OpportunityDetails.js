import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OpportunityDetails = () => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };
    const { id } = useParams(); // Opportunity ID
    const [opportunity, setOpportunity] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOpportunityDetails = async () => {
            try {
                const response = await axios.get(`https://helplink.onrender.com/api/opportunities/${id}`);
                setOpportunity(response.data);
            } catch (err) {
                console.error(err.message);
                setError(`${err.message || "Failed to fetch opportunity details."}`);
            }
        };

        fetchOpportunityDetails();
    }, [id]);

    const handleApply = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        //  console.log('Making API call:', {
        //     url: 'https://helplink.onrender.com/api/applications',
        //     data: { id, message },
        //     headers: { Authorization: `Bearer ${token}` },
        // });

        try {
            const response = await axios.post(
                `https://helplink.onrender.com/api/applications`,
                { opportunityId: id, message },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 201) {
                setSuccess('Application submitted successfully!');
                setMessage('');
            }
        } catch (err) {
            // console.error(err.status);
            if (err.status === 400) {
                setError("You're already apllied.")
            } else {
                setError(`Failed to submit application.`);
            }

        }
    };

    if (!opportunity) {
        return <p>Loading...</p>;
    }

    return (
        <div className="opportunity-details bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto my-8">
            {/* Opportunity Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{opportunity.title}</h1>

            {/* Opportunity Description */}
            <p className="text-gray-700 text-lg mb-4">{opportunity.description}</p>

            {/* Opportunity Details */}
            <p className="text-gray-500 text-sm mb-2">
                <strong className="text-gray-800">Location:</strong> {opportunity.location}
            </p>
            <p className="text-gray-500 text-sm mb-2">
                <strong className="text-gray-800">Skills:</strong>{" "}
                {opportunity.requiredSkills && Array.isArray(opportunity.requiredSkills)
                    ? opportunity.requiredSkills.join(", ")
                    : "N/A"}
            </p>
            <p className="text-gray-500 text-sm mb-4">
                <strong className="text-gray-800">Cause:</strong> {opportunity.cause}
            </p>

            <p className="text-gray-500 text-sm mb-2">
                <strong className="text-gray-800">Schedule:</strong> {`${formatDate(opportunity.scheduleStart)} to ${formatDate(opportunity.scheduleEnd)}`}
            </p>

            {/* Application Section */}
            <div className="apply-section mt-6">
                {/* Text Area */}
                <textarea
                    placeholder="Write a message (optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Apply Button */}
                <button
                    onClick={handleApply}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                    Apply
                </button>

                {/* Error or Success Messages */}
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                {success && <p className="text-green-500 text-center mt-4">{success}</p>}
            </div>
        </div>
    );
};

export default OpportunityDetails;

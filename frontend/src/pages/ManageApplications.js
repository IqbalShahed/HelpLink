import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageApplications = () => {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/applications/manage",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setApplications(response.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch applications.");
            }
        };

        fetchApplications();
    }, []);

    const updateApplicationStatus = async (applicationId, newStatus) => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/applications/${applicationId}/status`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.status === 200) {
                setSuccess("Application status updated successfully.");
                setApplications((prevApplications) =>
                    prevApplications.map((app) =>
                        app._id === applicationId
                            ? { ...app, status: newStatus }
                            : app
                    )
                );
            }
        } catch (err) {
            console.error(err);
            setError("Failed to update application status.");
        }
    };

    return (
        <div className="manage-applications p-8 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-center">Manage Applications</h2>

            {/* Error and Success Messages */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && <p className="text-green-500 text-center mb-4">{success}</p>}

            {applications.length === 0 ? (
                <p className="text-center text-gray-500">No applications to manage.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="py-3 px-4 text-left">Volunteer Name</th>
                                <th className="py-3 px-4 text-left">Opportunity</th>
                                <th className="py-3 px-4 text-left">Message</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, index) => (
                                <tr
                                    key={app._id}
                                    className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                        }`}
                                >
                                    <td className="py-3 px-4">{app.volunteer.name}</td>
                                    <td className="py-3 px-4">{app.opportunity.title}</td>
                                    <td className="py-3 px-4">{app.message || 'No message'}</td>
                                    <td className="py-3 px-4 capitalize">{app.status}</td>
                                    <td className="py-3 px-4 space-x-2">
                                        {app.status === 'pending' ? (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        updateApplicationStatus(app._id, 'accepted')
                                                    }
                                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        updateApplicationStatus(app._id, 'rejected')
                                                    }
                                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            <span className="px-4 py-2 text-gray-600">
                                                {app.status}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageApplications;

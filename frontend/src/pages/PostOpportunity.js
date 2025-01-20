import React, { useState } from "react";
import axios from "axios";

const PostOpportunity = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        requiredSkills: "",
        location: "",
        scheduleStart: "",
        scheduleEnd: "",
        cause: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const skillsArray = formData.requiredSkills
                .split(",")
                .map((skill) => skill.trim())
                .filter((skill) => skill);

            const postData = {
                ...formData,
                requiredSkills: skillsArray,
            };

            const response = await axios.post(
                "http://localhost:5000/api/opportunities/postOpportunity",
                postData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.status === 201) {
                setMessage("Opportunity posted successfully!");
                setFormData({
                    title: "",
                    description: "",
                    location: "",
                    requiredSkills: "",
                    scheduleStart: "",
                    scheduleEnd: "",
                    cause: "",
                });
            }
        } catch (err) {
            console.error("Error posting opportunity:", err);
            setError(
                err.response?.data?.message || "Failed to post opportunity. Try again."
            );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="post-opportunity max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
                    Post an Opportunity
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter opportunity title"
                            required
                            className="border rounded py-2 px-3 w-full"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Provide a brief description"
                            required
                            className="border rounded py-2 px-3 w-full"
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-600">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g., Dhaka"
                            required
                            className="border rounded py-2 px-3 w-full"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="requiredSkills"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Required Skills (comma-separated)
                        </label>
                        <input
                            type="text"
                            id="requiredSkills"
                            name="requiredSkills"
                            value={formData.requiredSkills}
                            onChange={handleChange}
                            placeholder="e.g., teamwork, communication"
                            className="border rounded py-2 px-3 w-full"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="scheduleStart"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Schedule Start
                            </label>
                            <input
                                type="datetime-local"
                                id="scheduleStart"
                                name="scheduleStart"
                                value={formData.scheduleStart}
                                onChange={handleChange}
                                required
                                className="border rounded py-2 px-3 w-full"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="scheduleEnd"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Schedule End
                            </label>
                            <input
                                type="datetime-local"
                                id="scheduleEnd"
                                name="scheduleEnd"
                                value={formData.scheduleEnd}
                                onChange={handleChange}
                                required
                                className="border rounded py-2 px-3 w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="cause" className="block text-sm font-medium text-gray-600">
                            Cause
                        </label>
                        <input
                            type="text"
                            id="cause"
                            name="cause"
                            value={formData.cause}
                            onChange={handleChange}
                            placeholder="e.g., education, environment, health, others"
                            required
                            className="border rounded py-2 px-3 w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Post Opportunity
                    </button>
                </form>

                {message && (
                    <p className="mt-4 text-green-600 text-center font-semibold">{message}</p>
                )}
                {error && (
                    <p className="mt-4 text-red-600 text-center font-semibold">{error}</p>
                )}
            </div>
        </div>
    );
};

export default PostOpportunity;

import React, { useState } from "react";
import axios from "axios";
import "../styles/PostOpportunity.css";

const PostOpportunity = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        requiredSkills: "",
        location: "",
        schedule: "",
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
            // Convert skills string to an array
            const skillsArray = formData.requiredSkills
                .split(",")
                .map((skill) => skill.trim())
                .filter((skill) => skill); // Remove empty skills

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
                    schedule: "",
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
        <div className="post-opportunity">
            <h2>Post an Opportunity</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter opportunity title"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Provide a brief description"
                        required
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g., New York City"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="skills">Required Skills (comma-separated)</label>
                    <input
                        type="text"
                        id="requiredSkills"
                        name="requiredSkills"
                        value={formData.requiredSkills}
                        onChange={handleChange}
                        placeholder="e.g., teamwork, communication"
                    />
                </div>

                <div>
                    <label htmlFor="schedule">Schedule</label>
                    <input
                        type="datetime-local"
                        id="schedule"
                        name="schedule"
                        value={formData.schedule}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="cause">Cause</label>
                    <input
                        type="text"
                        id="cause"
                        name="cause"
                        value={formData.cause}
                        onChange={handleChange}
                        placeholder="e.g., education, environment"
                        required
                    />
                </div>

                <button type="submit">Post Opportunity</button>
            </form>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default PostOpportunity;

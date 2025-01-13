import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/OrganizationDashboard.css';
import Button from "../components/Button";
import { Link } from "react-router-dom";

const OrganizationDashboard = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch posted opportunities
        const opportunitiesResponse = await axios.get(
          "http://localhost:5000/api/opportunities/my-opportunities",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setOpportunities(opportunitiesResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="organization-dashboard">
      <h1 className="text-3xl font-bold">Organization Dashboard</h1>
      <Link to='/post-opportunity'><Button text="Create Opportunity" className="mb-6 mr-3" /></Link>
      <Link to='/manage-applications'><Button text="Manage Applications" className="mb-6 mr-3" /></Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Posted Opportunities Section */}
          <section>
            <h2 className="text-2xl">Posted Opportunities</h2>
            {opportunities.length === 0 ? (
              <p>No opportunities posted yet.</p>
            ) : (
              <div className="opportunities-list">
                {opportunities.map((opportunity) => (
                  <div key={opportunity._id} className="opportunity-card">
                    <h3 className="font-bold">{opportunity.title}</h3>
                    <p>{opportunity.description}</p>
                    <p>
                      <strong>Location:</strong> {opportunity.location}
                    </p>
                    <p>
                      <strong>Skills Required:</strong>{" "}
                      {opportunity.requiredSkills && Array.isArray(opportunity.requiredSkills) ? opportunity.requiredSkills.join(", ") : "N/A"}
                    </p>
                    <p>
                      <strong>Schedule:</strong> {opportunity.schedule}
                    </p>
                    <p>
                      <strong>Cause:</strong> {opportunity.cause}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default OrganizationDashboard;

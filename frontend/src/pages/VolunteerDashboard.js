import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/VolunteerDashboard.css';
import 'react-calendar/dist/Calendar.css';

const VolunteerDashboard = () => {
  const [appliedOpportunities, setAppliedOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch applied opportunities
        const opportunitiesResponse = await axios.get(
          "http://localhost:5000/api/applications/my-applications",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAppliedOpportunities(opportunitiesResponse.data);
        // console.log(opportunitiesResponse.data)
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


  return (
    <div className="volunteer-dashboard">
      <h1 className="text-3xl font-bold">Volunteer Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Applied Opportunities */}
          <section>
            <h2 className="text-2xl">Applied Opportunities</h2>
            {appliedOpportunities.length > 0 ? (
              appliedOpportunities.map((opportunity) => (
                <div key={opportunity._id} className="dashboard-card">
                  <h3 className="font-bold">{opportunity.opportunity.title}</h3>
                  <p><strong>Location:</strong> {opportunity.opportunity.location}</p>
                  <p><strong>Cause:</strong> {opportunity.opportunity.cause}</p>
                  <p><strong>Schedule:</strong> {opportunity.opportunity.schedule}</p>
                  <p><strong>Status:</strong> {opportunity.status}</p>
                </div>
              ))
            ) : (
              <p>You haven’t applied to any opportunities yet.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default VolunteerDashboard;

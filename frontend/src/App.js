import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import VolunteerDashboard from './pages/VolunteerDashboard';
import OrganizationDashboard from './pages/OrganizationDashboard';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';
import PostOpportunity from './pages/PostOpportunity';
import ManageApplications from './pages/ManageApplications';
import OpportunityDetails from './pages/OpportunityDetails';

const App = () => {
  return (
    <AuthProvider>
      <div className='flex flex-col min-h-screen'>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route
              path="/volunteer-dashboard"
              element={
                <PrivateRoute allowedRoles={['volunteer']}>
                  <VolunteerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/opportunity/:id"
              element={
                <PrivateRoute allowedRoles={['volunteer']}>
                  <OpportunityDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/organization-dashboard"
              element={
                <PrivateRoute allowedRoles={['organization']}>
                  <OrganizationDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/post-opportunity"
              element={
                <PrivateRoute allowedRoles={['organization']}>
                  <PostOpportunity />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage-applications"
              element={
                <PrivateRoute allowedRoles={['organization']}>
                  <ManageApplications />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;

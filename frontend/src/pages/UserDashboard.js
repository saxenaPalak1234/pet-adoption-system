import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './Dashboard.css';

const UserDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get('/applications/my-applications');
      setApplications(res.data.applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return '#27ae60';
      case 'rejected':
        return '#e74c3c';
      default:
        return '#f39c12';
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <h1>My Applications</h1>
        {applications.length === 0 ? (
          <div className="empty-state">
            <p>You haven't submitted any adoption applications yet.</p>
            <Link to="/pets" className="btn-primary">
              Browse Pets
            </Link>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map(app => (
              <div key={app._id} className="application-card">
                <div className="application-header">
                  <h3>
                    <Link to={`/pets/${app.pet._id}`}>
                      {app.pet.name}
                    </Link>
                  </h3>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(app.status) }}
                  >
                    {app.status}
                  </span>
                </div>
                <p className="pet-info">
                  {app.pet.species} {app.pet.breed && `• ${app.pet.breed}`}
                </p>
                {app.message && (
                  <p className="application-message">{app.message}</p>
                )}
                <p className="application-date">
                  Submitted: {new Date(app.createdAt).toLocaleDateString()}
                </p>
                {app.reviewedAt && (
                  <p className="review-date">
                    Reviewed: {new Date(app.reviewedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;


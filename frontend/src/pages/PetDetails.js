import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import './PetDetails.css';

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);

  useEffect(() => {
    fetchPet();
    if (user) {
      checkApplicationStatus();
    }
  }, [id, user]);

  const fetchPet = async () => {
    try {
      const res = await api.get(`/pets/${id}`);
      setPet(res.data.pet);
    } catch (error) {
      console.error('Error fetching pet:', error);
      toast.error('Failed to load pet details');
    } finally {
      setLoading(false);
    }
  };

  const checkApplicationStatus = async () => {
    try {
      const res = await api.get('/applications/my-applications');
      const application = res.data.applications.find(app => app.pet._id === id);
      if (application) {
        setApplicationStatus(application.status);
      }
    } catch (error) {
      console.error('Error checking application status:', error);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/applications', {
        petId: id,
        message
      });
      toast.success('Application submitted successfully!');
      setShowForm(false);
      setMessage('');
      await checkApplicationStatus();
      setTimeout(() => {
        navigate('/pets');
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!pet) {
    return <div className="error">Pet not found</div>;
  }

  return (
    <div className="pet-details">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>

        <div className="pet-details-content">
          <div className="pet-image-section">
            {pet.image ? (
              <img src={pet.image} alt={pet.name} />
            ) : (
              <div className="placeholder-image-large">
                {pet.species}
              </div>
            )}
          </div>

          <div className="pet-info-section">
            <h1>{pet.name}</h1>
            <div className="pet-meta">
              <span className="badge">{pet.species}</span>
              {pet.breed && <span className="badge">{pet.breed}</span>}
              <span className={`status-badge status-${pet.status}`}>
                {pet.status}
              </span>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <strong>Age:</strong> {pet.age} years
              </div>
              <div className="info-item">
                <strong>Gender:</strong> {pet.gender || 'Unknown'}
              </div>
              <div className="info-item">
                <strong>Size:</strong> {pet.size}
              </div>
              {pet.location && (
                <div className="info-item">
                  <strong>Location:</strong> {pet.location}
                </div>
              )}
            </div>

            {pet.description && (
              <div className="description">
                <h3>Description</h3>
                <p>{pet.description}</p>
              </div>
            )}

            {pet.status === 'available' && user && !showForm && !applicationStatus && (
              <button
                onClick={() => setShowForm(true)}
                className="btn-apply"
              >
                Apply to Adopt
              </button>
            )}

            {pet.status === 'available' && user && applicationStatus && (
              <div className="application-status-info">
                <div className={`status-message status-${applicationStatus}`}>
                  {applicationStatus === 'pending' && (
                    <>
                      <span className="status-icon">⏳</span>
                      <div>
                        <strong>Application Submitted</strong>
                        <p>Your application is being reviewed. We'll notify you soon!</p>
                      </div>
                    </>
                  )}
                  {applicationStatus === 'approved' && (
                    <>
                      <span className="status-icon">✅</span>
                      <div>
                        <strong>Application Approved!</strong>
                        <p>Congratulations! Your application has been approved.</p>
                      </div>
                    </>
                  )}
                  {applicationStatus === 'rejected' && (
                    <>
                      <span className="status-icon">❌</span>
                      <div>
                        <strong>Application Not Approved</strong>
                        <p>Unfortunately, your application was not approved for this pet.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {pet.status === 'available' && !user && (
              <button
                onClick={() => navigate('/login')}
                className="btn-apply"
              >
                Login to Apply
              </button>
            )}

            {showForm && (
              <form onSubmit={handleApply} className="application-form">
                <h3>Adoption Application</h3>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us why you'd like to adopt this pet..."
                  rows="4"
                  required
                />
                <div className="form-actions">
                  <button type="submit" disabled={submitting} className="btn-submit">
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setMessage('');
                    }}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;


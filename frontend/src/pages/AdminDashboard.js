import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import './Dashboard.css';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPetForm, setShowPetForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [petForm, setPetForm] = useState({
    name: '',
    species: 'Dog',
    breed: '',
    age: '',
    gender: 'Unknown',
    size: 'Medium',
    description: '',
    location: '',
    image: ''
  });

  useEffect(() => {
    if (activeTab === 'applications') {
      fetchApplications();
    } else {
      fetchPets();
    }
  }, [activeTab]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await api.get('/applications');
      setApplications(res.data.applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPets = async () => {
    setLoading(true);
    try {
      const res = await api.get('/pets?limit=100');
      setPets(res.data.pets);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationStatus = async (id, status) => {
    try {
      await api.put(`/applications/${id}/status`, { status });
      toast.success(`Application ${status} successfully!`);
      fetchApplications();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handlePetSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPet) {
        await api.put(`/pets/${editingPet._id}`, petForm);
        toast.success('Pet updated successfully!');
      } else {
        await api.post('/pets', petForm);
        toast.success('Pet added successfully!');
      }
      setShowPetForm(false);
      setEditingPet(null);
      resetForm();
      fetchPets();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save pet');
    }
  };

  const handleEditPet = (pet) => {
    setEditingPet(pet);
    setPetForm({
      name: pet.name,
      species: pet.species,
      breed: pet.breed || '',
      age: pet.age,
      gender: pet.gender || 'Unknown',
      size: pet.size,
      description: pet.description || '',
      location: pet.location || '',
      image: pet.image || ''
    });
    setShowPetForm(true);
  };

  const handleDeletePet = async (id) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        await api.delete(`/pets/${id}`);
        toast.success('Pet deleted successfully!');
        fetchPets();
      } catch (error) {
        toast.error('Failed to delete pet');
      }
    }
  };

  const resetForm = () => {
    setPetForm({
      name: '',
      species: 'Dog',
      breed: '',
      age: '',
      gender: 'Unknown',
      size: 'Medium',
      description: '',
      location: '',
      image: ''
    });
  };

  if (loading && applications.length === 0 && pets.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>

        <div className="admin-tabs">
          <button
            className={activeTab === 'applications' ? 'active' : ''}
            onClick={() => setActiveTab('applications')}
          >
            Applications
          </button>
          <button
            className={activeTab === 'pets' ? 'active' : ''}
            onClick={() => setActiveTab('pets')}
          >
            Manage Pets
          </button>
        </div>

        {activeTab === 'applications' && (
          <div className="applications-list">
            {applications.length === 0 ? (
              <p>No applications</p>
            ) : (
              applications.map(app => (
                <div key={app._id} className="application-card admin">
                  <div className="application-header">
                    <div>
                      <h3>
                        <Link to={`/pets/${app.pet._id}`}>
                          {app.pet.name}
                        </Link>
                      </h3>
                      <p className="user-info">Applicant: {app.user.name} ({app.user.email})</p>
                    </div>
                    <span className={`status-badge status-${app.status}`}>
                      {app.status}
                    </span>
                  </div>
                  {app.message && (
                    <p className="application-message">{app.message}</p>
                  )}
                  <p className="application-date">
                    Submitted: {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                  {app.status === 'pending' && (
                    <div className="application-actions">
                      <button
                        onClick={() => handleApplicationStatus(app._id, 'approved')}
                        className="btn-approve"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleApplicationStatus(app._id, 'rejected')}
                        className="btn-reject"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'pets' && (
          <div>
            <div className="admin-header">
              <h2>Pets</h2>
              <button
                onClick={() => {
                  setShowPetForm(true);
                  setEditingPet(null);
                  resetForm();
                }}
                className="btn-primary"
              >
                Add New Pet
              </button>
            </div>

            {showPetForm && (
              <form onSubmit={handlePetSubmit} className="pet-form">
                <h3>{editingPet ? 'Edit Pet' : 'Add New Pet'}</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name *</label>
                    <input
                      type="text"
                      value={petForm.name}
                      onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Species *</label>
                    <select
                      value={petForm.species}
                      onChange={(e) => setPetForm({ ...petForm, species: e.target.value })}
                      required
                    >
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Bird">Bird</option>
                      <option value="Rabbit">Rabbit</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Breed</label>
                    <input
                      type="text"
                      value={petForm.breed}
                      onChange={(e) => setPetForm({ ...petForm, breed: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Age *</label>
                    <input
                      type="number"
                      value={petForm.age}
                      onChange={(e) => setPetForm({ ...petForm, age: e.target.value })}
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      value={petForm.gender}
                      onChange={(e) => setPetForm({ ...petForm, gender: e.target.value })}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Size *</label>
                    <select
                      value={petForm.size}
                      onChange={(e) => setPetForm({ ...petForm, size: e.target.value })}
                      required
                    >
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={petForm.description}
                    onChange={(e) => setPetForm({ ...petForm, description: e.target.value })}
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={petForm.location}
                    onChange={(e) => setPetForm({ ...petForm, location: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    value={petForm.image}
                    onChange={(e) => setPetForm({ ...petForm, image: e.target.value })}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {editingPet ? 'Update Pet' : 'Add Pet'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPetForm(false);
                      setEditingPet(null);
                      resetForm();
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="pets-list">
              {pets.map(pet => (
                <div key={pet._id} className="pet-admin-card">
                  <div className="pet-admin-info">
                    <h3>
                      <Link to={`/pets/${pet._id}`}>{pet.name}</Link>
                    </h3>
                    <p>{pet.species} {pet.breed && `• ${pet.breed}`}</p>
                    <p>{pet.age} years old • {pet.size}</p>
                    <span className={`status-badge status-${pet.status}`}>
                      {pet.status}
                    </span>
                  </div>
                  <div className="pet-admin-actions">
                    <button
                      onClick={() => handleEditPet(pet)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePet(pet._id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


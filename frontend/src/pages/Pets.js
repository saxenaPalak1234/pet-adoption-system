import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './Pets.css';

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    species: '',
    status: '',
    size: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1
  });

  useEffect(() => {
    fetchPets();
  }, [filters, pagination.page]);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: 12,
        ...filters
      };
      const res = await api.get('/pets', { params });
      setPets(res.data.pets);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  if (loading && pets.length === 0) {
    return <div className="loading">Loading pets...</div>;
  }

  return (
    <div className="pets-page">
      <div className="container">
        <h1>Browse Pets</h1>

        <div className="filters">
          <input
            type="text"
            name="search"
            placeholder="Search by name, breed..."
            value={filters.search}
            onChange={handleFilterChange}
            className="search-input"
          />

          <select
            name="species"
            value={filters.species}
            onChange={handleFilterChange}
          >
            <option value="">All Species</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Other">Other</option>
          </select>

          <select
            name="size"
            value={filters.size}
            onChange={handleFilterChange}
          >
            <option value="">All Sizes</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="adopted">Adopted</option>
          </select>
        </div>

        <div className="pets-grid">
          {pets.map(pet => (
            <Link key={pet._id} to={`/pets/${pet._id}`} className="pet-card">
              <div className="pet-image">
                {pet.image ? (
                  <img src={pet.image} alt={pet.name} />
                ) : (
                  <div className="placeholder-image">
                    {pet.species}
                  </div>
                )}
              </div>
              <div className="pet-info">
                <h3>{pet.name}</h3>
                <p>{pet.species} {pet.breed && `• ${pet.breed}`}</p>
                <p className="pet-meta">{pet.age} years old • {pet.size}</p>
                <span className={`status-badge status-${pet.status}`}>
                  {pet.status}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {pets.length === 0 && !loading && (
          <div className="no-results">No pets found</div>
        )}

        {pagination.pages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
            >
              Previous
            </button>
            <span>Page {pagination.page} of {pagination.pages}</span>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.pages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pets;


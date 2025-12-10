import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>Find Your Perfect Companion</h1>
          <p>Browse our collection of pets waiting for a loving home</p>
          <Link to="/pets" className="btn-primary">
            Browse Pets
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;


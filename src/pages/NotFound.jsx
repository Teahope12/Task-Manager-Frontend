import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="auth-container">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <h2>404</h2>
        <p>Page not found</p>
        <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
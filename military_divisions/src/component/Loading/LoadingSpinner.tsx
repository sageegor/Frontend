import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner-container">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Загрузка...</span>
      </Spinner>
      <p className="loading-text">Загрузка данных...</p>
    </div>
  );
};

export default LoadingSpinner;
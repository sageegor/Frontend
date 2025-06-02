import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-4 home-container">
      <div className="home-hero">
        <h1>Военные силы Российской Федерации</h1>
        <p>
          Информационная система для работы с военными подразделениями Российской Федерации.
          Просматривайте информацию о подразделениях, их составе и характеристиках.
        </p>
        <p>
          <Button 
            variant="primary" 
            onClick={() => navigate('/divisions')}
            size="lg"
            className="home-button"
          >
            Перейти к списку подразделений
          </Button>
        </p>
      </div>

      <div className="row mt-4 districts-container">
        <div className="col-md-4 mb-4 district-card">
          <h3>Ленинградский военный округ</h3>
          <p>Один из старейших военных округов России с богатой историей.</p>
        </div>
        <div className="col-md-4 mb-4 district-card">
          <h3>Московский военный округ</h3>
          <p>Центральный военный округ, обеспечивающий безопасность столицы.</p>
        </div>
        <div className="col-md-4 mb-4 district-card">
          <h3>Южный военный округ</h3>
          <p>Округ, отвечающий за безопасность южных границ России.</p>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
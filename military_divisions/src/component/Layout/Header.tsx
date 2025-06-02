import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import emblemRF1 from '../../assets/emblem_RF1.png';
import mapMD from '../../assets/map_MD.png';
import blackBox from '../../assets/black_box.png';
import orangeBox from '../../assets/orange_box.png';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <Container>
        <Row className="align-items-center">
          <Col xs={2}>
            <div className="emblem-container">
              <img src={emblemRF1} alt="Герб РФ" className="emblem-img" />
            </div>
          </Col>
          <Col xs={4} className="text-center">
            <h1 className="vsrf-title">Военные силы<br />Российской Федерации</h1>
          </Col>
          <Col xs={4} className="text-center">
            <div className="map-container">
              <img src={mapMD} alt="Карта военных округов" className="map-img" />
            </div>
          </Col>
          <Col xs={2}>
            <div className="boxes-container">
              <img src={blackBox} alt="" className="box-img" />
              <img src={orangeBox} alt="" className="box-img" />
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
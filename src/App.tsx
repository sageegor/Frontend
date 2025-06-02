import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './component/Layout/Navbar';
import Footer from './component/Layout/Footer';
import HomePage from './pages/HomePage';
import DivisionsPage from './pages/DivisionsPage';
import DivisionDetailPage from './pages/DivisionDetailPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        
        <Container className="flex-grow-1 mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/divisions" element={<DivisionsPage />} />
            <Route path="/divisions/:id" element={<DivisionDetailPage />} />
          </Routes>
        </Container>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
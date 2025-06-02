import React from 'react';
import { Container } from 'react-bootstrap';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <Container className="text-center">
        <p className="mb-0">
          © {currentYear} Военные силы Российской Федерации. Все права защищены.
        </p>
        <p className="mb-0 small text-muted">
          Информационная система для работы с военными подразделениями
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
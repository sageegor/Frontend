import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

interface FiltersProps {
  onFilterChange: (filters: {
    search?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
  initialValues: {
    search: string;
    startDate: string;
    endDate: string;
  };
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, initialValues }) => {
  const [search, setSearch] = useState(initialValues.search);
  const [startDate, setStartDate] = useState(initialValues.startDate);
  const [endDate, setEndDate] = useState(initialValues.endDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ search, startDate, endDate });
  };

  const handleReset = () => {
    setSearch('');
    setStartDate('');
    setEndDate('');
    onFilterChange({ search: '', startDate: '', endDate: '' });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row>
        <Col md={4}>
          <Form.Group controlId="search">
            <Form.Label>Поиск</Form.Label>
            <Form.Control
              type="text"
              placeholder="Поиск по названию"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="startDate">
            <Form.Label>Дата создания от</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="endDate">
            <Form.Label>Дата создания до</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2} className="d-flex align-items-end">
          <Button variant="primary" type="submit" className="me-2">
            Применить
          </Button>
          <Button variant="outline-secondary" onClick={handleReset}>
            Сбросить
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;
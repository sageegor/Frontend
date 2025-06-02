import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DivisionsPage.css';

interface Division {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
}

const DivisionsPage = () => {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [filteredDivisions, setFilteredDivisions] = useState<Division[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/divisions/');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setDivisions(data);
        setFilteredDivisions(data);
      } catch (err) {
        setError('Ошибка загрузки данных');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDivisions();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredDivisions(divisions);
    } else {
      const filtered = divisions.filter(division =>
        division.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        division.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDivisions(filtered);
    }
  }, [searchQuery, divisions]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;
  if (divisions.length === 0) return <div>Нет доступных подразделений</div>;

  return (
    <div className="divisions-container">
      {/* Поисковая строка */}
      <div className="search_container">
        <input
          className="search_input"
          type="text"
          placeholder="Поиск объединений, соединений и частей"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search_bottom">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      {/* Список подразделений */}
      <div className="divisions-grid">
        {filteredDivisions.map(division => (
          <div key={division.id} className="division-card">
            <div className="card-image">
              <img 
                src={division.image_url || '/default-image.jpg'} 
                alt={division.name}
                onError={(e) => {
                  e.currentTarget.src = '/default-image.jpg';
                }}
              />
            </div>
            <div className="card-body">
              <h3>{division.name}</h3>
              <Link to={`/divisions/${division.id}`} className="details-link">
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DivisionsPage;
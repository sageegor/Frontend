import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../api/store';
import { setSearchQuery, setMilitaryDistrict, setSortBy } from '../features/filters/filtersSlice';
import './DivisionsPage.css';

interface Division {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
  district: string;
}

const DivisionsPage = () => {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [filteredDivisions, setFilteredDivisions] = useState<Division[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { searchQuery, militaryDistrict, sortBy } = useSelector((state: RootState) => state.divisionsFilter);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/divisions/');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setDivisions(data);
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
    let result = [...divisions];
    
    // Фильтрация по поисковому запросу
    if (searchQuery.trim() !== '') {
      result = result.filter(division =>
        division.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        division.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Фильтрация по военному округу
    if (militaryDistrict !== 'all') {
      result = result.filter(division => division.district === militaryDistrict);
    }
    
    // Сортировка
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a.id - b.id;
      }
    });
    
    setFilteredDivisions(result);
  }, [divisions, searchQuery, militaryDistrict, sortBy]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setMilitaryDistrict(e.target.value));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value as 'name' | 'id'));
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;
  if (divisions.length === 0) return <div>Нет доступных подразделений</div>;

  return (
    <div className="divisions-container">
      <div className="filters-container">
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

        <div className="additional-filters">
          <select 
            value={militaryDistrict}
            onChange={handleDistrictChange}
            className="filter-select"
          >
            <option value="all">Все округа</option>
            <option value="leningrad">Ленинградский</option>
            <option value="moscow">Московский</option>
            <option value="southern">Южный</option>
          </select>

          <select 
            value={sortBy}
            onChange={handleSortChange}
            className="filter-select"
          >
            <option value="name">По названию</option>
            <option value="id">По порядку</option>
          </select>
        </div>
      </div>

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
              <p className="district-badge">{division.district}</p>
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
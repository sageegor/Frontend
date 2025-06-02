import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DivisionDetailPage.css';

interface Division {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
}

const DivisionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [division, setDivision] = useState<Division | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError("ID подразделения не указан");
      setLoading(false);
      return;
    }

    const loadDivision = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/divisions/${id}/`);
        
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        setDivision(data);
      } catch (err) {
        setError("Не удалось загрузить данные");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDivision();
  }, [id]);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!division) return <div>Подразделение не найдено</div>;

  return (
    <div className="division-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Назад
      </button>
      
      <h1>{division.name}</h1>
      
      <div className="division-content">
        <img 
          src={division.image_url || '/default-division.jpg'} 
          alt={division.name}
          onError={(e) => {
            e.currentTarget.src = '/default-division.jpg';
          }}
        />
        <div className="division-info">
          <p>{division.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DivisionDetailPage;
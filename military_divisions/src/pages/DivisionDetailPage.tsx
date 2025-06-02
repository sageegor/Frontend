import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DivisionDetailPage.css';

interface Division {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
  district: string;
  history: string;
  composition: string;
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
    <div className="division-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Назад к списку
      </button>
      
      <div className="division-header">
        <h1>{division.name}</h1>
        <span className="district-badge">{division.district}</span>
      </div>
      
      <div className="division-content">
        <div className="division-image">
          <img 
            src={division.image_url || '/default-division.jpg'} 
            onError={(e) => {
              e.currentTarget.src = '/default-division.jpg';
            }}
          />
        </div>
        
        <div className="division-info">
          <section className="info-section">
            <h3>История</h3>
            <p>{division.description}</p>
          </section>                    
        </div>
      </div>
    </div>
  );
};

export default DivisionDetailPage;
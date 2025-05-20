import React from 'react';
import '../styles/components.css';

// Импортируем фотографии (убедитесь, что файлы существуют в указанных путях)
import annaPhoto from '../images/anna.png';
import igorPhoto from '../images/kristian.png';

// Объект с фотографиями для удобного доступа
const masterPhotos = {
  'Анна Иванова': annaPhoto,
  'Игорь Петров': igorPhoto
};

const MasterCard = ({ master }) => {
  return (
    <div className="master-card">
      <img 
        src={masterPhotos[master.name] || master.photo} 
        alt={master.name} 
        className="master-photo"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/default-avatar.jpg'; // Фолбек фото
        }}
      />
      <h3>{master.name}</h3>
      <p className="specialization">{master.specialization}</p>
      <p className="experience">Опыт: {master.experience} лет</p>
      <div className="rating">
        <span className="stars">{"★".repeat(Math.floor(master.rating))}</span>
        <span> {master.rating}/5</span>
      </div>
    </div>
  );
};

export default MasterCard;
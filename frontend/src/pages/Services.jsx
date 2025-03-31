import { useState } from 'react';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
  const [services] = useState([
    { id: 1, name: 'Мужская стрижка', description: 'Стрижка с учетом особенностей волос и формы головы', price: 1200, duration: 45, category: 'Мужские' },
    { id: 2, name: 'Женская стрижка', description: 'Стрижка с укладкой и консультацией стилиста', price: 1800, duration: 60, category: 'Женские' },
    { id: 3, name: 'Детская стрижка', description: 'Стрижка для детей в игровой форме', price: 1000, duration: 30, category: 'Детские' },
    { id: 4, name: 'Окрашивание', description: 'Профессиональное окрашивание волос', price: 2500, duration: 90, category: 'Женские' },
    { id: 5, name: 'Укладка', description: 'Создание праздничной или повседневной укладки', price: 800, duration: 30, category: 'Женские' },
    { id: 6, name: 'Бритье', description: 'Классическое бритье опасной бритвой', price: 1500, duration: 45, category: 'Мужские' },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', ...new Set(services.map(service => service.category))];

  const filteredServices = selectedCategory === 'Все' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="services-page">
      <div className="container">
        <h1>Наши услуги</h1>
        
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="services-grid">
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
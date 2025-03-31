import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import MasterCard from '../components/MasterCard';
import Review from '../components/Review';

const Home = () => {
  // Пример данных (в реальном приложении будут запросы к API)
  const featuredServices = [
    { id: 1, name: 'Мужская стрижка', description: 'Стрижка с учетом особенностей волос и формы головы', price: 1200, duration: 45 },
    { id: 2, name: 'Женская стрижка', description: 'Стрижка с укладкой и консультацией стилиста', price: 1800, duration: 60 },
  ];

  const popularMasters = [
    { id: 1, name: 'Анна Иванова', photo: '/images/master1.jpg', specialization: 'Женские стрижки', experience: 8, rating: 4.9 },
    { id: 2, name: 'Игорь Петров', photo: '/images/master2.jpg', specialization: 'Мужские стрижки', experience: 10, rating: 4.8 },
  ];

  const latestReviews = [
    { id: 1, author: 'Марина', rating: 5, text: 'Отличный сервис, мастер Анна - профессионал!', date: '15.05.2023' },
    { id: 2, author: 'Алексей', rating: 4, text: 'Хорошая стрижка, приятная атмосфера.', date: '10.05.2023' },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <h1>Парикмахерская "Престиж"</h1>
          <p>Профессиональный уход за вашими волосами</p>
          <Link to="/booking" className="cta-button">Записаться онлайн</Link>
        </div>
      </section>

      <section className="featured-services">
      <div className="container">
    <h2>Популярные услуги</h2>
    <div className="services-grid">
      {featuredServices.map((service, index) => (
        <ServiceCard 
          key={service.id} 
          service={service}
          className={index % 2 === 0 ? 'odd-card' : 'even-card'}
        />
      ))}
    </div>
    <Link to="/services" className="see-all">Все услуги →</Link>
  </div>
      </section>

      <section className="our-masters">
        <div className="container">
          <h2>Наши мастера</h2>
          <div className="masters-grid">
            {popularMasters.map(master => (
              <MasterCard key={master.id} master={master} />
            ))}
          </div>
        </div>
      </section>

      <section className="reviews-section">
        <div className="container">
          <h2>Отзывы клиентов</h2>
          <div className="reviews-list">
            {latestReviews.map(review => (
              <Review key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
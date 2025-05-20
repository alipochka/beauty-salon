import { useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import MasterCard from '../components/MasterCard';
import Review from '../components/Review';
import '../styles/components.css';

const Home = () => {
  // Пример данных
  const featuredServices = [
    { id: 1, name: 'Мужская стрижка', description: 'Стрижка с учетом особенностей волос и формы головы', price: 1200, duration: 45 },
    { id: 2, name: 'Женская стрижка', description: 'Стрижка с укладкой и консультацией стилиста', price: 1800, duration: 60 },
  ];

  const popularMasters = [
    { id: 1, name: 'Анна Иванова', photo: 'images/anna.png', specialization: 'Женские стрижки', experience: 8, rating: 4.9 },
    { id: 2, name: 'Игорь Петров', photo: 'images/igor.png', specialization: 'Мужские стрижки', experience: 10, rating: 4.8 },
  ];

  const latestReviews = [
    { id: 1, author: 'Марина', rating: 5, text: 'Отличный сервис, мастер Анна - профессионал!', date: '15.05.2023' },
    { id: 2, author: 'Алексей', rating: 4, text: 'Хорошая стрижка, приятная атмосфера.', date: '10.05.2023' },
  ];

  // Состояние для окна отзывов
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [reviews, setReviews] = useState(latestReviews);
  const [newReview, setNewReview] = useState({ author: '', text: '', rating: 5 });

  const toggleReviewsPopup = () => setIsReviewsOpen(!isReviewsOpen);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = {
      id: Date.now(),
      ...newReview,
      date: new Date().toLocaleDateString()
    };
    setReviews([...reviews, review]);
    setNewReview({ author: '', text: '', rating: 5 });
  };

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
          <div className="reviews-preview">
            {latestReviews.slice(0, 2).map(review => (
              <Review key={review.id} review={review} />
            ))}
          </div>
          <button onClick={toggleReviewsPopup} className="reviews-button">
            Показать все отзывы ({reviews.length})
          </button>
        </div>
      </section>

      {/* Модальное окно отзывов */}
      {isReviewsOpen && (
        <div className="reviews-popup">
          <div className="popup-content">
            <button className="close-button" onClick={toggleReviewsPopup}>×</button>
            <h3>Отзывы наших клиентов</h3>
            
            <div className="reviews-list">
              {reviews.map(review => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <span className="review-author">{review.author}</span>
                    <span className="review-date">{review.date}</span>
                    <div className="review-rating">
                      {Array(5).fill().map((_, i) => (
                        <span key={i} className={i < review.rating ? 'star filled' : 'star'}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="review-text">{review.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleReviewSubmit} className="review-form">
              <h4>Оставить отзыв</h4>
              <input
                type="text"
                placeholder="Ваше имя"
                value={newReview.author}
                onChange={(e) => setNewReview({...newReview, author: e.target.value})}
                required
              />
              <textarea
                placeholder="Ваш отзыв"
                value={newReview.text}
                onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                required
              />
              <div className="rating-select">
                <span>Оценка:</span>
                {[1, 2, 3, 4, 5].map(num => (
                  <label key={num}>
                    <input
                      type="radio"
                      name="rating"
                      value={num}
                      checked={newReview.rating === num}
                      onChange={() => setNewReview({...newReview, rating: num})}
                    />
                    {num}
                  </label>
                ))}
              </div>
              <button type="submit">Отправить</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
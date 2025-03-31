import { useState } from 'react';
import '../styles/components.css';
const Account = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [user] = useState({
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (123) 456-78-90',
    registrationDate: '15.01.2022'
  });

  const [bookings] = useState([
    { id: 1, date: '20.05.2023', time: '15:00', service: 'Мужская стрижка', master: 'Игорь Петров', status: 'Подтверждена' },
    { id: 2, date: '10.05.2023', time: '12:00', service: 'Бритье', master: 'Дмитрий Кузнецов', status: 'Завершена' },
  ]);

  const [reviews] = useState([
    { id: 1, date: '11.05.2023', master: 'Дмитрий Кузнецов', rating: 5, text: 'Отличное бритье, очень доволен!' },
  ]);

  return (
    <div className="account-page">
      <div className="container">
        <h1>Личный кабинет</h1>
        
        <div className="account-header">
          <div className="user-info">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Телефон: {user.phone}</p>
            <p>Клиент с {user.registrationDate}</p>
          </div>
        </div>
        
        <div className="account-tabs">
          <button 
            className={activeTab === 'bookings' ? 'active' : ''}
            onClick={() => setActiveTab('bookings')}
          >
            Мои записи
          </button>
          <button 
            className={activeTab === 'reviews' ? 'active' : ''}
            onClick={() => setActiveTab('reviews')}
          >
            Мои отзывы
          </button>
          <button 
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            Настройки
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'bookings' && (
            <div className="bookings-list">
              <h2>Предстоящие записи</h2>
              {bookings.filter(b => b.status !== 'Завершена').length > 0 ? (
                bookings.filter(b => b.status !== 'Завершена').map(booking => (
                  <div key={booking.id} className="booking-item">
                    <div className="booking-details">
                      <h3>{booking.service}</h3>
                      <p>Мастер: {booking.master}</p>
                      <p>Дата: {booking.date} в {booking.time}</p>
                      <p>Статус: {booking.status}</p>
                    </div>
                    <button className="cancel-btn">Отменить запись</button>
                  </div>
                ))
              ) : (
                <p>У вас нет предстоящих записей</p>
              )}
              
              <h2>История записей</h2>
              {bookings.filter(b => b.status === 'Завершена').length > 0 ? (
                bookings.filter(b => b.status === 'Завершена').map(booking => (
                  <div key={booking.id} className="booking-item past">
                    <div className="booking-details">
                      <h3>{booking.service}</h3>
                      <p>Мастер: {booking.master}</p>
                      <p>Дата: {booking.date} в {booking.time}</p>
                    </div>
                    <button className="review-btn">Оставить отзыв</button>
                  </div>
                ))
              ) : (
                <p>У вас нет завершенных записей</p>
              )}
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="reviews-list">
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <h3>Мастер: {review.master}</h3>
                    <p>Дата: {review.date}</p>
                    <p>Оценка: {review.rating}/5</p>
                    <p>{review.text}</p>
                  </div>
                ))
              ) : (
                <p>Вы еще не оставляли отзывы</p>
              )}
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="settings-form">
              <h2>Настройки профиля</h2>
              <form>
                <div className="form-group">
                  <label>Имя:</label>
                  <input type="text" defaultValue={user.name} />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" defaultValue={user.email} />
                </div>
                <div className="form-group">
                  <label>Телефон:</label>
                  <input type="tel" defaultValue={user.phone} />
                </div>
                <div className="form-group">
                  <label>Новый пароль:</label>
                  <input type="password" placeholder="Введите новый пароль" />
                </div>
                <div className="form-group">
                  <label>Подтвердите пароль:</label>
                  <input type="password" placeholder="Повторите новый пароль" />
                </div>
                <button type="submit" className="save-btn">Сохранить изменения</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
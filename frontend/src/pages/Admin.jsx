import { useState } from 'react';
import '../styles/components.css';
const Admin = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // Пример данных для админки
  const [bookings] = useState([
    { id: 1, client: 'Иван Иванов', phone: '+7 (123) 456-78-90', date: '20.05.2023', time: '15:00', service: 'Мужская стрижка', master: 'Игорь Петров', status: 'Подтверждена' },
    { id: 2, client: 'Петр Петров', phone: '+7 (987) 654-32-10', date: '20.05.2023', time: '16:00', service: 'Бритье', master: 'Дмитрий Кузнецов', status: 'Новая' },
  ]);

  const [masters] = useState([
    { id: 1, name: 'Анна Иванова', specialization: 'Женские стрижки', schedule: 'Пн-Пт 10-19' },
    { id: 2, name: 'Игорь Петров', specialization: 'Мужские стрижки', schedule: 'Вт-Сб 9-18' },
  ]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // В реальном приложении здесь будет проверка логина/пароля
    if (loginData.username === 'admin' && loginData.password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Неверные учетные данные');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="container">
          <h1>Панель администратора</h1>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Логин:</label>
              <input 
                type="text" 
                name="username" 
                value={loginData.username} 
                onChange={handleLoginChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Пароль:</label>
              <input 
                type="password" 
                name="password" 
                value={loginData.password} 
                onChange={handleLoginChange} 
                required 
              />
            </div>
            <button type="submit" className="login-btn">Войти</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Панель администратора</h1>
          <button onClick={() => setIsLoggedIn(false)} className="logout-btn">Выйти</button>
        </div>
        
        <div className="admin-tabs">
          <button 
            className={activeTab === 'bookings' ? 'active' : ''}
            onClick={() => setActiveTab('bookings')}
          >
            Записи
          </button>
          <button 
            className={activeTab === 'masters' ? 'active' : ''}
            onClick={() => setActiveTab('masters')}
          >
            Мастера
          </button>
          <button 
            className={activeTab === 'services' ? 'active' : ''}
            onClick={() => setActiveTab('services')}
          >
            Услуги
          </button>
          <button 
            className={activeTab === 'schedule' ? 'active' : ''}
            onClick={() => setActiveTab('schedule')}
          >
            График
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'bookings' && (
            <div className="bookings-list">
              <h2>Управление записями</h2>
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Клиент</th>
                    <th>Телефон</th>
                    <th>Дата</th>
                    <th>Время</th>
                    <th>Услуга</th>
                    <th>Мастер</th>
                    <th>Статус</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.client}</td>
                      <td>{booking.phone}</td>
                      <td>{booking.date}</td>
                      <td>{booking.time}</td>
                      <td>{booking.service}</td>
                      <td>{booking.master}</td>
                      <td>{booking.status}</td>
                      <td>
                        <button className="edit-btn">Изменить</button>
                        <button className="cancel-btn">Отменить</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'masters' && (
            <div className="masters-management">
              <h2>Управление мастерами</h2>
              <button className="add-btn">Добавить мастера</button>
              <table className="masters-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Специализация</th>
                    <th>График</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {masters.map(master => (
                    <tr key={master.id}>
                      <td>{master.id}</td>
                      <td>{master.name}</td>
                      <td>{master.specialization}</td>
                      <td>{master.schedule}</td>
                      <td>
                        <button className="edit-btn">Редактировать</button>
                        <button className="delete-btn">Удалить</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
         {activeTab === 'services' && (
    <div className="table-container">
      <h2>Управление услугами</h2>
      <div className="table-actions">
        <button className="add-btn">
          <i className="icon-add"></i> Добавить услугу
        </button>
      </div>
      <table className="services-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Категория</th>
            <th>Длительность</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.category}</td>
              <td>{service.duration} мин</td>
              <td>{service.price} ₽</td>
              <td className="actions">
                <button className="edit-btn">
                  <i className="icon-edit"></i> Редактировать
                </button>
                <button className="delete-btn">
                  <i className="icon-delete"></i> Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {activeTab === 'schedule' && (
    <div className="schedule-container">
      <h2>Управление графиком</h2>
      <div className="schedule-controls">
        <select className="master-select">
          <option value="">Все мастера</option>
          {masters.map(master => (
            <option key={master.id} value={master.id}>{master.name}</option>
          ))}
        </select>
        <button className="add-slot-btn">
          <i className="icon-add"></i> Добавить слот
        </button>
      </div>
      
      <div className="week-navigation">
        <button className="nav-btn">
          <i className="icon-arrow-left"></i>
        </button>
        <span className="current-week">Неделя 12-18 июня 2023</span>
        <button className="nav-btn">
          <i className="icon-arrow-right"></i>
        </button>
      </div>
      
      <div className="schedule-grid">
        <div className="time-column">
          <div className="time-header">Время</div>
          {[...Array(12)].map((_, i) => (
            <div key={i} className="time-slot">{9 + i}:00</div>
          ))}
        </div>
        
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map(day => (
          <div key={day} className="day-column">
            <div className="day-header">{day}</div>
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className={`time-cell ${i % 2 === 0 ? 'even' : 'odd'}`}
                onClick={() => handleCellClick(day, 9 + i)}
              >
                {/* Здесь будут отображаться записи */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )}
</div>
        </div>
      </div>
  
  );
};

export default Admin;
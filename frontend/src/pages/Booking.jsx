import { useState } from 'react';
import BookingForm from '../components/BookingForm';
import '../styles/components.css';
const Booking = () => {
  
const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    master: '',
    date: '',
    time: ''
  });

  const services = [
    { id: '1', name: 'Женская стрижка' },
    { id: '2', name: 'Мужская стрижка' },
    { id: '3', name: 'Окрашивание' }
  ];

  const masters = [
    { id: '1', name: 'Анна Иванова' },
    { id: '2', name: 'Игорь Петров' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Форма отправлена:', formData);
    // Здесь будет отправка данных
  };

  return (
    <div className="booking-page">
      <div className="compact-container">
        <h1>Онлайн-запись</h1>
        
        <form onSubmit={handleSubmit} className="compact-form">
          <div className="form-row">
            <div className="form-group">
              <label>Имя</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Телефон</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Дата</label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Услуга</label>
              <select 
                name="service" 
                value={formData.service} 
                onChange={handleChange} 
                required
              >
                <option value="">Выберите услугу</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>{service.name}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Мастер</label>
              <select 
                name="master" 
                value={formData.master} 
                onChange={handleChange} 
                required
              >
                <option value="">Выберите мастера</option>
                {masters.map(master => (
                  <option key={master.id} value={master.id}>{master.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group time-group">
              <label>Время</label>
              <input 
                type="time" 
                name="time" 
                value={formData.time} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          
          <button type="submit" className="submit-btn">Записаться</button>
        </form>
      </div>
    </div>
  )
};

export default Booking;
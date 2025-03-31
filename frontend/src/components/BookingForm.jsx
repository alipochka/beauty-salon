import { useState } from 'react';
import '../styles/components.css';

const BookingForm = ({ services, masters }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceId: '',
    masterId: '',
    date: '',
    time: '',
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Форма отправлена:', formData);
    // Здесь будет логика отправки данных на сервер
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2>Онлайн-запись</h2>
      <div className="form-group">
        <label>Имя:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Телефон:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Услуга:</label>
        <select name="serviceId" value={formData.serviceId} onChange={handleChange} required>
          <option value="">Выберите услугу</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>{service.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Мастер:</label>
        <select name="masterId" value={formData.masterId} onChange={handleChange} required>
          <option value="">Выберите мастера</option>
          {masters.map(master => (
            <option key={master.id} value={master.id}>{master.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Дата:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Время:</label>
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Комментарий:</label>
        <textarea name="comments" value={formData.comments} onChange={handleChange} />
      </div>
      <button type="submit" className="submit-btn">Записаться</button>
    </form>
  );
};

export default BookingForm;
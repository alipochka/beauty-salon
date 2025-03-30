import React, { useState } from 'react';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Обработка отправки формы
    console.log('Форма отправлена:', formData);
  };

  return (
    <div>
      <h1>Запись на услугу</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Услуга:</label>
          <select name="service" value={formData.service} onChange={handleChange} required>
            <option value="">Выберите услугу</option>
            <option value="haircut">Стрижка</option>
            <option value="manicure">Маникюр</option>
            <option value="pedicure">Педикюр</option>
          </select>
        </div>
        <div>
          <label>Дата:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Время:</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        </div>
        <button type="submit">Записаться</button>
      </form>
    </div>
  );
};

export default BookingPage;

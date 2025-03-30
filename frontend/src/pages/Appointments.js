import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Запрос к API для получения записей клиента
    axios.get('http://localhost:8080/api/appointments', {
      params: { client_id: 1 } // Замените на реальный ID клиента
    })
    .then(response => {
      setAppointments(response.data);
    })
    .catch(error => {
      console.error('Ошибка при получении записей:', error);
    });
  }, []);

  const handleCancel = (id) => {
    // Запрос к API для отмены записи
    axios.post(`http://localhost:8080/api/appointments/${id}/cancel`)
    .then(() => {
      setAppointments(appointments.filter(appointment => appointment.id !== id));
    })
    .catch(error => {
      console.error('Ошибка при отмене записи:', error);
    });
  };

  return (
    <div>
      <h2>Ваши записи</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            {appointment.service} - {new Date(appointment.date).toLocaleDateString()} в {appointment.time}
            <button onClick={() => handleCancel(appointment.id)}>Отменить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;

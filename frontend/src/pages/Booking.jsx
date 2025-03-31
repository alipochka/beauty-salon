import { useState } from 'react';
import BookingForm from '../components/BookingForm';

const Booking = () => {
  const [services] = useState([
    { id: 1, name: 'Мужская стрижка' },
    { id: 2, name: 'Женская стрижка' },
    { id: 3, name: 'Окрашивание' },
    { id: 4, name: 'Укладка' },
    { id: 5, name: 'Бритье' },
  ]);

  const [masters] = useState([
    { id: 1, name: 'Анна Иванова' },
    { id: 2, name: 'Игорь Петров' },
    { id: 3, name: 'Елена Смирнова' },
    { id: 4, name: 'Дмитрий Кузнецов' },
  ]);

  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookingSubmit = (formData) => {
    console.log('Booking data:', formData);
    // Здесь будет отправка данных на сервер
    setBookingSuccess(true);
    // В реальном приложении нужно обрабатывать ошибки
  };

  return (
    <div className="booking-page">
      <div className="container">
        {bookingSuccess ? (
          <div className="booking-success">
            <h2>Спасибо за вашу заявку!</h2>
            <p>Мы свяжемся с вами для подтверждения записи.</p>
            <button onClick={() => setBookingSuccess(false)}>Сделать новую запись</button>
          </div>
        ) : (
          <>
            <BookingForm services={services} masters={masters} onSubmit={handleBookingSubmit} />
          </>
        )}
      </div>
    </div>
  );
};

export default Booking;
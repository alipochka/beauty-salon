const Contacts = () => {
    return (
      <div className="contacts-page">
        <div className="container">
        
          
          <div className="contact-info">
            <div className="contact-section">
              <h2>Адрес</h2>
              <p>г. Москва, ул. Примерная, 123</p>
              <p>Ближайшее метро: "Примерная"</p>
            </div>
            
            <div className="contact-section">
              <h2>Телефоны</h2>
              <p>+7 (123) 456-78-90</p>
              <p>+7 (987) 654-32-10</p>
            </div>
            
            <div className="contact-section">
              <h2>Часы работы</h2>
              <p>Понедельник - Пятница: 9:00 - 21:00</p>
              <p>Суббота - Воскресенье: 10:00 - 20:00</p>
            </div>
          </div>
          
          <div className="map-container">
            <iframe 
              title="Парикмахерская Престиж на карте"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A1234567890abcdef&amp;source=constructor"
              width="100%" 
              height="400" 
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
    );
  };
  
  export default Contacts;
import '../styles/components.css';
import { useEffect } from 'react';

const Contacts = () => {
  useEffect(() => {
    // Создаем и добавляем скрипт карты после монтирования компонента
    const script = document.createElement('script');
    script.src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ae86b172ab8a78f7c2f0b7bd6d2da7e863c4b0f252f170ce9f5f36f627f52f80c&amp;width=100%25&amp;height=274&amp;lang=ru_RU&amp;scroll=true";
    script.async = true;
    script.charset = 'utf-8';
    
    const mapContainer = document.getElementById('yandex-map');
    if (mapContainer) {
      mapContainer.appendChild(script);
    }

    // Удаляем скрипт при размонтировании компонента
    return () => {
      if (mapContainer && script.parentNode === mapContainer) {
        mapContainer.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="contacts-page">
      <div className="container">
        <div className="contact-info">
          <div className="contact-section">
            <h2>Адрес</h2>
            <p>г.Новочеркасск, ул. Привокзальная, 10</p>
          </div>
          
          <div className="contact-section">
            <h2>Телефоны</h2>
            <p>+7 (961) 308-12-92</p>
          </div>
          
          <div className="contact-section">
            <h2>Часы работы</h2>
            <p>Понедельник - Пятница: 8:00 - 19:00</p>
            <p>Суббота - Воскресенье: 08:00 - 17:00</p>
          </div>
        </div>

        {/* Контейнер для карты */}
        <div 
          id="yandex-map" 
          style={{ 
            width: '100%', 
            height: '300px',
            marginTop: '10px',
            borderRadius: '10px',
            overflow: 'hidden'
          }}
        />
      </div>
    </div>
  );
};

export default Contacts;
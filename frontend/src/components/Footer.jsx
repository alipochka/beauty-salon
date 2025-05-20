import '../styles/components.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>О нас</h3>
            <p>Парикмахерская "Престиж" - качественные услуги с 2010 года.</p>
          </div>
          <div className="footer-section">
            <h3>Контакты</h3>
            <p>г. Новочеркасск, ул. Привокзальная, 10</p>
             <p>+7 (961) 308-12-9</p>
          </div>
          <div className="footer-section">
            <h3>Часы работы</h3>
            <p>Пн-Пт: 8:00 - 19:00</p>
            <p>Сб-Вс: 8:00 - 17:00</p>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} ООО Парикмахерская «Престиж»</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
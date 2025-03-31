import { Link } from 'react-router-dom';
import '../styles/components.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Престиж</Link>
        <nav>
          <ul className="nav-list">
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/services">Услуги</Link></li>
            <li><Link to="/booking">Запись</Link></li>
            <li><Link to="/contacts">Контакты</Link></li>
            <li><Link to="/account">Личный кабинет</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
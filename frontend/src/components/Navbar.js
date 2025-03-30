import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Главная</Link></li>
        <li><Link to="/services">Услуги</Link></li>
        <li><Link to="/booking">Запись</Link></li>
        
        {isAuthenticated ? (
            
          <>
            <li><Link to="/appointments">Записи</Link></li>
            <li><Link to="/booking">Записаться</Link></li>
            <li><button onClick={onLogout}>Выйти</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Войти</Link></li>
            <li><Link to="/register">Зарегистрироваться</Link></li>
          </>
        )}
        <li><Link to="/contact">Контакты</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

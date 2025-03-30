import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', { username, password });
      localStorage.setItem('token', response.data.token);
      onLogin();
      navigate('/');
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Имя пользователя" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" required />
      <button type="submit">Войти</button>
    </form>
  );
};

export default LoginPage;

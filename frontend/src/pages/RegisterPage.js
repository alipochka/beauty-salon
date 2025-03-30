import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/register', { username, password });
      onRegister();
      navigate('/login');
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Имя пользователя" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" required />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default RegisterPage;

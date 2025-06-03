'use client';
import { useState } from 'react';
import styles from './login.module.css';

const LoginSplit = ({ onSubmit, title = 'Login' }) => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const isValidPhone = (value) => {
    // Allow Kenyan-style: starts with 07, 01 or country code
    return /^(?:\+?254|0)?[17]\d{8}$/.test(value);
  };

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { identifier, password } = formData;

    // Determine and validate input type
    if (isValidPhone(identifier)) {
      onSubmit({ phone: identifier, password });
    } else if (isValidEmail(identifier)) {
      onSubmit({ email: identifier, password });
    } else {
      setError('Enter a valid phone number or email address');
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <div className={styles.loginLeft}>
          <h2 className={styles.heading}>{title}</h2>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <input
              type="text"
              name="identifier"
              placeholder="Phone or Email"
              value={formData.identifier}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p className={styles.passwordReset}>
              forgot password? click <a href="#">here!</a>
            </p>
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
        <div className={styles.loginRight}>
          <img
            src="https://cdn.pixabay.com/photo/2015/11/06/11/48/multi-family-home-1026483_1280.jpg"
            alt="login"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginSplit;

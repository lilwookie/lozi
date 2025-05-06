
'use client'; 
import React from 'react';
import styles from './login.module.css'
import LoginForm from '../../../components/loginForm';

const AdminLoginPage = () => {
  const handleAdminLogin = ({ email, password }) => {
    // Handle admin login logic here
    console.log('Admin login data', { email, password });
  };

  return (
    <div>
      <h1 className={styles.heading}>Admin Login</h1>
      <LoginForm onSubmit={handleAdminLogin} />
    </div>
  );
};

export default AdminLoginPage;

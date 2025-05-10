
'use client'; 
import React from 'react';
import styles from './login.module.css'
import LoginForm from '../../../components/loginform/loginForm';
import Nav from '../../../components/navbar/navbar';


const AdminLoginPage = () => {
  const handleAdminLogin = ({ email, password }) => {
    // Handle admin login logic here.
    console.log('Admin login data', { email, password });
  };

  return (
    <div>
      <Nav/>
      <LoginForm onSubmit={handleAdminLogin} title='Admin Login'/>
    </div>
  );
};

export default AdminLoginPage;

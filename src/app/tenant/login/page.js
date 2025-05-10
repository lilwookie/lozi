
'use client'; 
import React from 'react';
import styles from './login.module.css'
import LoginForm from '../../../components/loginform/loginForm';
import Nav from '../../../components/navbar/navbar';

const TenantLoginPage = () => {
  const handleTenantLogin = ({ email, password }) => {
    // Handle admin login logic here
    console.log('Tenant login data', { email, password });
  };

  return (
    <div>
      <Nav/>
      <LoginForm onSubmit={handleTenantLogin} title='Tenant Login' />
    </div>
  );
};

export default TenantLoginPage;

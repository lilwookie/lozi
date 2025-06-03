'use client';
import styles from './login.module.css';
import LoginForm from '../../../components/loginform/loginForm';
import Nav from '../../../components/navbar/navbar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

const TenantLoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleTenantLogin = async ({ email, password }) => {
    try {
      const res = await axios.post('http://localhost:4000/tenant/login', {
        email,
        password,
      });

      const { token, tenant } = res.data;

      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(tenant));


          /* To store only tone and extract all other user details from it! */

          
      // Redirect to tenant dashboard
      router.push('/tenant/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <Nav/>
      <LoginForm onSubmit={handleTenantLogin} title='Tenant Login' />
    </div>
  );
};

export default TenantLoginPage;

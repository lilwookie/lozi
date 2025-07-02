
'use client'; 
import React from 'react';
import styles from './login.module.css'
import LoginForm from '../../../components/loginform/loginForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Nav from '../../../components/navbar/navbar';
import axios from 'axios';


const AdminLoginPage = () => {
        const router = useRouter();
        const [error, setError] = useState('');
 const handleAdminLogin = async ({ email, password }) => {
     try {
       const res = await axios.post('http://localhost:4000/admin/login', {
         email,
         password,
       });
 
       const { token, admin } = res.data;
 
       // Store token and user data
       localStorage.setItem('token', token);
       localStorage.setItem('user', JSON.stringify(admin));
 
       // Redirect to tenant dashboard
       router.push('/admin/dashboard');
     } catch (err) {
       console.error('Login error:', err);
       setError(err.response?.data?.message || 'Login failed');
     }
   };
 

  return (
    <div className={styles.wrapper}>
      <Nav/>
      <LoginForm onSubmit={handleAdminLogin} title='Admin Login'/>
    </div>
  );
};

export default AdminLoginPage;

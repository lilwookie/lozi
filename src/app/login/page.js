import React from 'react';
import styles from './login.module.css';

const Login = () => { // Component name is Login
  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Login</h1>
      {/* ... your form ... */}
    </div>
  );
};

export default Login; // Default export is Login
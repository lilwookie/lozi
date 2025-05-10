// src/app/admin/dashboard/layout.js

'use client';
import React from 'react';
import NavBar from '@/components/navbar/navbar';
import SideBar from '@/components/sidebar/sidebar';
import styles from './layout.module.css'; // optional CSS module for layout styling

const DashboardLayout = ({ children }) => {
  return (
    <div className={styles.dashboardContainer}>
      <NavBar />
      <div className={styles.dashboardContent}>
        <SideBar userType="tenant" />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

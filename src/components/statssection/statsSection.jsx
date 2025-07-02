'use client';

import React from 'react';
import styles from './StatsSection.module.css';

const stats = [
  { value: '5,190', label: 'properties listed' },
  { value: '1,131', label: 'vacant units' },
  { value: '7812', label: 'daily bookings' },
];

export default function StatsSection() {
  return (
    <div className={styles.container}>
      {stats.map((stat, index) => (
        <React.Fragment key={index}>
          <div className={styles.statItem}>
            <span className={styles.value}>{stat.value}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
          {index < stats.length - 1 && (
            <span className={styles.divider}>|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

'use client';

import React from 'react';
import styles from './CategoryIcons.module.css';

// 🧠 Icon Imports
import { GiFactory, GiWoodCabin, GiIsland } from 'react-icons/gi';
import { FaBuilding, FaHotel, FaWarehouse } from 'react-icons/fa';
import { MdVilla } from 'react-icons/md';
import { TbHomeEco } from 'react-icons/tb';

const categories = [
  { label: 'Industrial', icon: <GiFactory /> },
  { label: 'Cottages', icon: <GiWoodCabin /> },
  { label: 'Holiday Villages', icon: <GiIsland /> },
  { label: 'Apartments', icon: <FaBuilding /> },
  { label: 'Villas', icon: <MdVilla /> },
  { label: 'Bungalows', icon: <TbHomeEco /> },
  { label: 'Hotels', icon: <FaHotel /> },
  { label: 'Warehouses', icon: <FaWarehouse /> },
];

export default function CategoryIcons() {
  return (
    <div className={styles.iconGrid}>
      {categories.map((cat, index) => (
        <div
          key={index}
          className={styles.iconItem}
          onClick={() => console.log(cat.label)}
        >
          <div className={styles.icon}>{cat.icon}</div>
          <div className={styles.label}>{cat.label}</div>
        </div>
      ))}
    </div>
  );
}

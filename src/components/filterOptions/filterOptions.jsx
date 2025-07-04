'use client';

import { useState } from 'react';
import styles from './FilterOptions.module.css';

const categoryOptions = [
  { id: 1, label: "Rental > Residential > Apartment", value: "rental-residential-apartment" },
  { id: 2, label: "Rental > Commercial > Stalls", value: "rental-commercial-stalls" },
  { id: 3, label: "Sale > Residential > Maisonette", value: "sale-residential-maisonette" },
  { id: 4, label: "Sale > Commercial > Office", value: "sale-commercial-office" }
];

export default function FilterOptions({ onSubmit }) {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(50000);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ category, location, price });
  };

  return (
    <form className={styles.filterForm} onSubmit={handleSubmit}>
      <h4 className={styles.heading}>Filter Properties</h4>

      <div className={styles.formGroup}>
        <label htmlFor="category" className={styles.label}>Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.select}
        >
          <option value="">-- Select Category --</option>
          {categoryOptions.map((opt) => (
            <option key={opt.id} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="location" className={styles.label}>Location</label>
        <input
          type="text"
          id="location"
          placeholder="Search location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price" className={styles.label}>
          Max Price: <span className={styles.priceValue}>KES {parseInt(price).toLocaleString()}</span>
        </label>
        <input
          type="range"
          id="price"
          min="5000"
          max="100000"
          step="1000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={styles.rangeSlider}
        />
      </div>

      <button type="submit" className={styles.searchBtn}>Search</button>
    </form>
  );
}

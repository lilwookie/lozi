"use client"
import React, { useState } from "react";
import styles from "./searchBar.module.css";

import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search Houses, Apartments, Hotels and Travel Destinations in Africa"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <FaSearch className={styles.icon} />
    </div>
  );
};

export default SearchBar;
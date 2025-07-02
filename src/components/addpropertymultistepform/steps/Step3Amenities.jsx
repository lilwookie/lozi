"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/utils/axiosClient";
import styles from "./step.module.css";

export default function Step3_Amenities({ formData, setFormData }) {
  const [allAmenities, setAllAmenities] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchAmenities() {
      try {
        const res = await axiosClient.get("/amenities/getall"); // Adjust this route
        setAllAmenities(res.data);
      } catch (err) {
        console.error("Failed to fetch amenities", err);
      }
    }

    fetchAmenities();
  }, []);

  const selected = formData.amenities || [];

  const addAmenity = (id) => {
    const updated = [...selected, id];
    setFormData((prev) => ({ ...prev, amenities: updated }));
  };

  const removeAmenity = (id) => {
    const updated = selected.filter((a) => a !== id);
    setFormData((prev) => ({ ...prev, amenities: updated }));
  };

  const filteredAmenities = allAmenities.filter(
    (a) =>
      !selected.includes(a.id) &&
      a.name.toLowerCase().includes(search.toLowerCase())
  );

  const getAmenityName = (id) =>
    allAmenities.find((a) => a.id === id)?.name || "";

  return (
    <div className={styles.stepWrapper}>
      <h3 className={styles.groupTitle}>Amenities</h3>

      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search amenity"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className={styles.searchIcon}>🔍</span>
      </div>

      <div className={styles.amenityGrid}>
        {filteredAmenities.map((amenity) => (
          <button
            key={amenity.id}
            type="button"
            className={styles.amenityPill}
            onClick={() => addAmenity(amenity.id)}
          >
            {amenity.name}
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <div className={styles.addedSection}>
          <h4>Added Amenities</h4>
          <div className={styles.selectedPills}>
            {selected.map((id) => (
              <div key={id} className={styles.selectedPill}>
                {getAmenityName(id)}{" "}
                <button onClick={() => removeAmenity(id)}>×</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

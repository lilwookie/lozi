"use client";

import React, { useState } from "react";
import LocationPicker from "@/components/map/LocationPicker"; // Assume we extract this elsewhere
import styles from "./step.module.css";

export default function StepContactAndLocation({ formData, setFormData }) {
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (location) => {
    setFormData((prev) => ({
      ...prev,
      location,
    }));
  };

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>Step: Contact & Location</h2>

      <div className={styles.formGroup}>
        <label>Contact Number *</label>
        <input
          type="tel"
          placeholder="e.g. 0712345678"
          value={formData.contact_phone || ""}
          onChange={handleChange("contact_phone")}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Email Address *</label>
        <input
          type="email"
          placeholder="e.g. info@property.com"
          value={formData.email || ""}
          onChange={handleChange("email")}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Physical Address *</label>
        <input
          type="text"
          placeholder="e.g. 123 Mbagathi Way, Nairobi"
          value={formData.physical_address || ""}
          onChange={handleChange("physical_address")}
        />
      </div>

      <div className={styles.formGroup}>
      
        <LocationPicker formData={formData} setFormData={setFormData} />
          <label>Select Location on Map *</label>
      </div>
    </div>
  );
}

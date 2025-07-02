"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/utils/axiosClient";
import styles from './step.module.css';

export default function Step1_BasicInfo({ formData, setFormData }) {
  const [mainCategories, setMainCategories] = useState([]);
  const [useTypes, setUseTypes] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

  // Fetch Main Categories
  useEffect(() => {
    axiosClient.get("/propertymaincategory/getall")
      .then((res) => setMainCategories(res.data))
      .catch((err) => console.error("Main Categories Error:", err));
  }, []);

  // Fetch Use Types when main category changes
  useEffect(() => {
    if (formData.category_id) {
      axiosClient.get(`/propertyusetype/main-category/${formData.category_id}`)
        .then((res) => setUseTypes(res.data))
        .catch((err) => console.error("Use Types Error:", err));
    } else {
      setUseTypes([]);
    }
  }, [formData.category_id]);

  // Fetch Property Types when use type changes
  useEffect(() => {
    if (formData.use_type_id) {
      axiosClient.get(`/propertytypes/use-type/${formData.use_type_id}`)
        .then((res) => setPropertyTypes(res.data))
        .catch((err) => console.error("Property Types Error:", err));
    } else {
      setPropertyTypes([]);
    }
  }, [formData.use_type_id]);

  const handleChange = (field) => (e) => {
    let value = e.target.value;

  // Convert to number if field is expected to be an ID
  if (["category_id", "use_type_id", "type_id"].includes(field)) {
    value = value === "" ? null : parseInt(value);
  }
    setFormData((prev) => ({
      
      ...prev,
      [field]: value,
      ...(field === "category_id" && { use_type_id: "", type_id: "" }),
      ...(field === "use_type_id" && { type_id: "" }),

      
    }));
console.log(formData);
  
  };

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>Step 1: Basic Property Info</h2>

      <div className={styles.formGroup}>
        <label>Property Title *</label>
        <input
          type="text"
          value={formData.title || ""}
          onChange={handleChange("title")}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Category *</label>
        <select
          value={formData.category_id || ""}
          onChange={handleChange("category_id")}
        >
          <option value="">-- Select Category --</option>
          {mainCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Use Type *</label>
        <select
          value={formData.use_type_id || ""}
          onChange={handleChange("use_type_id")}
          disabled={!formData.category_id}
        >
          <option value="">-- Select Use Type --</option>
          {useTypes.map((ut) => (
            <option key={ut.id} value={ut.id}>
              {ut.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Property Type *</label>
        <select
          value={formData.type_id || ""}
          onChange={handleChange("type_id")}
          disabled={!formData.use_type_id}
        >
          <option value="">-- Select Type --</option>
          {propertyTypes.map((pt) => (
            <option key={pt.id} value={pt.id}>
              {pt.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Description</label>
        <textarea
          rows="4"
          value={formData.description || ""}
          onChange={handleChange("description")}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Average Rent (KES)</label>
        <input
          type="number"
          value={formData.average_rent || ""}
          onChange={handleChange("average_rent")}
        />
      </div>
    </div>
  );
}

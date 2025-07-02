"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./step.module.css";

export default function Step2_Specifications({ formData, setFormData }) {
  const [specs, setSpecs] = useState([]);
  const [grouped, setGrouped] = useState({});

  useEffect(() => {
    async function fetchSpecs() {
      try {
        const res = await axios.get("http://localhost:4000/specifications/getall"); // Adjust to your actual route
        const data = res.data;

        setSpecs(data);

        // Group by category
        const groupedData = {};
        data.forEach((spec) => {
          if (!groupedData[spec.category]) groupedData[spec.category] = [];
          groupedData[spec.category].push(spec);
        });
        setGrouped(groupedData);
      } catch (err) {
        console.error("Failed to fetch specifications:", err);
      }
    }

    fetchSpecs();
  }, []);

  const handleChange = (specId, value) => {
    setFormData((prev) => {
      const updated = [...(prev.specifications || [])];
      const index = updated.findIndex((s) => s.spec_id === specId);

      if (index > -1) {
        updated[index].value = value;
      } else {
        updated.push({ spec_id: specId, value });
      }

      return { ...prev, specifications: updated };
    });
  };

  const isChecked = (specId) =>
    formData.specifications?.find((s) => s.spec_id === specId)?.value === true;

  const getValue = (specId) =>
    formData.specifications?.find((s) => s.spec_id === specId)?.value || "";

  return (
    <div className={styles.stepWrapper}>
      {Object.entries(grouped).map(([category, specsInGroup]) => (
        <div key={category} className={styles.specGroup}>
          <h3 className={styles.groupTitle}>
            {category.toUpperCase()} Specifications
          </h3>

          {specsInGroup.map((spec) => (
            <div key={spec.id} className={styles.specField}>
              {spec.input_type === "checkbox" && (
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={isChecked(spec.id)}
                    onChange={(e) =>
                      handleChange(spec.id, e.target.checked)
                    }
                  />
                  {spec.name}
                </label>
              )}

              {spec.input_type === "dropdown" && (
                <div className={styles.selectGroup}>
                  <label>{spec.name}</label>
                  <select
                    value={getValue(spec.id)}
                    onChange={(e) => handleChange(spec.id, e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    {spec.options?.split(",").map((opt, idx) => (
                      <option key={idx} value={opt.trim()}>
                        {opt.trim()}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {spec.input_type === "number" && (
                <div className={styles.inputGroup}>
                  <label>{spec.name}</label>
                  <input
                    type="number"
                    value={getValue(spec.id)}
                    onChange={(e) => handleChange(spec.id, e.target.value)}
                  />
                </div>
              )}

              {spec.input_type === "text" && (
                <div className={styles.inputGroup}>
                  <label>{spec.name}</label>
                  <input
                    type="text"
                    value={getValue(spec.id)}
                    onChange={(e) => handleChange(spec.id, e.target.value)}
                  />
                </div>
              )}

              {!spec.input_type && spec.options && (
                <div className={styles.multiCheckboxGroup}>
                  <label>{spec.name}</label>
                  {spec.options.split(",").map((opt, idx) => (
                    <div key={idx}>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            Array.isArray(getValue(spec.id))
                              ? getValue(spec.id).includes(opt.trim())
                              : false
                          }
                          onChange={(e) => {
                            const old = getValue(spec.id) || [];
                            const updated = e.target.checked
                              ? [...old, opt.trim()]
                              : old.filter((v) => v !== opt.trim());
                            handleChange(spec.id, updated);
                          }}
                        />
                        {opt.trim()}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

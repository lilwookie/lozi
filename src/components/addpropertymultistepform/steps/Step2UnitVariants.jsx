"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/utils/axiosClient";
import styles from './step.module.css';

export default function StepUnitVariants({ formData, setFormData }) {
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    if (formData.use_type_id) {
      axiosClient.get(`/unitvariants/usetype/${formData.use_type_id}`)
        .then((res) => {
          console.log("Fetched Variants:", res.data);
          setVariants(res.data || []);
        })
        .catch(err => console.error("Error fetching unit variants:", err));
    } else {
      setVariants([]);
    }
  }, [formData.use_type_id]);

  const toggleVariant = (variantObj) => {
    if (!variantObj || !variantObj.id) return;

    setFormData((prev) => {
      const current = Array.isArray(prev.unit_variants) ? prev.unit_variants : [];

      const exists = current.includes(variantObj.id);
      const updated = exists
        ? current.filter((id) => id !== variantObj.id)
        : [...current, variantObj.id];

      return { ...prev, unit_variants: updated };
    });
  };

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>Step: Unit Variants</h2>

      <div className={styles.formGroup}>
        <label>Select the unit types available for this property:</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {variants.map((variant) => {
            if (!variant || !variant.id) return null;

            const isSelected = formData.unit_variants?.includes(variant.id);

            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => toggleVariant(variant)}
                className={`${styles.amenityPill} ${isSelected ? styles.active : ''}`}
              >
                {variant.name}
              </button>
            );
          })}
        </div>
      </div>

      {Array.isArray(formData.unit_variants) && formData.unit_variants.length > 0 && (
        <div className={styles.formGroup}>
          <label>Added Units:</label>
          <ul style={{ paddingLeft: '1.2rem', marginTop: '0.4rem' }}>
            {formData.unit_variants.map((id) => {
              const variant = variants.find((v) => v.id === id);
              return (
                <li key={id}>
                  {variant?.name || `Variant ID: ${id}`}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

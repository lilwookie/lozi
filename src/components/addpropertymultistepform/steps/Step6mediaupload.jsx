import { useEffect } from "react";
import styles from './step.module.css';
import axiosClient from "@/utils/axiosClient";

export default function Step4_MediaUpload({ formData, setFormData }) {
  // Use `formData.media` and `formData.previews` instead of local useState
  // const images = formData.media || [];
  const previews = formData.media_previews || [];

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      media: [...(prev.media || []), ...files],
      media_previews: [...(prev.media_previews || []), ...newPreviews],
    }));
  };

  const handleRemoveImage = (index) => {
    URL.revokeObjectURL(previews[index]);

    setFormData((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
      media_previews: prev.media_previews.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <h3 className={styles.groupTitle}>Upload Property Images</h3>

      <div className={styles.uploadRow}>
        <div className={styles.previewBox}>
          {previews.map((src, i) => (
            <div key={i} className={styles.previewImageWrapper}>
              <img src={src} alt={`preview-${i}`} />
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => handleRemoveImage(i)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <label className={styles.photoUpload}>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <span>+</span>
          <span className={styles.addimgtext}>add image</span>
        </label>
      </div>
    </div>
  );
}

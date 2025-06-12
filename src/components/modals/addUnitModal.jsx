import { useState } from "react";
import styles from "./AddUnitModal.module.css";

export default function AddUnitModal({ isOpen, onClose }) {
  const [unitNumber, setUnitNumber] = useState("");
  const [unitType, setUnitType] = useState("");
  const [rent, setRent] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  const newPreviews = files.map(file => URL.createObjectURL(file));

  setImages(prev => [...prev, ...files]);
  setPreviews(prev => [...prev, ...newPreviews]);
};

const handleRemoveImage = (index) => {
  URL.revokeObjectURL(previews[index]); // clean up memory

  setPreviews(prev => prev.filter((_, i) => i !== index));
  setImages(prev => prev.filter((_, i) => i !== index));
};



  const handleSubmit = async (e) => {
    e.preventDefault();

     const token = localStorage.getItem("token");
    const formData = new FormData();
  formData.append("unit_number", unitNumber);
  formData.append("unit_type", unitType);
  formData.append("monthly_rent", rent);
  formData.append("description", description);
  images.forEach((img) => formData.append("images", img)); // 'images' matches multer field


  const res = await fetch("http://localhost:4000/units/add", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}` // if you're using JWT
    },
    body: formData,
  });


    if (res.ok) {
      alert("Unit added!");
        setUnitNumber("");
        setUnitType("");
        setRent("");
        setDescription("");
        setImages([]);
        setPreviews([]);
        onClose();
    } else {
      alert("Failed to add unit.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Add New Unit</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <input
              type="text"
              className={styles.input}
              placeholder="Unit Number"
              value={unitNumber}
              onChange={(e) => setUnitNumber(e.target.value)}
              required
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Unit Type"
              value={unitType}
              onChange={(e) => setUnitType(e.target.value)}
              required
            />
          </div>

          <input
            type="text"
            className={styles.input}
            placeholder="Kes , 120,000"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            required
          />

          <textarea
            className={styles.textarea}
            placeholder="Maximum 1000 words"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />

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



          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.save}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

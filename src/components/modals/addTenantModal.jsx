import { useEffect, useState } from "react";
import styles from "./AddTenantModal.module.css";

export default function AddTenantModal({ isOpen, onClose }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [unitId, setUnitId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [units, setUnits] = useState([]);
  const [unitDetails, setUnitDetails] = useState(null);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [token, setToken] = useState("");

  // Get token on client only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  // Fetch units when modal opens
  useEffect(() => {
    if (isOpen && token) {
      fetch("http://localhost:4000/units/vacant", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setUnits(data);
          } else if (Array.isArray(data.units)) {
            setUnits(data.units);
          } else {
            setUnits([]);
          }
        })
        .catch(() => setUnits([]));
    }
  }, [isOpen, token]);

  useEffect(() => {
    if (unitId) {
      const selected = units.find((u) => u.id === unitId);
      setUnitDetails(selected);
    } else {
      setUnitDetails(null);
    }
  }, [unitId, units]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    URL.revokeObjectURL(previews[index]);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("mobile", phone);
    formData.append("email", email);
    formData.append("unit_id", unitId);
    formData.append("start_date", startDate);
    formData.append("password", "secure123"); // optionally generate

    if (images.length > 0) {
      formData.append("image", images[0]);
    }

    try {
      // Step 1: Register tenant
      const res = await fetch("http://localhost:4000/tenant/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to register tenant");

      const tenantData = await res.json();
      const tenantId = tenantData?.id;

      if (!tenantId) throw new Error("Tenant ID not returned");

      // Step 2: Assign tenant to unit
      const assignRes = await fetch("http://localhost:4000/assignment/assign_tenant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tenantId,
          unitId,
        }),
      });

      if (!assignRes.ok) throw new Error("Failed to assign tenant to unit");

      alert("Tenant registered and assigned successfully!");

      // Reset form
      setFullName("");
      setPhone("");
      setEmail("");
      setUnitId("");
      setStartDate("");
      setImages([]);
      setPreviews([]);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Add New Tenant</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <input
              type="text"
              className={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="tel"
              className={styles.input}
              placeholder="+2547 123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <input
            type="email"
            className={styles.input}
            placeholder="tenant@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className={styles.row}>
            <select
              className={styles.input}
              value={unitId}
              onChange={(e) => setUnitId(e.target.value)}
              required
            >
              <option value="">Select Unit</option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.unit_number}
                </option>
              ))}
            </select>

            <input
              type="date"
              className={styles.input}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          {unitDetails && (
            <div className={styles.unitDetails}>
              <span className={styles.unitLabel}>{unitDetails.unitNumber}</span>
              <div className={styles.unitInfoGrid}>
                <div>
                  <div className={styles.unitHeading}>Type</div>
                  <div>{unitDetails.unitType}</div>
                </div>
                <div>
                  <div className={styles.unitHeading}>Rent</div>
                  <div>{unitDetails.rent}</div>
                </div>
                <div>
                  <div className={styles.unitHeading}>Description</div>
                  <div>{unitDetails.description}</div>
                </div>
              </div>
            </div>
          )}

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

"use client";

import { useState } from 'react';
import styles from './addproperty.module.css';
import axiosClient from '@/utils/axiosClient';

import Step1_BasicInfo from './steps/Step1Basicinfo';
import Step2_UnitVariants from './steps/Step2UnitVariants';
import Step3_Specifications from './steps/Step4Specifications';
import Step4_Amenities from './steps/Step3Amenities';
import Step5_ContactLocation from './steps/Step5ConctactLocation';
import Step6_MediaUpload from './steps/Step6mediaupload';
import Step7_AssignLandlord from './steps/Step7AssignLandlord';

const steps = [
  { title: 'Basic Info', component: Step1_BasicInfo },
  { title: 'Unit Variants', component: Step2_UnitVariants },
  { title: 'Specifications', component: Step3_Specifications },
  { title: 'Amenities', component: Step4_Amenities },
  { title: 'Media Upload', component: Step6_MediaUpload },
  { title: 'Assign Landlord & Agent', component: Step7_AssignLandlord },
  { title: 'Contact & Location', component: Step5_ContactLocation },
];

export default function MultistepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const StepComponent = steps[currentStep].component;

  const next = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

const submitProperty = async () => {
  const {
    media = [], // ✅ this is the actual image files array from Step4_MediaUpload
    media_previews, // ✅ we ignore this, just for local UI
    ...restData
  } = formData;

  const payload = {
    ...restData,
    average_rent: Number(formData.average_rent),
    featured_img_url: media.length > 0 ? `/uploads/properties/${media[0].name}` : "",

    address: {
      contact_phone: formData.contact_phone,
      email: formData.email,
      physical_address: formData.physical_address,
      mapbox_place_name: formData.location,
      latitude: formData.coordinates?.lat,
      longitude: formData.coordinates?.lng,
    },

    unit_variants: formData.unit_variants || [],
    specs: formData.specifications || [],
    amenities: formData.amenities || [],
  };

  // Create multipart form for files + JSON
  const form = new FormData();
  form.append("data", JSON.stringify(payload));

  // Append each image file
  media.forEach((file) => {
    form.append("images", file);
  });

  console.log("Submitting Payload:", payload);

  try {
    const res = await axiosClient.post("/property/register", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Property registered:", res.data);
    alert("Property registered successfully!");
  } catch (err) {
    console.error("❌ Submit error:", err.response?.data || err.message);
    alert("Failed to submit property. Check console.");
  }
};


  return (
    <div className={styles.wrapper}>
      {/* Step Indicator */}
      <div className={styles.stepIndicator}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${styles.step} ${index === currentStep ? styles.activeStep : ''}`}
          >
            {step.title}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className={styles.formBody}>
        <StepComponent formData={formData} setFormData={setFormData} />
      </div>

      {/* Navigation Buttons */}
      <div className={styles.navButtons}>
        <button
          onClick={back}
          disabled={currentStep === 0}
          className={`${styles.button} ${styles.back}`}
        >
          Back
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={next}
            className={`${styles.button} ${styles.next}`}
          >
            Next
          </button>
        ) : (
          <button
            onClick={submitProperty}
            className={`${styles.button} ${styles.submit}`}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

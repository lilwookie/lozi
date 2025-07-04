// 'use client';
import { use } from 'react';

import { properties } from "@/app/mock-data/properties";


import styles from './page.module.css';
import PropertyPreview from './PropertyPreview';

export default function PropertyDetails({params}) {
   
   const { slug } = use(params);
   const selectedProperty  = properties.find((p) => p.slug === slug);


  return (
  <div className={styles.previewPage}>
    {selectedProperty ? (
      <PropertyPreview property={selectedProperty} />
    ) : (
      <p>Property not found</p>
    )}
  </div>
);

}


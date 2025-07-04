'use client';


import styles from './propertyPreview.module.css';
import PreviewHero from './components/previewHero';
import PropertyOverview from './components/Overview';

const PropertyPreviewPage = ({ property }) => {


  return (
    <div className={styles.previewWrapper}>
          <PreviewHero property={property} />
          <PropertyOverview property={property} />
    </div>
  );
};

export default PropertyPreviewPage;

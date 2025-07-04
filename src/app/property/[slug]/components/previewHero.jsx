'use client';
import { useState, useEffect } from 'react';
import styles from './PreviewHero.module.css';
import MapboxMap from '@/components/map/Map'; // Adjust if needed
import Image from 'next/image';

const PreviewHero = ({ property }) => {
  const images = property?.preview_imgs || ['/placeholder.jpg'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredImg = images[currentIndex];
  const remainingCount = images.length > 4 ? images.length - 4 : 0;

   const [isFading, setIsFading] = useState(false);
 
 
  const changeImage = (index) => {
    if (index === currentIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsFading(false);
    }, 200); // Duration should match fadeOut time
  };

  return (
    <div className={styles.heroContainer}>
      <div className={styles.leftContent}>
        <div className={styles.featuredImage}>
          <Image
            src={featuredImg}
            alt="Featured"
            fill
            className={`${styles.img} ${isFading ? styles.fadeOut : ''}`}
          />

          {currentIndex > 0 && (
            <button className={styles.navArrow} onClick={() => changeImage(currentIndex - 1)}>
              &#8592;
            </button>
          )}

          {currentIndex < images.length - 1 && (
            <button className={`${styles.navArrow} ${styles.right}`} onClick={() => changeImage(currentIndex + 1)}>
              &#8594;
            </button>
          )}
        </div>

        <div className={styles.thumbnails}>
          {images.slice(0, 4).map((img, i) => (
            <div
              key={i}
              className={`${styles.thumbWrapper} ${i === currentIndex ? styles.active : ''}`}
              onClick={() => changeImage(i)}
            >
              <Image src={img} alt={`Thumbnail ${i}`} fill className={styles.thumbImg} />
              {i === 3 && remainingCount > 0 && (
                <div className={styles.overlay}>+{remainingCount} more</div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.infoBar}>
          <span>{property?.units_available} units left</span>
          <span>listed {property?.listed_ago}</span>
        </div>
      </div>

      <div className={styles.rightMap}>
        <MapboxMap
          latitude={property?.location?.lat || -1.3}
          longitude={property?.location?.lng || 36.8}
        />
      </div>
    </div>
  );
};

export default PreviewHero;
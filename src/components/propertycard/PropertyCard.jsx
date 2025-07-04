import styles from './PropertyCard.module.css';

import { FaMapMarkerAlt, FaWifi, FaCar, FaHeart, FaClock, FaBuilding, FaEye,FaPhone } from 'react-icons/fa';

const PropertyCard = ({ property }) => {

  
  const {
    title,
    description,
    featured_img_url,
    preview_imgs = [],
    location,
    price,
    contact,
    amenities = [],
    views,
    units_available,
    listed_ago
  } = property;

  return (

    
        <div className={styles.card}>
          {/* Image Section */}
          <div className={styles.imageWrapper}>
            <img src={featured_img_url} alt={title} className={styles.image} />
            <button className={styles.favorite}><FaHeart /></button>
          </div>

          {/* Preview Thumbnails */}
          {preview_imgs.length > 0 && (
            <div className={styles.previewRow}>
              {preview_imgs.slice(0, 3).map((img, idx) => (
                <img key={idx} src={img} alt={`thumb-${idx}`} className={styles.thumb} />
              ))}
            </div>
          )}

          {/* Info Section */}
          <div className={styles.info}>
            <h4 className={styles.title}>{title}</h4>
            <p className={styles.description}>
            {description.length > 100 ? `${description.slice(0, 100)}...` : description}
          </p>

            <div className={styles.location}>
              <FaMapMarkerAlt className={styles.icon} />
              <span>{location}</span>
            </div>

            <p className={styles.price}>Kes {price.toLocaleString()}</p>
            <p className={styles.contact}><span><FaPhone /></span>{contact}</p>
          </div>

          {/* Stats Section */}
          <div className={styles.stats}>
            <span><FaEye /> {views} Views</span>
            <span><FaBuilding /> {units_available} Units Left</span>
            <span><FaClock /> Listed {listed_ago}</span>
          </div>

          {/* Amenities (optional row) */}
          <div className={styles.amenities}>
            {amenities.includes('wifi') && <FaWifi />}
            {amenities.includes('parking') && <FaCar />}
          </div>
        </div>
  );
};

export default PropertyCard;

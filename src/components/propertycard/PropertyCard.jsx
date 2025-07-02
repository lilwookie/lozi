import styles from './PropertyCard.module.css';
import { FaWifi, FaCctv, FaDumbbell, FaHeart, FaPhone, FaComment } from 'react-icons/fa';
import { GiCctvCamera } from 'react-icons/gi';

export default function PropertyCard({
  title,
  description,
  location,
  price,
  imageUrls,
  listedDate,
  features = ['wifi', 'cctv', 'gym']
}) {
  return (
    <div className={styles.card}>
      <div className={styles.imageSection}>
        <img src={imageUrls[0]} alt="property preview" className={styles.mainImage} />
        <div className={styles.thumbnailWrapper}>
          {imageUrls.slice(1, 4).map((url, i) => (
            <img key={i} src={url} alt={`thumb-${i}`} className={styles.thumbnail} />
          ))}
          {imageUrls.length > 4 && (
            <div className={styles.moreImages}>+{imageUrls.length - 4} more</div>
          )}
        </div>
      </div>

      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.icons}>
          {features.includes('wifi') && <FaWifi title="WiFi" />}
          {features.includes('cctv') && <GiCctvCamera title="CCTV" />}
          {features.includes('gym') && <FaDumbbell title="Gym" />}
        </div>

        <div className={styles.price}>Kes {price.toLocaleString()}</div>
        <div className={styles.bottomRow}>
          <div className={styles.location}>{location}</div>
          <div className={styles.icons}>
            <FaPhone />
            <FaComment />
            <FaHeart className={styles.heartIcon} />
          </div>
        </div>
        <div className={styles.listed}>Listed {listedDate}</div>
      </div>
    </div>
  );
}

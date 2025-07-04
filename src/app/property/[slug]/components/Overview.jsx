import styles from './Overview.module.css';
import { FaMapMarkerAlt, FaPhone, FaCommentDots } from 'react-icons/fa';

const PropertyOverview = ({ property }) => {
  const { title, price, location, contact } = property;

  return (
    <div className={styles.overviewContainer}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.price}>Kes {price.toLocaleString()}</p>

      <div className={styles.detailRow}>
        <FaMapMarkerAlt className={styles.icon} />
        <span>{location}</span>
      </div>

      <div className={`${styles.detailRow} ${styles.withLine}`}>
        <FaPhone className={styles.icon} />
        <span>{contact}</span>
      </div>

      <div className={`${styles.detailRow} ${styles.withLine}`}>
        <FaCommentDots className={styles.icon} />
        <span className={styles.message}>Send Message</span>
      </div>
    </div>
  );
};

export default PropertyOverview;

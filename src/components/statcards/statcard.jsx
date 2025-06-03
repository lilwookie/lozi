// StatCard.js
import React from 'react';
import styles from  './statcard.module.css'; 


const StatCard = ({ title, value, description,icon }) => {
  return (
    <div className={styles.statcard}>
      
      <div className={styles.statcardinfo}>
            <div className={styles.left}>
                <h3 className={styles.statcardtitle}>{title}</h3>
                <p className={styles.statcardvalue}>{value}</p>
            </div>
            <div className={styles.right}>
                <div className={styles.statcardicon}>{icon}</div>
            </div>
      </div>

      <div >
         <p className={styles.statcarddesc}>{description}</p>
      </div>
     
      
    </div>
  );
};

export default StatCard;
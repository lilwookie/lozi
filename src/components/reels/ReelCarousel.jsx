import React from "react";
import styles from "./ReelsCarousel.module.css";

const categories = [
  { label: "BNBs", image: "https://cdn.pixabay.com/photo/2015/12/05/23/38/nursery-1078923_960_720.jpg" },
  { label: "Apartments", image: "https://cdn.pixabay.com/photo/2017/06/06/23/46/building-2378893_960_720.jpg" },
  { label: "Maisonettes", image: "https://cdn.pixabay.com/photo/2018/03/19/18/46/driveway-3240834_960_720.jpg" },
  { label: "Studios", image: "https://cdn.pixabay.com/photo/2017/02/24/12/23/kitchen-2094722_960_720.jpg" },
  { label: "Vacation", image: "https://cdn.pixabay.com/photo/2022/10/05/05/40/sunset-7499759_1280.jpg" },
  { label: "About Us", image: "https://cdn.pixabay.com/photo/2017/01/09/13/41/apartment-1966535_1280.jpg" },
];

const ReelsCarousel = () => {
  return (
    <div>
      <div className={styles.carouselContainer}>
        {categories.map((cat, index) => (
          <div key={index}>
            <div
              className={styles.thumbnail}
              style={{ backgroundImage: `url(${cat.image})` }}
            />
            <div className={styles.label}>{cat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelsCarousel;

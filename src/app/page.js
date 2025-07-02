import Image from "next/image";
import styles from "./page.module.css";
import Nav from '../components/navbar/navbar';

import ReelsCarousel from "@/components/reels/ReelCarousel";
import SearchBar from "@/components/searchbar/searchBar";

import StatsSection from '../components/StatsSection/statsSection';
import CategoryIcons from '../components/CategoryIcons/categoryIcons';

export default function Home() {
  return (
    <div className={styles.page}>
       
      <main className={styles.main}>
          <section
                className={styles.heroSection}
                style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2014/08/11/21/39/wall-416060_1280.jpg')" }} // update path as needed
          >
         
        <div className={styles.overlay} />
        <div className={styles.content}>
          <Nav className={styles.heroNav}/>
          <p className={styles.tagline}>
            Kenya’s Easiest Way to Find and Book Your Next Home or Vacation Stay.
          </p>
            <ReelsCarousel/>
            <SearchBar/>
        </div>

{/* stats and category icons div */}
       <div className={styles.statsWrapper}>
        <StatsSection />
        <hr className={styles.hrLine} />
        <CategoryIcons/>
        </div>


      </section>

      </main>
      <footer className={styles.footer}>
          (c) Copy right 2025. Tenanz Houses
      </footer>
    </div>
  );
}

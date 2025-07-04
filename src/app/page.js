"use client";
import Image from "next/image";
import { useEffect, useState } from 'react';
import styles from "./page.module.css";
import Nav from '../components/navbar/navbar';
import Link from 'next/link';

import ReelsCarousel from "@/components/reels/ReelCarousel";
import SearchBar from "@/components/searchbar/searchBar";

import StatsSection from '../components/StatsSection/statsSection';
import CategoryIcons from '../components/CategoryIcons/categoryIcons';

import FilterOptions from '../components/filterOptions/filterOptions'; 
// import AgenzWidget from '../components/AgenzWidget';

import PropertyCard from '../components/PropertyCard/PropertyCard'

//mock data import. 
import { properties } from "./mock-data/properties";

export default function Home() {

     const mediaSources = [
    { type: 'video', url: 'https://cdn.pixabay.com/video/2023/06/25/168801-839864542_tiny.mp4' },
    { type: 'video', url: 'https://cdn.pixabay.com/video/2025/05/27/282084_tiny.mp4' },
    { type: 'image', url: 'https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271_1280.jpg' },
    { type: 'image', url: 'https://cdn.pixabay.com/photo/2014/08/11/21/39/wall-416060_1280.jpg' },
  ];

  const [background, setBackground] = useState(mediaSources[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * mediaSources.length);
    setBackground(mediaSources[randomIndex]);
  }, []);


const handleFilter = ({ category, location, price }) => {
  // Parse the category string into its parts if needed
  const [mainCategory, useType, propertyType] = category
    ? category.split('-')
    : ['', '', ''];

  // Build a filter query object
  const filters = {
    ...(mainCategory && { mainCategory }),
    ...(useType && { useType }),
    ...(propertyType && { propertyType }),
    ...(location && { location }),
    ...(price && { maxPrice: parseInt(price) })
  };

  console.log('🧠 Applying filters:', filters);

  // Example: Send filters to API or update local state
  // fetchFilteredProperties(filters)
  // or update URL query params
};

  return (
    <div className={styles.page}>
       
      <main className={styles.main}>
        <section
                className={styles.heroSection}
                // style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2014/08/11/21/39/wall-416060_1280.jpg')" }} // update path as needed
          >

           {background.type === 'video' ? (
        <video
          className={styles.media}
          src={background.url}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          className={styles.media}
          src={background.url}
          alt="Hero background"
        />
      )}
         
        <div className={styles.overlay} />
        <div className={styles.content}>
          <Nav className={styles.heroNav}/>
          <p className={styles.tagline}>
            Kenya’s Easiest Way to Find and Book Your Next Home or Vacation Stay.
          </p>
            <ReelsCarousel/>
            <SearchBar/>
        </div>

   

      </section>
      <section>
         {/* stats and category icons div */}
       <div className={styles.statsWrapper}>
        <StatsSection />
        <hr className={styles.hrLine} />
        <CategoryIcons/>
        </div>
      </section>

      {/* Mobile filter section */}
      <section className={styles.mobileFilterSection}>
            <p>MOBILE FILTER OPTIONS</p>
      </section>
      {/* Premium listing section  */}

       <section className={styles.premiumSection}>
          <h3  className={styles.heading} >Premium property Features</h3>

      <div className={styles.wrapper}>
        {/* Left: Property Cards */}
        <div className={styles.left}>
        
              <div className={styles.cardGrid}>
                {properties.map((prop, idx) => (

                  <Link href={`/property/${prop.slug}`} key={prop.slug}>
                      <PropertyCard property={prop} />
                  </Link>

                ))}
              </div>

             
        </div>

        {/* Right: Filter + AI */}
        <div className={styles.right}>
          <h2>FILTER OPTIONS</h2>
          <FilterOptions onSubmit={handleFilter} />
          {/* <AgenzWidget /> */}
         

        </div>
      </div>
    </section>

      </main>
      <footer className={styles.footer}>
          (c) Copy right 2025. Tenanz Houses
      </footer>
    </div>
  );
}

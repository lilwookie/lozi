
'use client';
import React from 'react';
import StatCard from '@/components/statcards/statcard';
import {FaDoorOpen, FaMoneyBill} from 'react-icons/fa';
import styles from './layout.module.css'

const DashboardHome = () => {
  return (
    <div>

      {/* header secttion with the page title */}
      <header>
          <h1>Welcome to the Admin Dashboard!!</h1>
          <p>Select an option from the sidebar to get started.</p>
      </header>
  
      {/* quick stats section  */}
      <section>
      <div className={styles.statcards}>
            <StatCard title="Total rent Paid"
            value="200" 
            description = "spread across the country operating 24/7" 
            icon={<FaMoneyBill sx={{ fontSize: 60, color: '#052560' }}/>} 
            />


            <StatCard title="Duration of Stay"
             value="15"
             description = "accross all Masma Outlets commited to server" 
             icon={<FaDoorOpen sx={{ fontSize: 60, color: 'grey' }}/>} 
             />
            
            <StatCard 
            title="May Rent Status" 
            value="100"
            description = "Fully Paid"
            icon={<FaDoorOpen sx={{ fontSize: 60, color: 'orange' }}/>} />
            
            <StatCard 
            title="Next rent Due" 
            value= "23"
            description = "Due 15 July 2025" 
            icon={<FaMoneyBill sx={{ fontSize: 60, color: 'green' }}/>} />
        </div>
      </section>

      <section className={styles.lipanampesa}>
        <h1>Lipa Na Mpesa </h1>

      </section>

      <section className={styles.recentpayments}>

      </section>
    </div>
  );
};

export default DashboardHome;

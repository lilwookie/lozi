
'use client';
import {useEffect, useState } from "react";
import StatCard from '@/components/statcards/statcard';
import {FaDoorOpen, FaMoneyBill} from 'react-icons/fa';
import styles from './layout.module.css'

import AddUnitModal from '@/components/modals/addUnitModal';
import AddTenantModal from "@/components/modals/addTenantModal";

const DashboardHome = () => {
 
 const [units, setUnits] = useState([]);
  const [vacantCount, setVacantCount] = useState(0);
  const [occupiedCount, setOccupiedCount] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
  const fetchUnitCounts = () => {
    fetch("http://localhost:4000/units/list", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const unitArray = data.units || [];
        const vacant = unitArray.filter((u) => Number(u.is_occupied) === 0).length;
        const occupied = unitArray.filter((u) => Number(u.is_occupied) === 1).length;
        setVacantCount(vacant);
        setOccupiedCount(occupied);
      })
      .catch((err) => console.error("Polling error:", err));
  };

  fetchUnitCounts(); // fetch once initially

  const interval = setInterval(fetchUnitCounts, 2000); // every 5 seconds

  return () => clearInterval(interval); // cleanup on unmount
}, []);

 
 
  function logoutAdmin() {
  if (window.confirm('Are you sure you want to log out?')) {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    window.location.href = '/admin/login';
  }
}


  
  return (
    <div>

      {/* header secttion with the page title */}
      <header>
          <h1>Welcome to the Admin Dashboard!!</h1>
          <p>Select an option from the sidebar to get started.</p>
          <button onClick={logoutAdmin}>Logout</button>

      </header>
  
      {/* quick stats section  */}
      <section className={styles.sectionOne}>
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

       <div className={styles.right}>
  <div className={styles.registrationCard}>
    <h3 className={styles.cardTitle}>REGISTRATION</h3>
      <button 
      className={styles.cardBtn} 
      onClick={() => setShowAddTenantModal(true)}>
       Add New Tenant
      </button>

       <button
          className={styles.cardBtn}
          onClick={() => setShowModal(true)}
        >
          Add New Unit
        </button>
  </div>

  <div className={styles.availabilityCard}>
    <h3 className={styles.cardTitle}>AVAILABILITY</h3>
    
    <div className={styles.statusRow}>
      <span>OCCUPIED</span>
      <span>- {occupiedCount}</span>
    </div>

    <div className={styles.statusRow}>
      <span>VACANT</span>
      <span>- {vacantCount}</span>
    </div>

    <hr className={styles.cardDivider} />

    <p className={styles.maintenanceText}>MAINTENANCE</p>
  </div>
</div>


      </section>

      <section className={styles.lipanampesa}>
        <h1>Lipa Na Mpesa </h1>

      </section>

      <section className={styles.recentpayments}>

      </section>

      {/* // add unit modal  */}
          <AddUnitModal isOpen={showModal} onClose={() => setShowModal(false)} />

       {/*  add tenant modal  */}

       <AddTenantModal isOpen={showAddTenantModal} onClose={() => setShowAddTenantModal(false)} />
    
    </div>
    
  );
};

export default DashboardHome;

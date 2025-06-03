
'use client';
import React, { useState } from 'react';
import StatCard from '@/components/statcards/statcard';
import {FaDoorOpen, FaMoneyBill, FaDownload} from 'react-icons/fa';
import axios from "axios";
import styles from './layout.module.css'

const DashboardHome = () => {
  const nextRentDue = 115000;
  const [paymentType, setPaymentType] = useState('full');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [amount, setAmount] = useState(nextRentDue);

const [isLoading, setIsLoading] = useState(false);
const [feedback, setFeedback] = useState("");

  const handleToggle = (type) => {
    setPaymentType(type);
    setAmount(type === 'full' ? nextRentDue : '');
  };

const MakePayment = async () => {
  if (!mpesaNumber || mpesaNumber.length < 10) {
    setFeedback("Enter a valid M-Pesa number");
    return;
  }

  const finalAmount = paymentType === "full" ? nextRentDue : parseFloat(amount);

  if (paymentType === "partial" && (!amount || isNaN(finalAmount) || finalAmount <= 0)) {
    setFeedback("Enter a valid partial amount");
    return;
  }

  setIsLoading(true);
  setFeedback("Triggering STK Push...");

  try {
    // Extract token and user from localStorage
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user?.id) {
      setFeedback("User not authenticated");
      setIsLoading(false);
      return;
    }

    const res = await axios.post(
      "http://localhost:4000/payment/stkpush",
      {
        phone: mpesaNumber,
        amount: finalAmount,
        tenant_id: user.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (res.data?.success) {
      setFeedback("✅ STK Push sent! Check your phone.");
    } else {
      setFeedback("❌ Payment failed: " + (res.data?.message || "Unknown error"));
    }
  } catch (error) {
    console.error("STK Push error:", error);
    if (error.response?.status === 401) {
      setFeedback("Unauthorized. Please log in again.");
    } else {
      setFeedback("❌ Payment error. Try again.");
    }
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div>

      {/* header secttion with the page title */}
      <header className={styles.header}>
          <h3 className={styles.unittitle}>Tenanz Apartments - Unit No: A028</h3>
      </header>
  
      {/* quick stats section  */}
      <section>
      <div className={styles.statcards}>
            <StatCard title="Total rent Paid"
            value="200,000" 
            description = "since 12/07/2025" 
            icon={<FaMoneyBill sx={{ fontSize: 60, color: '#052560' }}/>} 
            />


            <StatCard title="Duration of Stay"
             value="15"
             description = "" 
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


    {/* this section has the lipa na mpesa input for rent partial/full payments */}
      <section className={styles.lipanampesa}>
      <div className={styles.card}>
        <h3 className={styles.heading}>Make payment</h3>

        <div className={styles.toggleGroup}>
          <button
            className={`${styles.toggleButton} ${paymentType === 'full' ? styles.active : ''}`}
            onClick={() => handleToggle('full')}
          >
            full payment
          </button>
          <button
            className={`${styles.toggleButton} ${paymentType === 'partial' ? styles.active : ''}`}
            onClick={() => handleToggle('partial')}
          >
            partial payment
          </button>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Mpesa No. 254722356677"
            value={mpesaNumber}
            onChange={(e) => setMpesaNumber(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.input}
            disabled={paymentType === 'full'}
          />
        </div>

        <button
          className={styles.payButton}
          onClick={MakePayment}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Pay"}
        </button>
      </div>

      </section>


      {/* Payment historyis displayed here.  */}
      <section className={styles.recentpayments}>
      <div className={styles.card}>
  <h3 className={styles.historyHeading}>payment history</h3>
  <table className={styles.historyTable}>
    <thead>
      <tr>
        <th>#</th>
        <th>Reference code</th>
        <th>amount</th>
        <th>phone</th>
        <th>date</th>
        <th>receipt</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>MKXIXB56L99</td>
        <td>15,000</td>
        <td>07100200300</td>
        <td>12/12/2022</td>
        <td className={styles.receiptIcon}><FaDownload /></td>
      </tr>
      <tr>
        <td>2</td>
        <td>MKXIXB56M01</td>
        <td>15,000</td>
        <td>07100200300</td>
        <td>12/01/2023</td>
        <td className={styles.receiptIcon}><FaDownload /></td>
      </tr>
      <tr>
        <td>3</td>
        <td>MKXIXB56X55</td>
        <td>12,000</td>
        <td>07100200300</td>
        <td>04/01/2024</td>
        <td className={styles.receiptIcon}><FaDownload /></td>
      </tr>
    </tbody>
  </table>
</div>

      </section>
    </div>
  );
};

export default DashboardHome;


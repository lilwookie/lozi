import { useEffect, useState } from 'react';
import styles from './step.module.css';
import axiosClient from '@/utils/axiosClient';

export default function Step5_AssignLandlord({ formData, setFormData }) {
  const [landlords, setLandlords] = useState([]);
  const [agents, setAgents] = useState([]);

  console.log(styles.formGroup);


  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const resLandlord = await axiosClient.get('/landlord/getall');
        const resAgent = await axiosClient.get('/agent/getall');
        setLandlords(resLandlord.data);
        setAgents(resAgent.data);

       console.log("Landlords fetched:", resLandlord.data); // 👈 Log here
      console.log("Agents fetched:", resAgent.data);       // Optional
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchPeople();
  }, []);

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>Step 5: Assign Landlord & Agent</h2>

      <div className={styles.formGroup}>
        <label>Assign Landlord *</label>
        <select
          value={formData.landlord_id || ''}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              landlord_id: parseInt(e.target.value),
            }))
          }
        >
          <option value="">-- Select Landlord --</option>
          {landlords.map((landlord) => (
            <option key={landlord.id} value={landlord.id}>
              {landlord.full_name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Assign Agent *</label>
        <select
          value={formData.agent_id || ''}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              agent_id: parseInt(e.target.value),
            }))
          }
        >
          <option value="">-- Select Agent --</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.full_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

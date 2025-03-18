// src/components/SalesRepList.js

import React, { useEffect, useState } from 'react';
import { getSalesReps } from '../services/salesRepService';

const SalesRepList = () => {
  const [salesReps, setSalesReps] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch sales reps when the component mounts
    const fetchSalesReps = async () => {
      try {
        const repsData = await getSalesReps();
        setSalesReps(repsData);
      } catch (err) {
        setError('Failed to load sales representatives.');
      }
    };

    fetchSalesReps();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Sales Representatives</h2>
      {salesReps.length === 0 ? (
        <p>No sales representatives available.</p>
      ) : (
        <ul>
          {salesReps.map((rep) => (
            <li key={rep._id}>
              <strong>{rep.name}</strong> - {rep.email} (Leads Assigned: {rep.assignedLeads})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SalesRepList;

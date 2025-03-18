// src/components/LeadList.js

import React, { useEffect, useState } from 'react';
import { getLeads } from '../services/leadService';

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch leads when the component mounts
    const fetchLeads = async () => {
      try {
        const leadsData = await getLeads();
        setLeads(leadsData);
      } catch (err) {
        setError('Failed to load leads.');
      }
    };

    fetchLeads();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Leads List</h2>
      {leads.length === 0 ? (
        <p>No leads available.</p>
      ) : (
        <ul>
          {leads.map((lead) => (
            <li key={lead._id}>
              <strong>{lead.name}</strong> - {lead.email} - {lead.source} (Score: {lead.score})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LeadList;

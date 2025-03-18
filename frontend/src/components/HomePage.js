import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h2>Welcome to AI Lead Management System</h2>
      <nav>
        <ul>
          <li>
            <Link to="/leads">Capture a Lead</Link> {/* Link to Lead Form */}
          </li>
          <li>
            <Link to="/assigned-leads">View Assigned Leads</Link> {/* Link to Assigned Leads */}
          </li>
          <li>
            <Link to="/leads-list">View All Leads</Link> {/* Link to Lead List */}
          </li>
          <li>
            <Link to="/sales-reps">View Sales Representatives</Link> {/* Link to Sales Rep List */}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;

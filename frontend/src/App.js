import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LeadForm from './components/LeadForm';
import LeadList from './components/LeadList';         // Import LeadList component
import SalesRepList from './components/SalesRepList';  // Import SalesRepList component

const App = () => {
  const [leads, setLeads] = useState([]);

  // Function to add new lead to the list
  const addLead = (newLead) => {
    setLeads((prevLeads) => [...prevLeads, newLead]);
  };

  return (
    <Router>
      <div>
        <Routes>
          {/* HomePage Route */}
          <Route path="/" element={<HomePage />} />

          {/* LeadForm Route */}
          <Route path="/leads" element={<LeadForm addLead={addLead} />} /> {/* Pass addLead function to LeadForm */}

          {/* LeadList Route */}
          <Route path="/leads-list" element={<LeadList leads={leads} />} /> {/* Pass leads state to LeadList */}

          {/* SalesRepList Route */}
          <Route path="/sales-reps" element={<SalesRepList />} /> {/* SalesRepList Route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

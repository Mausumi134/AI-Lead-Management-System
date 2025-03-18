import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LeadForm from './components/LeadForm';
import LeadList from './components/LeadList';         // Import LeadList component
import SalesRepList from './components/SalesRepList';  // Import SalesRepList component

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* HomePage Route */}
          <Route path="/" element={<HomePage />} />

          {/* LeadForm Route */}
          <Route path="/leads" element={<LeadForm />} />

          {/* LeadList Route */}
          <Route path="/leads-list" element={<LeadList />} /> {/* Added LeadList Route */}

          {/* SalesRepList Route */}
          <Route path="/sales-reps" element={<SalesRepList />} /> {/* Added SalesRepList Route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

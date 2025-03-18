import React, { useState } from 'react';
import { showToast } from './Notification';  // Adjust the path to where Notification.js is located
  // Ensure this path is correct

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: '',
    comments: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation and other actions
    showToast('Lead successfully captured!', 'success');
  };

  return (
    <div>
      <h2>Capture a Lead</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Lead Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Phone"
        />
        <input
          type="text"
          name="source"
          value={formData.source}
          onChange={(e) => setFormData({ ...formData, source: e.target.value })}
          placeholder="Source"
        />
        <textarea
          name="comments"
          value={formData.comments}
          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
          placeholder="Comments"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeadForm;

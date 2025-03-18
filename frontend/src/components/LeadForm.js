import React, { useState } from 'react';
import axios from 'axios';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: '',
    comments: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset the error and success messages
    setError(null);
    setSuccess('');

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.source) {
      setError('All fields are required!');
      return;
    }

    // If comments are provided, trim them and validate length
    if (formData.comments && formData.comments.length > 500) {
      setError('Comments cannot exceed 500 characters');
      return;
    }

    setLoading(true);

    try {
      // Post data to backend API
      const response = await axios.post('http://localhost:3000/api/leads', formData);
      setSuccess('Lead captured and submitted successfully!');
      console.log(response.data);
    } catch (err) {
      console.error('Error response:', err.response);
      setError('Error submitting lead: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lead-form-container">
      <h2>Capture a Lead</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={10}
            pattern="[0-9]{10}"
          />
        </div>

        <div className="form-group">
          <label htmlFor="source">Source</label>
          <select
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
          >
            <option value="">Select Source</option>
            <option value="Website">Website</option>
            <option value="Email">Email</option>
            <option value="Social Media">Social Media</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="comments">Comments</label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            maxLength={500}
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Lead'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;

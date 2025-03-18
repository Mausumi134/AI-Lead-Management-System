// src/services/leadService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';  // Update with your backend URL

// Fetch all leads
export const getLeads = async () => {
  try {
    const response = await axios.get(`${API_URL}/leads`);
    return response.data;
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
};

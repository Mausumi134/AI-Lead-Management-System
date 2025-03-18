// src/services/salesRepService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';  // Update with your backend URL

// Fetch all sales reps
export const getSalesReps = async () => {
  try {
    const response = await axios.get(`${API_URL}/salesreps`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sales reps:', error);
    throw error;
  }
};

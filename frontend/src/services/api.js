// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Replace with your backend URL

// API call to capture a lead
export const captureLead = async (leadData) => {
  try {
    const response = await axios.post(`${API_URL}/leads`, leadData);
    return response.data;
  } catch (error) {
    console.error('Error capturing lead:', error);
    throw error;
  }
};

// API call to fetch all leads
export const getLeads = async () => {
  try {
    const response = await axios.get(`${API_URL}/leads`);
    return response.data;
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
};

// API call to fetch assigned leads
export const getAssignedLeads = async () => {
  try {
    const response = await axios.get(`${API_URL}/assigned-leads`);
    return response.data;
  } catch (error) {
    console.error('Error fetching assigned leads:', error);
    throw error;
  }
};

// API call to fetch sales representatives
export const getSalesReps = async () => {
  try {
    const response = await axios.get(`${API_URL}/salesreps`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sales reps:', error);
    throw error;
  }
};

// API call to add a new sales representative
export const addSalesRep = async (repData) => {
  try {
    const response = await axios.post(`${API_URL}/salesreps`, repData);
    return response.data;
  } catch (error) {
    console.error('Error adding sales rep:', error);
    throw error;
  }
};

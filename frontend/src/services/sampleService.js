// src/services/userService.js
import axiosClient from '../utils/axiosClient';

const getAllSamples = async () => {
  const response = await axiosClient.get('/samples/');
  return response.data;
};

const getSampleById = async (id) => {
  const response = await axiosClient.get(`/samples/${id}/`);
  return response.data;
};

const createSample = async (sampleData) => {
  const response = await axiosClient.post('/samples/', sampleData);
  return response.data;
};

const updateSample = async (id, sampleData) => {
  const response = await axiosClient.put(`/samples/${id}/`, sampleData);
  return response.data;
};

const deleteSample = async (id) => {
  const response = await axiosClient.delete(`/samples/${id}/`);
  return response.data;
};

export default {
  getAllSamples,
  getSampleById,
  createSample,
  updateSample,
  deleteSample,
};

// src/services/userService.js
import axiosClient from '../utils/axiosClient';

export const getAllSamples = async (params) => {
  const response = await axiosClient.get(`/samples?${params.toString()}`);
  return response.data;
};

export const getSampleById = async (id) => {
  const response = await axiosClient.get(`/samples/${id}/`);
  return response.data;
};

export const createSample = async (sampleData) => {
  const response = await axiosClient.post('/samples/', sampleData);
  return response.data;
};

export const updateSample = async (id, sampleData) => {
  const response = await axiosClient.patch(`/samples/${id}/`, sampleData);
  return response.data;
};

export const deleteSample = async (id) => {
  const response = await axiosClient.delete(`/samples/${id}/`);
  return response.data;
};

// Sample Types
export const getSampleTypes = async () => {
  const res = await axiosClient.get('/sample-types');
  return res.data;
}

export const createSampleType = async (sampleTypeDate) => {
  const response = await axiosClient.post(`/sample-types/`, sampleTypeDate);
  return response.data;
}

export const deleteSampleType = async (id) => {
  const response = await axiosClient.delete(`/sample-types/${id}/`);
  return response.data;
}

export const editSampleType = async (id, sampleTypeData) => {
  const res = await axiosClient.patch(`/sample-types/${id}/`, sampleTypeData);
  return res.data;
}

export const getSampleTypeById = async (id) => {
  const res = await axiosClient.get(`sample-types/${id}`);
  return res.data;
}

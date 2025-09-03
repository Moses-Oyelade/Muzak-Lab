// src/services/patientService.js
import axiosClient from '../utils/axiosClient';

const getAllPatients = async () => {
  const response = await axiosClient.get('/patients/');
  return response.data;
};

const getPatientById = async (id) => {
  const response = await axiosClient.get(`/patients/${id}/`);
  return response.data;
};

const createPatient = async (patientData) => {
  const response = await axiosClient.post('/Patients/', patientData);
  return response.data;
};

const updatePatient = async (id, patientData) => {
  const response = await axiosClient.put(`/patients/${id}/`, patientData);
  return response.data;
};

const deletePatient = async (id) => {
  const response = await axiosClient.delete(`/patients/${id}/`);
  return response.data;
};

export default {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};

// src/services/patientService.js
import axiosClient from '../utils/axiosClient';


const patientService = {
  getAllPatients: async (params) => {
    // const query = new URLSearchParams(params).toString();
    const res = await axiosClient.get(`/patients?${params.toString()}`);
    return res.data;
  },

  getPatientById: async (id) => {
    const response = await axiosClient.get(`/patients/${id}/`);
    return response.data;
  },

  createPatient: async (patientData) => {
    const response = await axiosClient.post('/Patients/', patientData);
    return response.data;
  },

  updatePatient: async (id, patientData) => {
    const response = await axiosClient.patch(`/patients/${id}/`, patientData);
    return response.data;
  },

  deletePatient: async (id) => {
    const response = await axiosClient.delete(`/patients/${id}/`);
    return response.data;
  }
}

export default patientService;

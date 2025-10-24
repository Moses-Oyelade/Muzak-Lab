// src/services/userService.js
import axiosClient from '../utils/axiosClient';

export const getAllHistory = async (params) => {
  const response = await axiosClient.get(`/status-history?${params.toString()}`);
  return response.data;
};

export const getReportSummary = async () => {
  const response = await axiosClient.get(`/report-summary`);
  return response.data;
};

export const getHistoryById = async (id) => {
  const response = await axiosClient.get(`/status-history/${id}/`);
  return response.data;
};

export const deleteHistory = async (id) => {
  const response = await axiosClient.delete(`/status-history/${id}/`);
  return response.data;
};


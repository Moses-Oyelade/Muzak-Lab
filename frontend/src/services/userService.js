// src/services/userService.js
import axiosClient from '../utils/axiosClient';

const getAllUsers = async () => {
  const response = await axiosClient.get('/users/');
  return response.data;
};

const getUserById = async (id) => {
  const response = await axiosClient.get(`/users/${id}/`);
  return response.data;
};

const createUser = async (userData) => {
  const response = await axiosClient.post('/users/', userData);
  return response.data;
};

const updateUser = async (id, userData) => {
  const response = await axiosClient.put(`/users/${id}/`, userData);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axiosClient.delete(`/users/${id}/`);
  return response.data;
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

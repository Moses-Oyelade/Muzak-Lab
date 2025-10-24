// src/services/userService.js
import axiosClient from '../utils/axiosClient';


export const getAllUsers = async () => {
  const response = await axiosClient.get('/users/');
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axiosClient.get(`/users/${id}/`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axiosClient.post('/users/create/', userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axiosClient.patch(`/users/${id}/`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axiosClient.delete(`/users/${id}/`);
  return response.data;
};

import axiosClient from '../utils/axiosClient';

const setTokens = (access, refresh) => {
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
};

const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const login = async (username, password) => {
  const { data } = await axiosClient.post('/token/', { username, password });
  setTokens(data.access, data.refresh);
  return data;
};

export const logout = () => {
  clearTokens();
};

export const getAccessToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');

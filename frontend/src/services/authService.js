import axiosClient from '../utils/axiosClient';

const setTokens = (access, refresh) => {
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
};

const setRole = (role) => {
  localStorage.setItem('userRole', role);
}

const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userRole');
};

export const login = async (username, password) => {
  const { data } = await axiosClient.post('/token/', { username, password });
  setTokens(data.access, data.refresh);
  if (data.role) {
    setRole(data.role);
  }
  return data;
};

export const logout = () => {
  clearTokens();
};

export const getAccessToken = () => localStorage.getItem('accessToken');
export const getUserRole = () => localStorage.getItem('userRole');
export const getRefreshToken = () => localStorage.getItem('refreshToken');

import axiosClient from '../utils/axiosClient';

const setTokens = (access, refresh) => {
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
};

const setRole = (role) => {
  localStorage.setItem('role', role);
}

const setUserName = (username) => {
  localStorage.setItem('username', username)
}

const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('role');
  localStorage.removeItem('username');

};

export const login = async (username, password) => {
  const { data } = await axiosClient.post('/token/', { username, password });
  setTokens(data.access, data.refresh);
  if (data.role) {
    setRole(data.role);
  }
  if (data.username) {
    setUserName(data.username);
  }
  return data;
};

export const logout = () => {
  clearTokens();
};

export const getAccessToken = () => localStorage.getItem('accessToken');
export const getUserRole = () => localStorage.getItem('role');
export const getUserName = () => localStorage.getItem('username');
export const getRefreshToken = () => localStorage.getItem('refreshToken');

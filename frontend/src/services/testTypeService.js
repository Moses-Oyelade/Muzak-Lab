import axiosClient from "../utils/axiosClient";

export const getTestTypes = async () => {
  const res = await axiosClient.get('/test-types');
  return res.data;
}

export const createTestType = async (testDate) => {
  const response = await axiosClient.post(`/test-types/`, testDate);
  return response.data;
}

export const deleteTestType = async (id) => {
  const response = await axiosClient.delete(`/test-types/${id}/`);
  return response.data;
}

export const updateTestType = async (id, testData) => {
  const res = await axiosClient.patch(`/test-types/${id}/`, testData);
  return res.data;
}

export const getTestTypeById = async (id) => {
  const res = await axiosClient.get(`test-types/${id}`);
  return res.data;
}
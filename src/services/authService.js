import axiosInstance from '../api/axiosInstance';

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Login failed' };
  }
};

export const registerUser = async (name, email, password, role) => {
  try {
    const response = await axiosInstance.post('/auth/register', { name, email, password, role });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Registration failed' };
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
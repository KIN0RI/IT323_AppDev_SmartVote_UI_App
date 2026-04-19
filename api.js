import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// ⚠️ Change this to your computer's local IP address
// Run 'ipconfig' in terminal and look for IPv4 Address
// Example: http://192.168.1.5:8000/api
const BASE_URL = 'http://192.168.1.5:8000/api';

const api = axios.create({ baseURL: BASE_URL });

// Attach token automatically to every request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto logout on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default api;
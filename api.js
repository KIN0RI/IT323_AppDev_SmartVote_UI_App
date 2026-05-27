import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Replace with your Render URL after backend is deployed
const BASE_URL = 'https://it323-appdev-smartvote-fastapi.onrender.com/api';

const api = axios.create({ baseURL: BASE_URL });


api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
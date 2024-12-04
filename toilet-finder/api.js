import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to include Authorization token
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for response handling, including token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
        const { token } = response.data;
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Authentication functions
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await api.post('/signup', { name, email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login';
};

// Toilets functions
export const createToilet = async (toiletData) => {
  try {
    const response = await api.post('/toilets', toiletData);
    return response.data;
  } catch (error) {
    console.error('Error creating toilet:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getAllToilets = async () => {
  try {
    const response = await api.get('/toilets');
    return response.data;
  } catch (error) {
    console.error('Error fetching toilets:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getToilet = async (id) => {
  try {
    const response = await api.get(`/toilets/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching toilet:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateToilet = async (id, toiletData) => {
  try {
    const response = await api.put(`/toilets/${id}`, toiletData);
    return response.data;
  } catch (error) {
    console.error('Error updating toilet:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteToilet = async (id) => {
  try {
    const response = await api.delete(`/toilets/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting toilet:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default api;

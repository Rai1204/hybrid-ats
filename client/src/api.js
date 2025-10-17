import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'https://hybrid-ats.onrender.com' });

export function setAuth(token){
  API.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
}

export default API;

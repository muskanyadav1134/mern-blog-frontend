import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mern-blog-backend.onrender.com/api',
  withCredentials: true,
});

export default instance;

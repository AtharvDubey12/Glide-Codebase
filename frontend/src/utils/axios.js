import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000', // your backend URL
  withCredentials: true, // this allows sending/receiving cookies
});

export default instance;
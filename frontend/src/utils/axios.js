import axios from 'axios';

const instance = axios.create({
  baseURL: `${API_URL}`, // your backend URL
  withCredentials: true, // this allows sending/receiving cookies
});

export default instance;
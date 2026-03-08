import axios from 'axios';

const serverRequest = axios.create({
  baseURL: '/api/v1',
});

export default serverRequest;

import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', //URL do backend
  withCredentials: true, //envia o cookie em toda requisição
});

export default api;
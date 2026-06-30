import axios from "axios";

const api = axios.create({
  baseURL: 'https://trabalho-devweb-production.up.railway.app/api/v1', //URL do backend
  withCredentials: true, //envia o cookie em toda requisição
});

export default api;
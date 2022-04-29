import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
})

api.interceptors.request.use((config) => {
  config.headers = {
    authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
  return config
})

export default api

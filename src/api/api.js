import axios from "axios";

const api = axios.create({
  baseURL: "https://irrigation-api-tinogasta.herokuapp.com",
})

api.interceptors.request.use((config) => {
  config.headers = {
    authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
  return config
})

export default api

import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_APIBASEURL,
})

api.interceptors.request.use((config) => {
  config.headers = {
    authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
  return config
})

export default api

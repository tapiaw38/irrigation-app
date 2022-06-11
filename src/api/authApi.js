import axios from "axios";

const authApi = axios.create({
  baseURL: process.env.VUE_APP_APIBASEURL,
});

export default authApi;

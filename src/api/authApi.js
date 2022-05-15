import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:8000",//"https://irrigation-api-tinogasta.herokuapp.com",
});

export default authApi;

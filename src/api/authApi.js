import axios from "axios";

const authApi = axios.create({
  baseURL: "https://irrigation-api-tinogasta.herokuapp.com",//"http://localhost:8000",
});

export default authApi;

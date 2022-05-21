import axios from "axios";

const authApi = axios.create({
  baseURL: "https://irrigation-api-tinogasta.herokuapp.com",
});

export default authApi;

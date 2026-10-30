import axios from "axios";

const http = axios.create({
  baseURL: "https://dummyjson.com",
});

export default http;

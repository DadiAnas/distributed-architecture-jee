import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const CompteopsApi = axios.create({
  baseURL: "http://localhost:8086/",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export const  ClientApi = axios.create({
  baseURL: "http://localhost:8092/",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

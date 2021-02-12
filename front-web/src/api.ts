import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:8086/",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

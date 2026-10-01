import axios from "axios"


const axiosClient = axios.create({
  baseURL: "https://evohomeservicesapi.nepalausadhibank.com/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosClient
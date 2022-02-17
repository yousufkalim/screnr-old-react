// Init
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../config";

const api = async (method = "get", uri, body) => {
  // API Call
  const url = baseUrl + uri;
  const token = localStorage.getItem("token");
  axios.defaults.headers = {
    Authorization: `Bearer ${token}`,
  };
  return new Promise((resolve, reject) => {
    axios[method](url, body)
      .then((res) => resolve(res))
      .catch((err) => {
        // No internet
        if (err.toJSON().message === "Network Error") {
          toast.error("No Internet.");

          reject(err);
        } else if (err?.response?.status === 403) {
          localStorage.clear();
          window.location = "/home";
        } else {
          console.log("API Error --------> ", err.response?.data?.message);

          toast.error(err.response?.data?.message ?? "Something went wrong.");

          reject(err);
        }
      });
  });
};

// Export
export default api;

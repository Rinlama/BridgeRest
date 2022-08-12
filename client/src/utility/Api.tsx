import axios from "axios";

const Api = (token?: any) => {
  let api = axios.create({
    baseURL: "http://localhost:3002/api/v1",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  api.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

  api.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (
        error.response.status === 401 &&
        error.response.config.url != "/auth/login"
      ) {
        localStorage.removeItem("auth");
        window.location.href = "/auth/login";
        return;
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export default Api;

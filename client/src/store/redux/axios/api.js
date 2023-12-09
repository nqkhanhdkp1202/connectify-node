import axios from "axios";
import { store } from "../config/configRedux";
import { showToastNotification } from "../reducers/alertReducer";
import { logoutReady } from "../reducers/userReducer";

axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";

export const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});


(function () {
  let authToken = localStorage.getItem("token");
  if (authToken === "null" || authToken === null) {
    axios.defaults.headers.common.Authorization = null;
  } else {
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }
})();

API.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (er) {
    if (axios.isAxiosError(er)) {
      if (er.response) {
        if (er.response.status === 401 || er.response.status === 403) {
        }

        if (er.response.status === 410) {
          if (localStorage.getItem("refreshToken")) {
            store.dispatch(logoutReady("refresh"));
            const res = await PROMOTION_API.post(
              "/api/authenticate/refresh-token",
              {
                refreshToken: localStorage.getItem("refreshToken"),
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "x-access-refresh-token":
                    localStorage.getItem("refreshToken"),
                },
              }
            );
            if (res && res.data) {
              localStorage.setItem("token", res.data.data.token);
              localStorage.setItem("refreshToken", res.data.data.refreshToken);
              store.dispatch(updateUserToken(res.data.data.token));
              _socket.emit("loginSocial", {
                token: res.data.data.token,
              });
              setTimeout(() => {
                window.location.reload();
              }, 1000)
            } else {
              store.dispatch(logoutReady());
            }
          } else {
            store.dispatch(logoutReady());
          }
        }

        if (er.response.status === 411) {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          store.dispatch(logoutReady());
        }
      }

      if (er?.code === "ECONNABORTED" && er?.message.includes("timeout")) {
        store.dispatch(
          showToastNotification({
            type: "error",
            message:
              "Sorry for the inconvenience. The server is currently overloaded. Please try again later.",
          })
        );
        return Promise.reject(er?.message);
      }
    }
    return Promise.reject(er?.response?.data);

  }
);

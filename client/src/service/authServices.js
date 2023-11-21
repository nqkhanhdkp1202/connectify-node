import api from "../config/configApi";

const authServices = {
  login(data) {
    return api.post("/auth/login", data);
  },
  register(data) {
    return api.post("/auth/register", data);
  },
  refeshToken(data) {
    return api.post("/refresh-token", data);
  },
  updateProfile(data) {
    return api.post("/auth/update-profile", data);
  },
  getUserInfo(data) {
    return api.get("/auth/user-info", data);
  },
  uploadImage(data) {
    return api.post("/upload", data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  }
};

export default authServices;

import { API } from "../axios/api";

class UserService {
  async login(dataRequest) {
    const res = await API.post(
      "/auth/signIn",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }

  async register(dataRequest) {
    const res = await API.post(
      "/auth/signUp",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }

  async changePassword(dataRequest) {
    const res = await API.post(
      "/auth/changePassword",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dataRequest || localStorage.getItem("token")}`,
        },
      }
    );
    return res;
  }

  async userInfo(dataRequest) {
    const res = await API.get("/end-user/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  }

  async logout(dataRequest) {
    return true;
  }

  async editProfile(dataRequest) {
    const res = await API.post(
      "/end-user/edit-profile",
      dataRequest
    );
    return res;
  }

}

export default UserService;

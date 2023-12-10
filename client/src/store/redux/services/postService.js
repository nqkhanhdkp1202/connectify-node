import { API } from "../axios/api";

class PostService {
  async getAllPost(dataRequest) {
    const token = localStorage.getItem("token");
    const res = await API.get("/post", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || dataRequest}`,
      },
    });
    return res;
  }

  async createPost(dataRequest) {
    const token = localStorage.getItem("token");
    const res = await API.post("/post", dataRequest, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || dataRequest}`,
      },
    });
    return res;
  }
}

export default PostService;

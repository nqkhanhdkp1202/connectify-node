import api from "../config/configApi";

const authServices = {
    login(data) {
        return api.post('/auth/login', data)
    },
    register(data) {
        return api.post('/auth/register', data)
    },
    refeshToken(data) {
        return api.post('/refresh-token', data)
    }
}

export default authServices
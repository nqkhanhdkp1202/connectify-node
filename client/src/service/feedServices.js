import api from "../config/configApi";

const feedServices = {
    getListPosts(data) {
        return api.get('/feed/posts', data, (config) => {
            let token = localStorage.getItem('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config;
        }
        )
    },

    getPost(data) {
        return api.post('/auth/register', data, (config) => {
            let token = localStorage.getItem('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config;
        })
    },
    createPost(data) {
        return api.post('/refresh-token', data, (config) => {
            let token = localStorage.getItem('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config;
        })
    },
    updatePost(data) {
        return api.post('/refresh-token', data, (config) => {
            let token = localStorage.getItem('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config;
        })
    }
}

export default feedServices
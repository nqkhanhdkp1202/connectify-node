import axios from "axios";

// axios.defaults.baseURL = import.meta.env.REACT_APP_BASEURL

const api = axios.create({
    baseURL: "http://localhost:3000/"
})

api.interceptors.request.use((config) => {
    let token = localStorage.getItem('token')
    if (token !== '') {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


export default api
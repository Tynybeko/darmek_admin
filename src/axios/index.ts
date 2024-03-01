import axios from 'axios';

let URL = import.meta.env.VITE_PUBLIC_MY_BASE_URL
const API = axios.create({
    baseURL: URL + '/api/v1',
});





API.interceptors.request.use((request) => {
    let token = localStorage.getItem('token')
    if (request.headers) {
        if (token) {
            request.headers.Authorization = `Token ${token}`;
        }
    }
    return request;
});



API.interceptors.response.use((response) => {
    return Promise.resolve(response)
}, (error) => {
    if (error?.response && error.response.status == 401) {
        localStorage.removeItem('token')
        window.location.replace('/auth')
    }
    return Promise.reject(error)
});



export default API;

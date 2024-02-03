import axios, { AxiosError } from 'axios';

let URL = import.meta.env.VITE_PUBLIC_MY_BASE_URL
const instance = axios.create({
    baseURL: URL + '/api/v1',
});





instance.interceptors.request.use((request) => {
    let user = JSON.parse(localStorage.getItem('user') ?? '{}');

    if (request.headers) {
        // request.headers.Authorization = `Token ${user?.token}`   ;
    }
    return request;
});



export default instance;

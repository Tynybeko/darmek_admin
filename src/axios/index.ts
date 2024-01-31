import axios, { AxiosError } from 'axios';

let URL = import.meta.env.VITE_PUBLIC_MY_BASE_URL
const instance = axios.create({
    baseURL: URL + 'api/v1',
});


let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

const refreshToken = async () => {
    let user = JSON.parse(localStorage.getItem('user') ?? '{}');

    try {
        const { data } = await instance.post(
            'auth/refresh-token',
            { refresh_token: user?.refresh_token },
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (data) {
            return data;
        }
    } catch (e) {
        return Promise.reject(e);
    }
};

instance.interceptors.request.use((request) => {
    let user = JSON.parse(localStorage.getItem('user') ?? '{}');

    if (request.headers) {
        request.headers.Authorization = `Bearer ${user?.access_token}`;
    }
    return request;
});

instance.interceptors.response.use(
    (response) => {
        return Promise.resolve(response);
    },
    async (error: AxiosError) => {
        if (error.response && error.response.status === 401 && !isRefreshing) {
            isRefreshing = true;
            try {
                let user = JSON.parse(localStorage.getItem('user') ?? '{}');
                if (!refreshPromise) {
                    refreshPromise = await refreshToken();
                }
                const refreshedTokenData = await refreshPromise;

                if (refreshedTokenData) {
                    user = { ...user, ...refreshedTokenData };
                    localStorage.setItem('user', JSON.stringify(user));
                    if (error.config) {
                        error.config.headers.Authorization = `Bearer ${refreshedTokenData.access_token}`;
                        return instance.request(error.config);
                    }
                }
            } finally {
                isRefreshing = false;
                refreshPromise = null;
            }
        }
        return Promise.reject(error);
    }
);

export default instance;

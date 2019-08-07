import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/'
});

export const serverApi = {
    top20: () => api.get('api/top20')
};

export const nothing = null;

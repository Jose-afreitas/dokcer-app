const axios = require('axios');
const url = "http://localhost:3000/produtos";


axios.get(url).then(function (response) {
    console.log(response.data)
}).catch(function (error) {
    if (error) {
        console.log(error);
    }
})




















// import axios from 'axios';

// const api = axios.create({
//     baseURL: process.env.PUBLIC_URL,
// });

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');

//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     else delete config.headers.Authorization;

//     if (/\/graphql/.test(config.url as string)) {
//         config.headers['Content-Type'] = 'application/json';
//     }

//     return config;
// });

// api.interceptors.response.use(
//     (response) => {
//         if (/\/graphql/.test(response.config.url as string)) {
//             return {
//                 ...response,
//                 data: response.data.data,
//             };
//         }
//         return response;
//     },
//     (error) => Promise.reject(error),
// );

// export default api;
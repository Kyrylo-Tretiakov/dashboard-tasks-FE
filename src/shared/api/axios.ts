import axios from "axios";
import Router from "next/router";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// api.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response && error.response.status === 403) {
//             Router.push('/welcome');
//         }
//         return Promise.reject(error);
//     }
// );

export default api;

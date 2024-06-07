import axios from "axios";
import Cookies from 'js-cookie';

export const axios_client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
    headers: {
        "Content-Type": "application/json",
    },
});
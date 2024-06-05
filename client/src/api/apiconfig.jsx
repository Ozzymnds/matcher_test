import axios from "axios";

export const axios_client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
    headers: {
        "Content-Type": "application/json",
    },
});
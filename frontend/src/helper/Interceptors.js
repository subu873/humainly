import axios from "axios";
import { DELETE_COOKIE, GET_COOKIE } from "./commonFunction";
import { API_BASE_URL } from "./envConstants";

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

// Request Interceptor to attach headers, including Authorization token
const onRequest = (config) => {
    const accessToken = `Bearer ` + GET_COOKIE("Authorization");
    const headerParams = {
        Authorization: accessToken,
        "Content-Type": "application/json",
    };
    // Merge existing headers with our custom headers
    config.headers = Object.assign(headerParams, config.headers);
    return config;
};

// Request error handler
const onRequestError = (error) => {
    return Promise.reject(error);
};

// Response handler for success responses
const onResponse = (response) => {
    return response;
};

// Response error handler
const onResponseError = (error) => {
    if (error?.response?.status === 401) {
        console.log(" im inside the 401");
        DELETE_COOKIE("Authorization");
        DELETE_COOKIE("refresh_token");
        window.location.href = "/login"; // Use window.location to redirect
        console.log("Unauthorized access, redirecting to login...");
    }
    return Promise.reject(error);
};

// Adding interceptors to Axios instance
axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

// Exporting the Axios instance
export default {
    get: axiosInstance.get,
    post: axiosInstance.post,
    put: axiosInstance.put,
    delete: axiosInstance.delete,
    patch: axiosInstance.patch,
};

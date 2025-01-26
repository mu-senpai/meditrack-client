import axios from "axios";

export const useAxiosPublic = () => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:5000",
    });
    return axiosInstance;
};
import axios from "axios";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
    // const navigate = useNavigate();

    const axiosSecure = axios.create({
        baseURL: "http://localhost:5000", 
        withCredentials: true,
    });

    // useEffect(() => {
    //     axiosSecure.interceptors.request.use((config) => {
    //         const token = document.cookie
    //             .split('; ')
    //             .find((row) => row.startsWith('token='))
    //             ?.split('=')[1];

    //         if (token) {
    //             config.headers.Authorization = `Bearer ${token}`;
    //         }
    //         return config;
    //     });

    //     axiosSecure.interceptors.response.use(
    //         (response) => response,
    //         (error) => {
    //             if (error.response && error.response.status === 401) {
    //                 navigate("/login");
    //             }
    //             return Promise.reject(error);
    //         }
    //     );
    // }, [navigate, axiosSecure]);

    return axiosSecure;
};

export default useAxiosSecure;

import { RequestInit } from "next/dist/server/web/spec-extension/request";
import axios from "axios";
import ValidationError from "@/exceptions/validationError";

interface fetchProps {
    url : string,
    options? : RequestInit
}

const BASE_URL = 'http://localhost:8000/api/';

export const fetcher = ({ url , options = {} }: fetchProps) => {
    return fetch(`${BASE_URL}${url}` , options);
}

export const sendToApi = ({ url , options } : fetchProps) => {
    return fetch(`${BASE_URL}${url}` , {
        method : 'POST',
        headers : {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        },
        ...options
    })
}
export const callApi = () => {
    const axiosInstance = axios.create({
        baseURL : BASE_URL
    })

    axiosInstance.interceptors.request.use(
        (config) => {
            config.withCredentials = true;
            return config;
        },
        err => { throw err }
    )

    axiosInstance.interceptors.response.use(
        res => {
            return res;
        },
        err => {
            const res = err?.response
            if(res) {
                if(res.status === 422) {
                    throw new ValidationError(res.data.errors)
                }
            }


            throw err;
        }
    )

    return axiosInstance;
}
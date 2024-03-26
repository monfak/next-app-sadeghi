import { RequestInit } from "next/dist/server/web/spec-extension/request";

interface fetchProps {
    url : string,
    options? : RequestInit
}

const BASE_URL = 'http://127.0.0.1:8000/api/';

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
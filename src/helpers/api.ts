import { RequestInit } from "next/dist/server/web/spec-extension/request";

interface fetchProps {
    url : string,
    options? : RequestInit
}

const BASE_URL = 'http://localhost:5000/api/';

export const fetcher = ({ url , options = {} }: fetchProps) => {
    return fetch(`${BASE_URL}${url}` , options);
}


export const sendToApi = ({ url , options } : fetchProps) => {
    return fetch(`${BASE_URL}${url}` , {
        method : 'POST',
        credentials : 'include',
        headers : {
            "Content-Type" : "application/json"
        },
        ...options
    })
} 
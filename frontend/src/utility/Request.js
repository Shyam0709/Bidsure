import axios from "axios"

export const getauthaxios=()=>{
    const apiclient = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
    });
    
    return apiclient;
}

export const getaxios=()=>{
    const token = localStorage.getItem("token");
    const apiclient = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    return apiclient;
}

export const getformaxios=()=>{
    const token = localStorage.getItem("token");
    const apiclient = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 10000,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
    });

    return apiclient;
}
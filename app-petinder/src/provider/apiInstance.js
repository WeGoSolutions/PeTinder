import axios from "axios";

export const serviceID = import.meta.env.VITE_SERVICE_ID;
export const templateID = import.meta.env.VITE_TEMPLATE_ID;
export const publicKey = import.meta.env.VITE_PUBLIC_KEY;

export const url = axios.create({
    baseURL: import.meta.env.VITE_API_ADRESS,
});
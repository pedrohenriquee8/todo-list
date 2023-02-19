import axios from "axios";

export const BackendClient = axios.create({
    baseURL: "http://localhost:3000",
})
import axios from "axios";

export const BackendClient = axios.create({
    baseURL: "https://todo-list-json.onrender.com",
})
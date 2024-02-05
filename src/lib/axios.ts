import axios from "axios";


export const api = axios.create({
    baseURL:'http://35.247.217.209/api'
})
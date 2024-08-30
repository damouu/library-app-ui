import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080/',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials': true
    },
});

export default instance;
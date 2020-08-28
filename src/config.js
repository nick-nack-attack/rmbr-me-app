import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({path: path.join(__dirname, '../.env')});

const API_ENDPOINT = process.env.API_ENDPOINT;
const TOKEN_KEY = process.env.TOKEN_KEY;
const API_KEY = process.env.REACT_APP_API_KEY;

export {
    API_ENDPOINT,
    TOKEN_KEY,
    API_KEY
};

/*
export default {
    API_ENDPOINT: 'localhost:8000/api' | `https://glacial-ocean-65957.herokuapp.com/api`,
    TOKEN_KEY: 'rmbrme-client-auth-token',
    API_KEY: process.env.REACT_APP_API_KEY,
};
*/
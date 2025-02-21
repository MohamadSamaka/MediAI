import { setAccessToken } from '../../helpers/accessTokenManager.js';
import axiosInstance from './index.js';


export async function login(credentials) {
    axiosInstance.post('/auth/login', credentials, {
        withCredentials: true
    }).then((response) => {
        const accessToken = response.data.data.accessToken
        setAccessToken(accessToken)
    }).catch((error) => {
        console.error('Login error:', error.response ? error.response.data : error.message);
        throw error;

    })
}


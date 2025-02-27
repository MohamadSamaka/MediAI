<<<<<<< HEAD
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

=======
import { setAccessToken } from "../../helpers/accessTokenManager.js";
import axiosInstance from "./index.js";

export async function login(credentials) {
  try {
    const response = await axiosInstance.post("/auth/login", credentials, {
      withCredentials: true,
    });
    const accessToken = response.data.data.accessToken;
    setAccessToken(accessToken);
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    // Rethrow the error to be caught by a higher-level error handler
    throw new Error(
      error.response?.data?.message || "An error occurred during login"
    );
  }
}
>>>>>>> 3f3d0eedf098e2398cfbf1541f425ce098fb75c1

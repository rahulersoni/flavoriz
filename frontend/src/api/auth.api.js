
import api, {
    setAccessToken,
    clearAccessToken,
    refreshAccessToken,
} from "./axios.js";


// Register a new user.
export const registerUser = async (userData) => {
    const response = await api.post(
        "/auth/register",
        userData
    );

    return response.data;
};

// Verify user's email.
export const verifyEmail = async (verificationData) => {
    const response = await api.post(
        "/auth/verify-email",
        verificationData
    );

    return response.data;
};

// Login user.
export const loginUser = async (credentials) => {
    const response = await api.post(
        "/auth/login",
        credentials
    );

    const { accessToken } = response.data.data;

    setAccessToken(accessToken);

    return response.data;
};


// Restore or refresh an existing session.
export const refreshSession = async () => {
    return refreshAccessToken();
};

// // Restore or refresh an existing session.
// export const refreshSession = async () => {
//     const response = await api.post("/auth/refresh", {});

//     const { accessToken } = response.data.data;

//     setAccessToken(accessToken);

//     return response.data;
// };

// Get currently authenticated user.
export const getCurrentUser = async () => {
    const response = await api.get("/auth/me");

    return response.data;
};

// Logout user.
export const logoutUser = async () => {
    try {
        const response = await api.post("/auth/logout", {});

        return response.data;
    } finally {
        // Clear access token even if the logout request fails.
        clearAccessToken();
    }
};

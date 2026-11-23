
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// --------------------------------------------------
// In-memory authentication state
// --------------------------------------------------

let accessToken = null;
let csrfToken = null;

let csrfTokenPromise = null;
let refreshPromise = null;

export const setAccessToken = (token) => {
    accessToken = token;
};

export const clearAccessToken = () => {
    accessToken = null;
};

// --------------------------------------------------
// Axios instance
// --------------------------------------------------

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// --------------------------------------------------
// CSRF token management
// --------------------------------------------------

const fetchCsrfToken = async () => {
    const response = await axios.get(
        `${API_BASE_URL}/auth/csrf-token`,
        {
            withCredentials: true,
        }
    );

    const token = response.data?.data?.csrfToken;

    if (!token) {
        throw new Error("CSRF token missing from server response.");
    }

    csrfToken = token;

    return csrfToken;
};

const getCsrfToken = async () => {
    if (csrfToken) {
        return csrfToken;
    }

    if (!csrfTokenPromise) {
        csrfTokenPromise = fetchCsrfToken().finally(() => {
            csrfTokenPromise = null;
        });
    }

    return csrfTokenPromise;
};

const clearCsrfToken = () => {
    csrfToken = null;
};

// --------------------------------------------------
// Request interceptor
// --------------------------------------------------

api.interceptors.request.use(
    async (config) => {
        // Attach access token when available.
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        // CSRF protection is required for state-changing requests.
        const method = config.method?.toLowerCase();

        const requiresCsrf = ![
            "get",
            "head",
            "options",
        ].includes(method);

        if (requiresCsrf) {
            const token = await getCsrfToken();

            config.headers["X-CSRF-Token"] = token;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// --------------------------------------------------
// Authentication endpoint exclusions
// --------------------------------------------------

const excludedRefreshEndpoints = [
    "/auth/login",
    "/auth/register",
    "/auth/verify-email",
    "/auth/refresh",
    "/auth/logout",
    "/auth/csrf-token",
];

const shouldSkipRefresh = (url = "") => {
    return excludedRefreshEndpoints.some((endpoint) =>
        url.includes(endpoint)
    );
};

// --------------------------------------------------
// Refresh access token
// --------------------------------------------------

const refreshAccessToken = async () => {
    if (!refreshPromise) {
        refreshPromise = api
            .post("/auth/refresh", {})
            .then((response) => {
                const newAccessToken =
                    response.data?.data?.accessToken;

                if (!newAccessToken) {
                    throw new Error(
                        "Access token missing from refresh response."
                    );
                }

                setAccessToken(newAccessToken);

                return newAccessToken;
            })
            .finally(() => {
                refreshPromise = null;
            });
    }

    return refreshPromise;
};

// --------------------------------------------------
// Response interceptor
// --------------------------------------------------

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        const status = error.response?.status;
        const message = error.response?.data?.message || "";

        // Recover once if the CSRF token or session is stale.
        const isCsrfError =
            status === 403 &&
            /csrf/i.test(message);

        if (isCsrfError && !originalRequest._csrfRetry) {
            originalRequest._csrfRetry = true;

            try {
                clearCsrfToken();

                const newToken = await getCsrfToken();

                originalRequest.headers["X-CSRF-Token"] =
                    newToken;

                return api(originalRequest);
            } catch (csrfError) {
                return Promise.reject(csrfError);
            }
        }

        // Refresh only when an authenticated API request
        // receives 401.
        if (
            status !== 401 ||
            originalRequest._retry ||
            shouldSkipRefresh(originalRequest.url)
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            await refreshAccessToken();

            return api(originalRequest);
        } catch (refreshError) {
            clearAccessToken();

            window.dispatchEvent(
                new Event("auth:session-expired")
            );

            return Promise.reject(refreshError);
        }
    }
);

export default api;

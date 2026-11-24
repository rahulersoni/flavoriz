
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    loginUser,
    registerUser,
    verifyEmail,
    refreshSession,
    getCurrentUser,
    logoutUser,
} from "../api/auth.api.js";

import { clearAccessToken } from "../api/axios.js";

const AuthContext = createContext(null);

// Shared initialization promise prevents duplicate refresh requests
// when React StrictMode runs effects more than once.
let authInitializationPromise = null;

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authorization, setAuthorization] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = Boolean(user);
    const isAdmin = Boolean(authorization?.isAdmin);

    // Check whether the user has a specific permission.
    const can = useCallback(
        (permission) => {
            if (authorization?.isAdmin) {
                return true;
            }

            return authorization?.permissions?.includes(permission) ?? false;
        },
        [authorization]
    );

    // Check whether the user has at least one permission.
    const hasAnyPermission = useCallback(
        (permissions = []) => {
            return permissions.some((permission) => can(permission));
        },
        [can]
    );

    // Check whether the user has every permission.
    const hasAllPermissions = useCallback(
        (permissions = []) => {
            return permissions.every((permission) => can(permission));
        },
        [can]
    );

    // Retrieve current user and authorization information.
    const refreshUser = useCallback(async () => {
        const response = await getCurrentUser();

        const { user: currentUser, authorization: currentAuthorization } =
            response.data;

        setUser(currentUser);
        setAuthorization(currentAuthorization);

        return currentUser;
    }, []);

    // Login.
    const login = useCallback(async (credentials) => {
        await loginUser(credentials);

        return refreshUser();
    }, [refreshUser]);

    // Register.
    const register = useCallback(async (userData) => {
        return registerUser(userData);
    }, []);

    // Verify email.
    const verifyUser = useCallback(async (verificationData) => {
        return verifyEmail(verificationData);
    }, []);

    // Logout.
    const logout = useCallback(async () => {
        try {
            await logoutUser();
        } finally {
            clearAccessToken();
            setUser(null);
            setAuthorization(null);
        }
    }, []);

    // Restore session when the application starts.
    useEffect(() => {
        let isMounted = true;

        const initializeAuth = async () => {
            if (!authInitializationPromise) {
                authInitializationPromise = (async () => {
                    const accessToken = await refreshSession();

                    // No active session.
                    if (!accessToken) {
                        return null;
                    }

                    return getCurrentUser();
                })().finally(() => {
                    authInitializationPromise = null;
                });
            }

            try {
                const response = await authInitializationPromise;

                if (isMounted) {
                    if (response) {
                        setUser(response.data.user);
                        setAuthorization(response.data.authorization);
                    } else {
                        setUser(null);
                        setAuthorization(null);
                    }
                }
            } catch {
                clearAccessToken();

                if (isMounted) {
                    setUser(null);
                    setAuthorization(null);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        initializeAuth();

        return () => {
            isMounted = false;
        };
    }, []);

    // Handle session expiration from Axios.
    useEffect(() => {
        const handleSessionExpired = () => {
            clearAccessToken();
            setUser(null);
            setAuthorization(null);
        };

        window.addEventListener(
            "auth:session-expired",
            handleSessionExpired
        );

        return () => {
            window.removeEventListener(
                "auth:session-expired",
                handleSessionExpired
            );
        };
    }, []);

    const value = {
        user,
        authorization,
        isAuthenticated,
        isLoading,
        isAdmin,
        can,
        hasAnyPermission,
        hasAllPermissions,
        login,
        register,
        verifyUser,
        logout,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to access authentication context.
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider."
        );
    }

    return context;
}

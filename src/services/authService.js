import {
    registerUser,
    loginUser,
    getCurrentUser,
} from "../api/auth";


export const register = async (userData) => {

    const data = await registerUser(userData);

    return data;
};


export const login = async (credentials) => {

    const data = await loginUser(credentials);

    if (data.access) {
        localStorage.setItem(
            "access_token",
            data.access
        );
    }

    if (data.refresh) {
        localStorage.setItem(
            "refresh_token",
            data.refresh
        );
    }

    return data;
};


export const getUser = async () => {

    return await getCurrentUser();
};


export const logout = () => {

    localStorage.removeItem(
        "access_token"
    );

    localStorage.removeItem(
        "refresh_token"
    );
};


export const isAuthenticated = () => {

    return Boolean(
        localStorage.getItem(
            "access_token"
        )
    );
};
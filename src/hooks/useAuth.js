import { useState } from 'react';
import axios from 'axios';
import { User } from '../data/user'

import { backEndHost } from '../constants/api';

export const useAuthProvider = () => {

    const [authToken, setAuthToken] = useState('');
    const [isError, setIsError] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(new User());
    const [success, setSuccess] = useState(false)      //used to track registration success

    const axiosInstance = axios.create({
        baseURL: `${backEndHost}`,
        timeout: 90000,
        withCredentials: true,
        signal: new AbortController().signal
    });

    const loginUser = async (signInData, callback) => {
        try {
            setLoading(true);

            const { data } = await axiosInstance.post('/auth/login', signInData);

            setAuthToken(data?.authToken);
            setTimeout(() => callback(), 100);  // redirects the user after success login on server side
            setIsError('')

            return true;
        } catch (err) {
            setIsError(err.response?.data?.error ?? err.message);
            return false
        } finally {
            setLoading(false);
        }
    };

    const getUser = async () => {
        try {
            const { data } = await axiosInstance.get('/users/userinfo');

            setUser(data);
            setIsError('')

            return true;
        } catch (err) {
            setIsError(err.response?.data?.error ?? err.message);
            return false
        }
    };

    const logoutUser = async () => {
        try {
            setLoading(true);
            await axiosInstance.get('/auth/logout');
            setAuthToken('');
            setUser(new User())
            return true;
        } catch (err) {
            setIsError(err.response?.data?.error ?? err.message);
            return false
        } finally {
            setLoading(false);
        }
    };

    const registerUser = async (signUpData) => {
        try {
            setLoading(true);

            await axiosInstance.post('/users/register', signUpData);

            setSuccess(true);

            return true;

        } catch (err) {
            setIsError(err.response?.data?.error ?? err.message);
            return false
        } finally {
            setLoading(false);
        }
    };

    const refreshToken = async () => {
        try {
            setLoading(true);

            const { data } = await axiosInstance.post('/auth/refresh-token');

            setAuthToken(data.authToken);

            return data.authToken;
        } catch (err) {
            logoutUser();
            setIsError(err.response?.data?.error ?? err.message);
            return null
        } finally {
            setLoading(false);
        }
    }

    axiosInstance.interceptors.request.use(
        config => {
            if (!config?.headers?.Authorization && authToken) {
                config.headers.Authorization = `Bearer ${authToken}`;
            }
            return config;
        },

        error => Promise.reject(error)
    )

    axiosInstance.interceptors.response.use(
        response => response,
        async (err) => {
            const originalRequest = err?.config;

            if (err.response) {

                // Access Token has expired? Refresh the token
                if (err?.response?.status === 401 && !originalRequest?._retry && err?.response?.data?.error !== 'INVALID CREDENTIALS') {

                    originalRequest._retry = true;

                    try {

                        const newAccessToken = await refreshToken();
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                        return axiosInstance(originalRequest);
                    } catch (_error) {
                        if (_error.response && _error.response.data) {
                            return Promise.reject(_error.response.data);
                        }
                        return Promise.reject(_error);
                    }
                };
            }

            return Promise.reject(err);
        }
    );

    return {
        authToken,
        user,
        isError,
        loading,
        success,
        loginUser,
        logoutUser,
        registerUser,
        getUser,
        refreshToken,
        setSuccess,
    };
}
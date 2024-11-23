import React, { createContext, useState, useContext, useEffect } from 'react';
import { appwriteService } from '../services/appwrite';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

const AuthContext = createContext(null);

const AuthProviderContent = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const currentUser = await appwriteService.getCurrentUser();
            setUser(currentUser);
            setError(null);
        } catch (error) {
            console.error('Error checking user:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            await appwriteService.login(email, password);
            await checkUser();
            setError(null);
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password, name) => {
        setLoading(true);
        try {
            await appwriteService.createAccount(email, password, name);
            await login(email, password);
            setError(null);
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await appwriteService.logout();
            setUser(null);
            setError(null);
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        checkUser
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error && !user) {
        return (
            <div className="flex flex-1 justify-center items-center h-screen bg-white dark:bg-gray-900">
                <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg max-w-md">
                    <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
                        Authentication Error
                    </h3>
                    <p className="text-red-600 dark:text-red-300 mb-4">
                        {error.message || 'An error occurred during authentication'}
                    </p>
                    <button
                        onClick={checkUser}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const AuthProvider = ({ children }) => (
    <ErrorBoundary>
        <AuthProviderContent>{children}</AuthProviderContent>
    </ErrorBoundary>
);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../lib/appwrite';

interface User {
    $id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: any }>;
    signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
    signOut: () => Promise<{ error: any }>;
    signInWithGoogle: () => Promise<{ error: any }>;
    signInWithGithub: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    async function checkUser() {
        try {
            const { data } = await authService.getCurrentUser();
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    const signIn = async (email: string, password: string) => {
        const { error } = await authService.signIn(email, password);
        if (!error) {
            await checkUser();
        }
        return { error };
    };

    const signUp = async (email: string, password: string, name: string) => {
        const { error } = await authService.createAccount(email, password, name);
        if (!error) {
            await signIn(email, password);
        }
        return { error };
    };

    const signOut = async () => {
        const { error } = await authService.signOut();
        if (!error) {
            setUser(null);
        }
        return { error };
    };

    const signInWithGoogle = async () => {
        const { error } = await authService.signInWithGoogle();
        if (!error) {
            await checkUser();
        }
        return { error };
    };

    const signInWithGithub = async () => {
        const { error } = await authService.signInWithGithub();
        if (!error) {
            await checkUser();
        }
        return { error };
    };

    const value = {
        user,
        loading,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        signInWithGithub,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

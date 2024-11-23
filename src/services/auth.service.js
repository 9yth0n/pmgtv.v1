import { account } from '../config/appwrite';
import { ID } from 'appwrite';

class AuthService {
    async createAccount(email, password, name) {
        try {
            const user = await account.create(
                ID.unique(),
                email,
                password,
                name
            );
            return user;
        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            const session = await account.createEmailSession(email, password);
            return session;
        } catch (error) {
            throw error;
        }
    }

    async loginWithGoogle() {
        try {
            const session = await account.createOAuth2Session(
                'google',
                'http://localhost:3001/auth/callback',
                'http://localhost:3001'
            );
            return session;
        } catch (error) {
            throw error;
        }
    }

    async loginWithApple() {
        try {
            const session = await account.createOAuth2Session(
                'apple',
                'http://localhost:3001/auth/callback',
                'http://localhost:3001'
            );
            return session;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    async logout() {
        try {
            await account.deleteSession('current');
        } catch (error) {
            console.error('Error during logout:', error);
            throw error;
        }
    }
}

export const authService = new AuthService();

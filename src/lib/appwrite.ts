import { Account, Client, ID } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);

// Authentication functions
export const authService = {
    // Create a new account
    createAccount: async (email: string, password: string, name: string) => {
        try {
            const response = await account.create(
                ID.unique(),
                email,
                password,
                name
            );
            return { data: response, error: null };
        } catch (error) {
            return { data: null, error };
        }
    },

    // Sign in with email and password
    signIn: async (email: string, password: string) => {
        try {
            const response = await account.createEmailSession(email, password);
            return { data: response, error: null };
        } catch (error) {
            return { data: null, error };
        }
    },

    // Sign out
    signOut: async () => {
        try {
            await account.deleteSession('current');
            return { error: null };
        } catch (error) {
            return { error };
        }
    },

    // Get current user
    getCurrentUser: async () => {
        try {
            const response = await account.get();
            return { data: response, error: null };
        } catch (error) {
            return { data: null, error };
        }
    },

    // Reset password
    resetPassword: async (email: string) => {
        try {
            await account.createRecovery(
                email, 
                process.env.EXPO_PUBLIC_PASSWORD_RESET_URL!
            );
            return { error: null };
        } catch (error) {
            return { error };
        }
    },

    // OAuth providers
    signInWithGoogle: async () => {
        try {
            await account.createOAuth2Session('google');
            return { error: null };
        } catch (error) {
            return { error };
        }
    },

    signInWithGithub: async () => {
        try {
            await account.createOAuth2Session('github');
            return { error: null };
        } catch (error) {
            return { error };
        }
    }
};

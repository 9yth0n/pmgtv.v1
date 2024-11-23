import { account, databases, client } from '../config/appwrite';
import { ID } from 'appwrite';

class AppwriteService {
    // Authentication Methods
    async createAccount(email, password, name) {
        try {
            const response = await account.create(
                ID.unique(),
                email,
                password,
                name
            );
            return response;
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

    // Database Methods
    async createDocument(databaseId, collectionId, data, permissions = []) {
        try {
            return await databases.createDocument(
                databaseId,
                collectionId,
                ID.unique(),
                data,
                permissions
            );
        } catch (error) {
            console.error('Error creating document:', error);
            throw error;
        }
    }

    async listDocuments(databaseId, collectionId, queries = []) {
        try {
            return await databases.listDocuments(
                databaseId,
                collectionId,
                queries
            );
        } catch (error) {
            console.error('Error listing documents:', error);
            throw error;
        }
    }

    async updateDocument(databaseId, collectionId, documentId, data) {
        try {
            return await databases.updateDocument(
                databaseId,
                collectionId,
                documentId,
                data
            );
        } catch (error) {
            console.error('Error updating document:', error);
            throw error;
        }
    }

    async deleteDocument(databaseId, collectionId, documentId) {
        try {
            await databases.deleteDocument(
                databaseId,
                collectionId,
                documentId
            );
        } catch (error) {
            console.error('Error deleting document:', error);
            throw error;
        }
    }
}

export const appwriteService = new AppwriteService();
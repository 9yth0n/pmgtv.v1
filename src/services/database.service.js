import { databases } from '../config/appwrite';
import { ID, Query } from 'appwrite';

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const USERS_COLLECTION_ID = 'users';
const TRADING_HISTORY_COLLECTION_ID = 'trading_history';
const WATCHLIST_COLLECTION_ID = 'watchlist';

class DatabaseService {
    async createUserProfile(userId, userData) {
        try {
            return await databases.createDocument(
                DATABASE_ID,
                USERS_COLLECTION_ID,
                userId,
                {
                    userId,
                    name: userData.name,
                    email: userData.email,
                    preferences: {},
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }
            );
        } catch (error) {
            console.error('Error creating user profile:', error);
            throw error;
        }
    }

    async getUserProfile(userId) {
        try {
            return await databases.getDocument(
                DATABASE_ID,
                USERS_COLLECTION_ID,
                userId
            );
        } catch (error) {
            console.error('Error getting user profile:', error);
            throw error;
        }
    }

    async updateUserProfile(userId, updates) {
        try {
            return await databases.updateDocument(
                DATABASE_ID,
                USERS_COLLECTION_ID,
                userId,
                {
                    ...updates,
                    updatedAt: new Date().toISOString(),
                }
            );
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }

    async addToWatchlist(userId, symbol) {
        try {
            return await databases.createDocument(
                DATABASE_ID,
                WATCHLIST_COLLECTION_ID,
                ID.unique(),
                {
                    userId,
                    symbol,
                    addedAt: new Date().toISOString(),
                }
            );
        } catch (error) {
            console.error('Error adding to watchlist:', error);
            throw error;
        }
    }

    async getWatchlist(userId) {
        try {
            return await databases.listDocuments(
                DATABASE_ID,
                WATCHLIST_COLLECTION_ID,
                [Query.equal('userId', userId)]
            );
        } catch (error) {
            console.error('Error getting watchlist:', error);
            throw error;
        }
    }

    async removeFromWatchlist(watchlistId) {
        try {
            return await databases.deleteDocument(
                DATABASE_ID,
                WATCHLIST_COLLECTION_ID,
                watchlistId
            );
        } catch (error) {
            console.error('Error removing from watchlist:', error);
            throw error;
        }
    }

    async addTradeHistory(userId, tradeData) {
        try {
            return await databases.createDocument(
                DATABASE_ID,
                TRADING_HISTORY_COLLECTION_ID,
                ID.unique(),
                {
                    userId,
                    symbol: tradeData.symbol,
                    type: tradeData.type, // 'buy' or 'sell'
                    amount: tradeData.amount,
                    price: tradeData.price,
                    timestamp: new Date().toISOString(),
                    notes: tradeData.notes || '',
                }
            );
        } catch (error) {
            console.error('Error adding trade history:', error);
            throw error;
        }
    }

    async getTradeHistory(userId) {
        try {
            return await databases.listDocuments(
                DATABASE_ID,
                TRADING_HISTORY_COLLECTION_ID,
                [
                    Query.equal('userId', userId),
                    Query.orderDesc('timestamp')
                ]
            );
        } catch (error) {
            console.error('Error getting trade history:', error);
            throw error;
        }
    }
}

export const databaseService = new DatabaseService();

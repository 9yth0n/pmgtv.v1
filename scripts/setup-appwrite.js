const sdk = require('node-appwrite');

// Init SDK
const client = new sdk.Client();
const databases = new sdk.Databases(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const API_KEY = process.env.APPWRITE_API_KEY;

client
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

async function createCollections() {
    try {
        // Users Collection
        const usersCollection = await databases.createCollection(
            DATABASE_ID,
            'users',
            'Users Collection',
            ['role:member'],
            ['role:member']
        );

        // Create attributes for users collection
        await databases.createStringAttribute(
            DATABASE_ID,
            'users',
            'userId',
            255,
            true
        );
        await databases.createStringAttribute(
            DATABASE_ID,
            'users',
            'name',
            255,
            true
        );
        await databases.createEmailAttribute(
            DATABASE_ID,
            'users',
            'email',
            true
        );
        await databases.createJsonAttribute(
            DATABASE_ID,
            'users',
            'preferences',
            true,
            {
                defaultCurrency: 'USD',
                theme: 'dark',
                notifications: {
                    priceAlerts: true,
                    newsAlerts: true,
                    tradingUpdates: true
                },
                tradingPreferences: {
                    defaultLeverage: '1x',
                    riskLevel: 'medium',
                    tradingPairs: []
                }
            }
        );
        await databases.createDatetimeAttribute(
            DATABASE_ID,
            'users',
            'createdAt',
            true
        );
        await databases.createDatetimeAttribute(
            DATABASE_ID,
            'users',
            'updatedAt',
            true
        );

        // Create indexes for users collection
        await databases.createIndex(
            DATABASE_ID,
            'users',
            'userId_index',
            'key',
            ['userId'],
            ['userId']
        );
        await databases.createIndex(
            DATABASE_ID,
            'users',
            'email_index',
            'key',
            ['email'],
            ['email']
        );

        // Trading History Collection
        const tradingHistoryCollection = await databases.createCollection(
            DATABASE_ID,
            'trading_history',
            'Trading History Collection',
            ['role:member'],
            ['role:member']
        );

        // Create attributes for trading history collection
        await databases.createStringAttribute(
            DATABASE_ID,
            'trading_history',
            'userId',
            255,
            true
        );
        await databases.createStringAttribute(
            DATABASE_ID,
            'trading_history',
            'symbol',
            50,
            true
        );
        await databases.createStringAttribute(
            DATABASE_ID,
            'trading_history',
            'type',
            10,
            true
        );
        await databases.createFloatAttribute(
            DATABASE_ID,
            'trading_history',
            'amount',
            true
        );
        await databases.createFloatAttribute(
            DATABASE_ID,
            'trading_history',
            'price',
            true
        );
        await databases.createDatetimeAttribute(
            DATABASE_ID,
            'trading_history',
            'timestamp',
            true
        );
        await databases.createStringAttribute(
            DATABASE_ID,
            'trading_history',
            'notes',
            1000,
            false
        );

        // Create indexes for trading history collection
        await databases.createIndex(
            DATABASE_ID,
            'trading_history',
            'userId_timestamp_index',
            'key',
            ['userId', 'timestamp'],
            ['userId', 'timestamp']
        );
        await databases.createIndex(
            DATABASE_ID,
            'trading_history',
            'symbol_index',
            'key',
            ['symbol'],
            ['symbol']
        );

        // Watchlist Collection
        const watchlistCollection = await databases.createCollection(
            DATABASE_ID,
            'watchlist',
            'Watchlist Collection',
            ['role:member'],
            ['role:member']
        );

        // Create attributes for watchlist collection
        await databases.createStringAttribute(
            DATABASE_ID,
            'watchlist',
            'userId',
            255,
            true
        );
        await databases.createStringAttribute(
            DATABASE_ID,
            'watchlist',
            'symbol',
            50,
            true
        );
        await databases.createDatetimeAttribute(
            DATABASE_ID,
            'watchlist',
            'addedAt',
            true
        );

        // Create indexes for watchlist collection
        await databases.createIndex(
            DATABASE_ID,
            'watchlist',
            'userId_symbol_index',
            'unique',
            ['userId', 'symbol'],
            ['userId', 'symbol']
        );

        console.log('Successfully created all collections, attributes, and indexes');
    } catch (error) {
        console.error('Error creating collections:', error);
    }
}

createCollections();

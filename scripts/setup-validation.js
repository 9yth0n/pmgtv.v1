const { Client, Databases } = require('node-appwrite');
require('dotenv').config();

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

async function setupValidationRules() {
    try {
        // Users Collection Validation
        await databases.updateCollection(
            process.env.APPWRITE_DATABASE_ID,
            'users',
            {
                documentSecurity: true,
                permissions: ['read("user:{id}")'],
                enabled: true
            }
        );

        // User attributes validation
        await databases.updateStringAttribute(
            process.env.APPWRITE_DATABASE_ID,
            'users',
            'email',
            255,
            true,
            null,
            true,
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        );

        await databases.updateStringAttribute(
            process.env.APPWRITE_DATABASE_ID,
            'users',
            'name',
            100,
            true,
            null,
            true,
            '^[a-zA-Z0-9\\s]{2,}$'
        );

        // Trading History Collection Validation
        await databases.updateCollection(
            process.env.APPWRITE_DATABASE_ID,
            'trading_history',
            {
                documentSecurity: true,
                permissions: ['read("user:{userId}")'],
                enabled: true
            }
        );

        // Trading history attributes validation
        await databases.updateStringAttribute(
            process.env.APPWRITE_DATABASE_ID,
            'trading_history',
            'symbol',
            10,
            true,
            null,
            true,
            '^[A-Z]{1,5}$'
        );

        await databases.updateEnumAttribute(
            process.env.APPWRITE_DATABASE_ID,
            'trading_history',
            'type',
            ['BUY', 'SELL'],
            true,
            'BUY'
        );

        await databases.updateFloatAttribute(
            process.env.APPWRITE_DATABASE_ID,
            'trading_history',
            'amount',
            true,
            0.00000001,
            1000000000,
            0
        );

        await databases.updateFloatAttribute(
            process.env.APPWRITE_DATABASE_ID,
            'trading_history',
            'price',
            true,
            0.00000001,
            1000000000,
            0
        );

        // Watchlist Collection Validation
        await databases.updateCollection(
            process.env.APPWRITE_DATABASE_ID,
            'watchlist',
            {
                documentSecurity: true,
                permissions: ['read("user:{userId}")'],
                enabled: true
            }
        );

        // Watchlist attributes validation
        await databases.updateStringAttribute(
            process.env.APPWRITE_DATABASE_ID,
            'watchlist',
            'symbol',
            10,
            true,
            null,
            true,
            '^[A-Z]{1,5}$'
        );

        console.log('✅ Validation rules setup completed successfully');
    } catch (error) {
        console.error('❌ Error setting up validation rules:', error);
        process.exit(1);
    }
}

setupValidationRules();

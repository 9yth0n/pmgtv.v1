import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Home() {
    const { user, signOut } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome, {user?.name || 'Trader'}!</Text>
            <Text style={styles.subtitle}>Your trading dashboard is coming soon</Text>

            <View style={styles.stats}>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Active Trades</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>$0</Text>
                    <Text style={styles.statLabel}>Portfolio Value</Text>
                </View>
            </View>

            <TouchableOpacity 
                style={styles.button}
                onPress={signOut}
            >
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    welcome: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 30,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 40,
    },
    statCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        width: '45%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#007AFF',
    },
    statLabel: {
        fontSize: 16,
        color: '#666',
    },
    button: {
        backgroundColor: '#ff3b30',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

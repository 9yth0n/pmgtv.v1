import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { authService } from '../../lib/appwrite';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleResetPassword = async () => {
        if (!email) {
            setError('Please enter your email address');
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            const { error } = await authService.resetPassword(email);
            if (error) throw error;
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Failed to send reset password email');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Check Your Email</Text>
                <Text style={styles.message}>
                    We've sent password reset instructions to {email}
                </Text>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => router.replace('/sign-in')}
                >
                    <Text style={styles.buttonText}>Return to Sign In</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Enter your email to reset your password</Text>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
            />

            <TouchableOpacity 
                style={styles.button}
                onPress={handleResetPassword}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Send Reset Link</Text>
                )}
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Remember your password? </Text>
                <Link href="/sign-in" style={styles.link}>Sign In</Link>
            </View>
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
    title: {
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
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        maxWidth: 400,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    error: {
        color: '#ff3b30',
        marginBottom: 15,
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        marginTop: 30,
    },
    footerText: {
        color: '#666',
    },
    link: {
        color: '#007AFF',
        fontWeight: '600',
    },
});

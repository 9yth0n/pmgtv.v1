import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { createAccount } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            setError('');
            
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            if (password.length < 8) {
                setError('Password must be at least 8 characters long');
                return;
            }

            await createAccount(email, password, name);
            navigate('/login');
        } catch (error) {
            setError('Failed to create account. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            
            {error && <Text style={styles.error}>{error}</Text>}
            
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate('/login')}>
                <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#1a1b23',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#ffffff',
    },
    input: {
        backgroundColor: '#2a2b33',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        color: '#ffffff',
    },
    button: {
        backgroundColor: '#3b82f6',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    error: {
        color: '#ef4444',
        marginBottom: 10,
        textAlign: 'center',
    },
    link: {
        color: '#3b82f6',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default Register;

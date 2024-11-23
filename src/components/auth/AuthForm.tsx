import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';

interface AuthFormProps {
    mode: 'signin' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { signIn, signUp, signInWithGoogle, signInWithGithub } = useAuth();

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        
        try {
            if (mode === 'signin') {
                const { error } = await signIn(email, password);
                if (error) throw error;
            } else {
                const { error } = await signUp(email, password, name);
                if (error) throw error;
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            
            {mode === 'signup' && (
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />
            )}
            
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            
            <TouchableOpacity 
                style={styles.button}
                onPress={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>
                        {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                    </Text>
                )}
            </TouchableOpacity>

            <View style={styles.socialButtons}>
                <TouchableOpacity 
                    style={[styles.socialButton, styles.googleButton]}
                    onPress={signInWithGoogle}
                >
                    <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.socialButton, styles.githubButton]}
                    onPress={signInWithGithub}
                >
                    <Text style={styles.socialButtonText}>GitHub</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
        maxWidth: 400,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    button: {
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
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    socialButton: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    googleButton: {
        backgroundColor: '#DB4437',
    },
    githubButton: {
        backgroundColor: '#333',
    },
    socialButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

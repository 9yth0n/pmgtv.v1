import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from './common/LoadingSpinner';
import GoogleIcon from './icons/GoogleIcon';
import AppleIcon from './icons/AppleIcon';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        
        try {
            setError('');
            setIsLoading(true);
            await login(email, password);
        } catch (error) {
            setError('Failed to login. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading && <LoadingSpinner size="lg" />}
            
            <View style={styles.phoneContainer}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.logo}>PMGTV</Text>
                        <Text style={styles.subtitle}>Performance Market & Trading View</Text>
                    </View>

                    <View style={styles.mainContent}>
                        <View style={styles.formSection}>
                            {error && (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>{error}</Text>
                                </View>
                            )}
                            
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#666"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                            
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#666"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />

                            <TouchableOpacity
                                style={styles.forgotPassword}
                                onPress={() => {/* Handle forgot password */}}
                            >
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={handleLogin}
                            >
                                <Text style={styles.loginButtonText}>Sign In</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>or continue with</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <View style={styles.socialButtons}>
                            <TouchableOpacity style={styles.socialButton}>
                                <GoogleIcon size={24} />
                                <Text style={styles.socialButtonText}>Google</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.socialButton}>
                                <AppleIcon size={24} color="#FFF" />
                                <Text style={styles.socialButtonText}>Apple</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account? </Text>
                            <TouchableOpacity>
                                <Text style={styles.signUpText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
    },
    phoneContainer: {
        width: 700,
        height: 400,
        backgroundColor: '#242424',
        borderRadius: 40,
        overflow: 'hidden',
        position: 'relative',
        borderWidth: 2,
        borderColor: '#333',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 5,
    },
    content: {
        flex: 1,
        padding: 40,
        backgroundColor: '#242424',
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
        width: '100%',
    },
    logo: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#10b981',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    mainContent: {
        flex: 1,
        maxWidth: 400,
        alignSelf: 'center',
        width: '100%',
    },
    formSection: {
        marginBottom: 24,
        width: '100%',
    },
    input: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        color: '#fff',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#333',
        width: '100%',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: '#10b981',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#10b981',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
        width: '100%',
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#333',
    },
    dividerText: {
        color: '#999',
        paddingHorizontal: 16,
        fontSize: 14,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        gap: 16,
        width: '100%',
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: '#333',
        minWidth: 120,
    },
    socialButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    footerText: {
        color: '#999',
        fontSize: 14,
    },
    signUpText: {
        color: '#10b981',
        fontSize: 14,
        fontWeight: 'bold',
    },
    errorContainer: {
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#dc2626',
        width: '100%',
    },
    errorText: {
        color: '#dc2626',
        textAlign: 'center',
        fontSize: 14,
    }
});

export default Login;

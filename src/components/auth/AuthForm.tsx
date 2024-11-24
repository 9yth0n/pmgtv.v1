import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Platform,
    LayoutChangeEvent,
    Animated,
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import CountrySelector from './CountrySelector';

interface AuthFormProps {
    mode: 'signin' | 'signup';
}

interface Country {
    code: string;
    label: string;
    flag: string;
    dialCode: string;
}

const countryCodes: Country[] = [
    { 
        code: 'US', 
        label: 'United States',
        flag: '🇺🇸',
        dialCode: '+1'
    },
    { 
        code: 'GB', 
        label: 'United Kingdom',
        flag: '🇬🇧',
        dialCode: '+44'
    },
    { 
        code: 'IN', 
        label: 'India',
        flag: '🇮🇳',
        dialCode: '+91'
    }
];

const AuthForm = ({ mode }: AuthFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showCountrySelector, setShowCountrySelector] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
    const [selectorPosition, setSelectorPosition] = useState<{ x: number; y: number } | null>(null);
    
    const selectorRef = useRef(null);

    const inputScaleAnim = new Animated.Value(1);
    const buttonOpacityAnim = new Animated.Value(1);

    const handlePressIn = (anim: Animated.Value) => {
        Animated.spring(anim, {
            toValue: 0.97,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = (anim: Animated.Value) => {
        Animated.spring(anim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const measureSelectorPosition = () => {
        if (selectorRef.current) {
            selectorRef.current.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
                setSelectorPosition({
                    x: pageX,
                    y: pageY + height
                });
            });
        }
    };

    const { signIn, signUp, signInWithGoogle, signInWithApple } = useAuth();

    const formatPhoneNumber = (number: string, country: Country) => {
        const digits = number.replace(/\D/g, '');
        
        switch (country.code) {
            case 'US':
                if (digits.length === 0) return '';
                if (digits.length <= 3) return `(${digits}`;
                if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
                return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
            
            case 'GB':
                if (digits.length === 0) return '';
                if (digits.length <= 4) return digits;
                if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
                return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 11)}`;
            
            case 'IN':
                if (digits.length === 0) return '';
                if (digits.length <= 5) return digits;
                return `${digits.slice(0, 5)} ${digits.slice(5, 10)}`;

            case 'CA':
                return formatPhoneNumber(digits, { ...country, code: 'US' });

            case 'AU':
                if (digits.length === 0) return '';
                if (digits.length <= 4) return digits;
                return `${digits.slice(0, 4)} ${digits.slice(4, 8)}`;

            case 'DE':
                if (digits.length === 0) return '';
                if (digits.length <= 4) return digits;
                if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
                return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 11)}`;

            case 'FR':
                if (digits.length === 0) return '';
                if (digits.length <= 2) return digits;
                if (digits.length <= 4) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
                if (digits.length <= 6) return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4)}`;
                if (digits.length <= 8) return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6)}`;
                return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;

            default:
                if (digits.length === 0) return '';
                if (digits.length <= 4) return digits;
                if (digits.length <= 8) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
                return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8)}`;
        }
    };

    const getMaxLength = (country: Country) => {
        switch (country.code) {
            case 'US':
            case 'CA':
                return 10;
            case 'GB':
                return 11;
            case 'IN':
                return 10;
            case 'AU':
                return 8;
            case 'DE':
                return 11;
            case 'FR':
                return 10;
            default:
                return 12;
        }
    };

    const handlePhoneChange = (value: string) => {
        // Get the previous raw digits
        const prevDigits = phoneNumber.replace(/\D/g, '');
        
        // Get the new raw digits
        const newDigits = value.replace(/\D/g, '');
        
        // Check if we're deleting
        if (newDigits.length < prevDigits.length) {
            // If deleting and we're at a format boundary, delete the whole group
            const formatted = formatPhoneNumber(newDigits, selectedCountry);
            setPhoneNumber(formatted);
            return;
        }

        // Apply length limit based on country
        const maxLength = getMaxLength(selectedCountry);
        if (newDigits.length > maxLength) return;

        // Format the number
        const formatted = formatPhoneNumber(newDigits, selectedCountry);
        setPhoneNumber(formatted);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        
        try {
            if (mode === 'signin') {
                const { error } = await signIn(email, password);
                if (error) throw error;
            } else {
                const cleanPhone = phoneNumber.replace(/[^+\d]/g, '');
                const { error } = await signUp(email, password, name, cleanPhone);
                if (error) throw error;
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{mode === 'signin' ? 'Welcome Back' : 'Create Account'}</Text>
            
            {error && <Text style={styles.error}>{error}</Text>}

            <Animated.View style={[styles.inputContainer, { transform: [{ scale: inputScaleAnim }] }]}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="rgba(183, 138, 93, 0.5)"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => handlePressIn(inputScaleAnim)}
                    onBlur={() => handlePressOut(inputScaleAnim)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {mode === 'signup' && (
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="rgba(183, 138, 93, 0.5)"
                        value={name}
                        onChangeText={setName}
                        onFocus={() => handlePressIn(inputScaleAnim)}
                        onBlur={() => handlePressOut(inputScaleAnim)}
                    />
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="rgba(183, 138, 93, 0.5)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    onFocus={() => handlePressIn(inputScaleAnim)}
                    onBlur={() => handlePressOut(inputScaleAnim)}
                />

                {mode === 'signup' && (
                    <View style={styles.phoneContainer}>
                        <TouchableOpacity
                            ref={selectorRef}
                            style={styles.countrySelector}
                            onPress={() => {
                                measureSelectorPosition();
                                setShowCountrySelector(true);
                            }}
                        >
                            <View style={styles.countrySelectorContent}>
                                <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
                                <Text style={styles.countryCode}>{selectedCountry.dialCode}</Text>
                            </View>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.phoneInput}
                            placeholder="Phone Number"
                            placeholderTextColor="rgba(183, 138, 93, 0.5)"
                            value={phoneNumber}
                            onChangeText={handlePhoneChange}
                            keyboardType="phone-pad"
                        />
                    </View>
                )}
            </Animated.View>

            <Animated.View style={{ opacity: buttonOpacityAnim, width: '100%' }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={loading}
                    onPressIn={() => handlePressIn(buttonOpacityAnim)}
                    onPressOut={() => handlePressOut(buttonOpacityAnim)}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity
                style={styles.switchButton}
                onPress={() => mode === 'signin' ? 'signup' : 'signin'}
                disabled={loading}
            >
                <Text style={styles.switchButtonText}>
                    {mode === 'signin' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                </Text>
            </TouchableOpacity>

            <View style={styles.socialButtons}>
                <TouchableOpacity
                    style={[styles.socialButton, styles.googleButton]}
                    onPress={signInWithGoogle}
                    disabled={loading}
                    onPressIn={() => handlePressIn(buttonOpacityAnim)}
                    onPressOut={() => handlePressOut(buttonOpacityAnim)}
                >
                    <Ionicons name="logo-google" size={20} color="#B78A5D" style={styles.socialIcon} />
                    <Text style={styles.googleButtonText}>Sign in with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.socialButton, styles.appleButton]}
                    onPress={signInWithApple}
                    disabled={loading}
                    onPressIn={() => handlePressIn(buttonOpacityAnim)}
                    onPressOut={() => handlePressOut(buttonOpacityAnim)}
                >
                    <Ionicons name="logo-apple" size={20} color="#fff" style={styles.socialIcon} />
                    <Text style={styles.appleButtonText}>Sign in with Apple</Text>
                </TouchableOpacity>
            </View>

            <CountrySelector
                visible={showCountrySelector}
                onClose={() => setShowCountrySelector(false)}
                onSelect={(country) => {
                    setSelectedCountry(country);
                    setPhoneNumber('');
                    setShowCountrySelector(false);
                }}
                anchorPosition={selectorPosition}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 600,
        minHeight: 640,
        backgroundColor: '#232323',
        borderRadius: 35,
        padding: 40,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#B78A5D',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        gap: 15,
        marginBottom: 25,
    },
    input: {
        height: 48,
        backgroundColor: '#232323',
        borderRadius: 12,
        paddingHorizontal: 15,
        color: '#B78A5D',
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'rgba(183, 138, 93, 0.2)',
    },
    phoneContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    countrySelector: {
        width: 57,  // Increased from 50 to accommodate 2-digit codes
        height: 48,
        backgroundColor: '#232323',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(183, 138, 93, 0.2)',
    },
    countrySelectorContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    countryFlag: {
        fontSize: 16,
        marginRight: 4,
    },
    countryCode: {
        fontSize: 14,
        color: '#B78A5D',
    },
    phoneInput: {
        flex: 1,
        height: 48,
        backgroundColor: '#232323',
        borderRadius: 12,
        paddingHorizontal: 15,
        color: '#B78A5D',
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'rgba(183, 138, 93, 0.2)',
    },
    button: {
        height: 48,
        backgroundColor: '#B78A5D',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#0F0F0F',
        fontSize: 16,
        fontWeight: '600',
    },
    error: {
        color: '#ff6b6b',
        marginBottom: 15,
        textAlign: 'center',
    },
    switchButton: {
        marginVertical: 15,
    },
    switchButtonText: {
        color: '#B78A5D',
        fontSize: 14,
        textAlign: 'center',
    },
    socialButtons: {
        flexDirection: 'column',
        gap: 10,
        marginTop: 20,
        width: '100%',
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 12,
        height: 48,
    },
    socialIcon: {
        marginRight: 10,
    },
    googleButton: {
        backgroundColor: '#232323',
        borderWidth: 1,
        borderColor: 'rgba(183, 138, 93, 0.2)',
    },
    appleButton: {
        backgroundColor: '#232323',
        borderWidth: 1,
        borderColor: 'rgba(183, 138, 93, 0.2)',
    },
    googleButtonText: {
        color: '#B78A5D',
        fontSize: 16,
        fontWeight: '500',
    },
    appleButtonText: {
        color: '#B78A5D',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default AuthForm;

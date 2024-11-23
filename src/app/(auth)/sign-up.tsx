import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { AuthForm } from '../../components/auth/AuthForm';

export default function SignUp() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your trading journey</Text>
            
            <AuthForm mode="signup" />
            
            <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
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

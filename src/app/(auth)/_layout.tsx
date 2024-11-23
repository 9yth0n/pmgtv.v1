import { Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

export default function AuthLayout() {
    const { user } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const inAuthGroup = segments[0] === '(auth)';

        if (user && inAuthGroup) {
            // Redirect authenticated users away from auth screens
            router.replace('/');
        } else if (!user && !inAuthGroup) {
            // Redirect unauthenticated users to sign in
            router.replace('/sign-in');
        }
    }, [user, segments]);

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'fade',
            }}
        />
    );
}

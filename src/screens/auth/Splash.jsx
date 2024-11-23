import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import authService from '../../auth/services/auth.service';

const Splash = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Start fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Check authentication status
    const checkAuth = async () => {
      try {
        const user = await authService.getUserData();
        
        // Wait for animation to complete
        setTimeout(() => {
          if (user) {
            navigation.replace('MainTabs');
          } else {
            navigation.replace('Login');
          }
        }, 2000);
      } catch (error) {
        console.error('Auth check failed:', error);
        navigation.replace('Login');
      }
    };

    checkAuth();
  }, [navigation, fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image
          source={require('../../assets/logo.png')} // Add your logo image
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default Splash;

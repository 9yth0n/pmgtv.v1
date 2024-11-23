import React from 'react';
import { View } from 'react-native';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import BottomNav from '../BottomNav';

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginScreen = location.pathname === '/login';

  return (
    <View className="min-h-screen bg-background">
      {!isLoginScreen && <Header />}
      <View className="flex-1">
        {children}
      </View>
      {!isLoginScreen && <BottomNav />}
    </View>
  );
};

export default Layout;

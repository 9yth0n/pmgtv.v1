import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ChartBarIcon,
  BookOpenIcon,
  CalculatorIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Don't show navigation on login screen
  if (currentPath === '/login') {
    return null;
  }

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/markets', icon: ChartBarIcon, label: 'Markets' },
    { path: '/journal', icon: BookOpenIcon, label: 'Journal' },
    { path: '/compound', icon: CalculatorIcon, label: 'Compound' },
    { path: '/settings', icon: Cog6ToothIcon, label: 'Settings' }
  ];

  return (
    <View className="fixed bottom-0 left-0 right-0">
      <View 
        className="
          flex flex-row justify-around items-center
          px-6 py-4 mx-4 mb-8
          bg-black/80 backdrop-blur-lg
          rounded-2xl shadow-lg
          border border-white/10
        "
      >
        {navItems.map(({ path, icon: Icon, label }) => (
          <TouchableOpacity
            key={path}
            className={`
              relative px-5 py-2 rounded-xl
              transition-all duration-300 ease-in-out
              ${currentPath === path ? 'bg-emerald-500/10' : ''}
            `}
            onPress={() => navigate(path)}
          >
            <Icon
              className={`
                w-6 h-6 transition-all duration-300
                ${currentPath === path 
                  ? 'text-emerald-400 scale-110' 
                  : 'text-gray-400 hover:text-gray-300'
                }
              `}
              aria-hidden="true"
            />
            <View 
              className={`
                absolute -bottom-1 left-1/2 transform -translate-x-1/2
                w-1 h-1 rounded-full
                transition-all duration-300
                ${currentPath === path ? 'bg-emerald-400' : 'bg-transparent'}
              `}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BottomNav;

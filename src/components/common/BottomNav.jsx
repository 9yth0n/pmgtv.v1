import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { 
  House, 
  ChartLineUp, 
  ChartPieSlice,
  Bell,
  Newspaper,
  UserCircle
} from 'phosphor-react';

const BottomNav = ({ currentPage, onPageChange }) => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const menuItems = [
    { id: 'home', icon: House, label: 'Home' },
    { id: 'portfolio', icon: ChartPieSlice, label: 'Portfolio' },
    { id: 'markets', icon: ChartLineUp, label: 'Markets' },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
    { id: 'journal', icon: Newspaper, label: 'Journal' },
    { id: 'profile', icon: UserCircle, label: 'Profile' }
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        const isHovered = hoveredIcon === item.id;

        return (
          <Pressable
            key={item.id}
            style={[
              styles.iconContainer,
              isActive && styles.activeIcon,
              isHovered && styles.hoveredIcon
            ]}
            onPress={() => onPageChange(item.id)}
            onHoverIn={() => setHoveredIcon(item.id)}
            onHoverOut={() => setHoveredIcon(null)}
          >
            <Icon
              size={24}
              weight={isActive ? "fill" : "regular"}
              color={isActive || isHovered ? "#BAA489" : "#636363"}
            />
            <Text style={[
              styles.label,
              isActive && styles.activeLabel,
              isHovered && styles.hoveredLabel
            ]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 23, 29, 0.6)',
    backdropFilter: 'blur(20px)',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: 'rgba(42, 46, 57, 0.3)',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    maxWidth: '100%',
    width: '100%',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    transition: 'all 0.2s ease',
  },
  activeIcon: {
    transform: [{scale: 1.1}],
  },
  hoveredIcon: {
    transform: [{scale: 1.1}],
  },
  label: {
    fontSize: 12,
    color: '#636363',
    marginTop: 4,
    transition: 'all 0.2s ease',
  },
  activeLabel: {
    color: '#BAA489',
    fontWeight: '600',
  },
  hoveredLabel: {
    color: '#BAA489',
  }
});

export default BottomNav;

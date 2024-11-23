import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import { COLORS } from '../../../constants/theme';

const BottomNav = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'markets', label: 'Markets' },
    { id: 'watchlist', label: 'Watchlist' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            activeTab === tab.id && styles.activeTab
          ]}
          onPress={() => onTabPress(tab.id)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

BottomNav.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabPress: PropTypes.func.isRequired,
};

export default BottomNav;

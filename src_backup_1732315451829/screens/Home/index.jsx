import React from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from './styles';
import ChartWidget from '../../containers/TradingViewWidgets/ChartWidget';
import MarketOverview from '../../components/market/MarketOverview';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <ChartWidget />
      <MarketOverview />
    </ScrollView>
  );
};

export default HomeScreen;

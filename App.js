import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Platform } from 'react-native';
import { MagnifyingGlass } from '@phosphor-icons/react';
import TradingViewChart from './src/components/TradingViewChart';
import MarketOverview from './src/components/MarketOverview';
import MarketList from './src/components/Marketlist';

const POPULAR_PAIRS = [
  'BINANCE:BTCUSDT',
  'BINANCE:ETHUSDT',
  'BINANCE:BNBUSDT',
  'BINANCE:SOLUSDT',
  'BINANCE:DOGEUSDT',
  'BINANCE:ADAUSDT',
  'BINANCE:XRPUSDT',
  'BINANCE:DOTUSDT',
];

const TIMEFRAMES = [
  { label: '1m', value: '1' },
  { label: '5m', value: '5' },
  { label: '15m', value: '15' },
  { label: '30m', value: '30' },
  { label: '1h', value: '60' },
  { label: '4h', value: '240' },
  { label: '1D', value: 'D' },
  { label: '1W', value: 'W' },
];

export default function App() {
  const [symbol, setSymbol] = useState('BINANCE:BTCUSDT');
  const [inputSymbol, setInputSymbol] = useState('BINANCE:BTCUSDT');
  const [interval, setInterval] = useState('15');

  const handleSymbolChange = () => {
    setSymbol(inputSymbol.toUpperCase());
  };

  const handleQuickSelect = (pair) => {
    setSymbol(pair);
    setInputSymbol(pair);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={styles.input}
            value={inputSymbol}
            onChangeText={setInputSymbol}
            placeholder="Enter symbol (e.g., BINANCE:BTCUSDT)"
            placeholderTextColor="#666"
            autoCapitalize="characters"
          />
          <TouchableOpacity onPress={handleSymbolChange} style={styles.searchButton}>
            <MagnifyingGlass 
              size={24}
              color="#fff"
              weight="regular"
              style={{ 
                minWidth: 24, 
                minHeight: 24,
                strokeWidth: 2,
                stroke: "#fff",
                fill: "none"
              }}
            />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickSelectScroll}>
          {POPULAR_PAIRS.map((pair) => (
            <TouchableOpacity
              key={pair}
              style={[styles.quickSelectButton, symbol === pair && styles.quickSelectButtonActive]}
              onPress={() => handleQuickSelect(pair)}
            >
              <Text style={[styles.quickSelectText, symbol === pair && styles.quickSelectTextActive]}>
                {pair.replace('BINANCE:', '')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeframeScroll}>
          {TIMEFRAMES.map((tf) => (
            <TouchableOpacity
              key={tf.value}
              style={[styles.timeframeButton, interval === tf.value && styles.timeframeButtonActive]}
              onPress={() => setInterval(tf.value)}
            >
              <Text style={[styles.timeframeText, interval === tf.value && styles.timeframeTextActive]}>
                {tf.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.chartContainer}>
          <TradingViewChart symbol={symbol} interval={interval} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0E11',
  },
  container: {
    flex: 1,
    backgroundColor: '#0B0E11',
    ...(Platform.OS === 'web' ? {
      height: '100vh',
      width: '100vw',
    } : {}),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    color: '#fff',
    backgroundColor: '#1C2030',
  },
  searchButton: {
    backgroundColor: '#2962FF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickSelectScroll: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  quickSelectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1C2030',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#2962FF',
  },
  quickSelectButtonActive: {
    backgroundColor: '#2962FF',
  },
  quickSelectText: {
    color: '#fff',
    fontWeight: '600',
  },
  quickSelectTextActive: {
    color: '#fff',
  },
  timeframeScroll: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  timeframeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#1C2030',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#2962FF',
  },
  timeframeButtonActive: {
    backgroundColor: '#2962FF',
  },
  timeframeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  timeframeTextActive: {
    color: '#fff',
  },
  chartContainer: {
    flex: 1,
    ...(Platform.OS === 'web' ? {
      height: 'calc(100vh - 680px)',
    } : {})
  },
});

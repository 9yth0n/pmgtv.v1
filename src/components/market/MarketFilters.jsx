import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';

const exchanges = [
  { id: 'binance', name: 'Binance' },
  { id: 'coinbase', name: 'Coinbase' },
  { id: 'kraken', name: 'Kraken' },
  { id: 'kucoin', name: 'KuCoin' },
  { id: 'huobi', name: 'Huobi' },
  { id: 'ftx', name: 'FTX' },
];

const quoteCurrencies = [
  { id: 'usdt', symbol: 'USDT' },
  { id: 'usd', symbol: 'USD' },
  { id: 'btc', symbol: 'BTC' },
  { id: 'eth', symbol: 'ETH' },
];

const MarketFilters = ({ 
  selectedExchanges, 
  selectedQuotes,
  onExchangeChange,
  onQuoteChange,
  style 
}) => {
  const [showExchanges, setShowExchanges] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);

  const toggleExchanges = () => {
    setShowExchanges(!showExchanges);
    setShowQuotes(false);
  };

  const toggleQuotes = () => {
    setShowQuotes(!showQuotes);
    setShowExchanges(false);
  };

  const toggleExchange = (exchangeId) => {
    if (selectedExchanges.includes(exchangeId)) {
      onExchangeChange(selectedExchanges.filter(id => id !== exchangeId));
    } else {
      onExchangeChange([...selectedExchanges, exchangeId]);
    }
  };

  const toggleQuote = (quoteId) => {
    if (selectedQuotes.includes(quoteId)) {
      onQuoteChange(selectedQuotes.filter(id => id !== quoteId));
    } else {
      onQuoteChange([...selectedQuotes, quoteId]);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.filtersRow}>
        <TouchableOpacity 
          style={[
            styles.filterButton,
            showExchanges && styles.filterButtonActive
          ]} 
          onPress={toggleExchanges}
        >
          <Text style={styles.filterButtonText}>
            Exchanges ({selectedExchanges.length || 'All'})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.filterButton,
            showQuotes && styles.filterButtonActive
          ]} 
          onPress={toggleQuotes}
        >
          <Text style={styles.filterButtonText}>
            Quote ({selectedQuotes.length || 'All'})
          </Text>
        </TouchableOpacity>
      </View>

      {(showExchanges || showQuotes) && (
        <View style={styles.optionsContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.optionsScroll}
          >
            {showExchanges && exchanges.map(exchange => (
              <TouchableOpacity
                key={exchange.id}
                style={[
                  styles.optionButton,
                  selectedExchanges.includes(exchange.id) && styles.optionButtonSelected
                ]}
                onPress={() => toggleExchange(exchange.id)}
              >
                <Text style={[
                  styles.optionText,
                  selectedExchanges.includes(exchange.id) && styles.optionTextSelected
                ]}>
                  {exchange.name}
                </Text>
              </TouchableOpacity>
            ))}

            {showQuotes && quoteCurrencies.map(quote => (
              <TouchableOpacity
                key={quote.id}
                style={[
                  styles.optionButton,
                  selectedQuotes.includes(quote.id) && styles.optionButtonSelected
                ]}
                onPress={() => toggleQuote(quote.id)}
              >
                <Text style={[
                  styles.optionText,
                  selectedQuotes.includes(quote.id) && styles.optionTextSelected
                ]}>
                  {quote.symbol}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E222D',
    paddingVertical: 8,
  },
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#2A2E39',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  filterButtonActive: {
    backgroundColor: '#3772FF',
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionsScroll: {
    paddingHorizontal: 6,
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#2A2E39',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#2A2E39',
  },
  optionButtonSelected: {
    borderColor: '#3772FF',
    backgroundColor: '#3772FF20',
  },
  optionText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#3772FF',
  },
});

export default MarketFilters;

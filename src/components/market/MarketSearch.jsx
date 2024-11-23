import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import debounce from 'lodash/debounce';
import MarketFilters from './MarketFilters';

const RECENT_SEARCHES_KEY = '@recent_searches';
const FILTERS_KEY = '@market_filters';
const MAX_RECENT_SEARCHES = 5;
const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';
const BINANCE_API_BASE = 'https://api.binance.com/api/v3';

const popularPairs = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', binanceSymbol: 'BTCUSDT', exchanges: ['binance', 'coinbase', 'kraken'] },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', binanceSymbol: 'ETHUSDT', exchanges: ['binance', 'coinbase', 'kraken'] },
  { id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin', binanceSymbol: 'BNBUSDT', exchanges: ['binance'] },
  { id: 'solana', symbol: 'SOL', name: 'Solana', binanceSymbol: 'SOLUSDT', exchanges: ['binance', 'coinbase', 'kraken'] },
];

const MarketSearch = ({ onSelectPair, style }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedExchanges, setSelectedExchanges] = useState([]);
  const [selectedQuotes, setSelectedQuotes] = useState(['usdt']); // Default to USDT

  // Load saved filters and recent searches
  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const [savedSearches, savedFilters] = await Promise.all([
        AsyncStorage.getItem(RECENT_SEARCHES_KEY),
        AsyncStorage.getItem(FILTERS_KEY),
      ]);

      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
      if (savedFilters) {
        const { exchanges, quotes } = JSON.parse(savedFilters);
        setSelectedExchanges(exchanges);
        setSelectedQuotes(quotes);
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const saveFilters = async (exchanges, quotes) => {
    try {
      await AsyncStorage.setItem(FILTERS_KEY, JSON.stringify({
        exchanges,
        quotes,
      }));
    } catch (error) {
      console.error('Error saving filters:', error);
    }
  };

  const handleExchangeChange = (exchanges) => {
    setSelectedExchanges(exchanges);
    saveFilters(exchanges, selectedQuotes);
  };

  const handleQuoteChange = (quotes) => {
    setSelectedQuotes(quotes);
    saveFilters(selectedExchanges, quotes);
  };

  const saveRecentSearch = async (pair) => {
    try {
      const updatedSearches = [
        pair,
        ...recentSearches.filter((item) => item.id !== pair.id),
      ].slice(0, MAX_RECENT_SEARCHES);
      
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
      setRecentSearches(updatedSearches);
    } catch (error) {
      console.error('Error saving recent search:', error);
    }
  };

  const filterByExchangesAndQuotes = (results) => {
    return results.filter(coin => {
      // If no exchanges selected, show all
      const exchangeMatch = selectedExchanges.length === 0 || 
        (coin.exchanges && coin.exchanges.some(e => selectedExchanges.includes(e)));

      // If no quotes selected, show all
      const quoteMatch = selectedQuotes.length === 0 ||
        selectedQuotes.some(quote => {
          const upperQuote = quote.toUpperCase();
          return coin.binanceSymbol.endsWith(upperQuote) ||
                 coin.symbol.endsWith(upperQuote);
        });

      return exchangeMatch && quoteMatch;
    });
  };

  const searchCoinGecko = async (query) => {
    try {
      // Get exchanges data first
      const exchangesResponse = await fetch(
        `${COINGECKO_API_BASE}/exchanges/list`
      );
      
      if (!exchangesResponse.ok) {
        throw new Error('CoinGecko exchanges API error');
      }

      const exchangesData = await exchangesResponse.json();

      // Then search for coins
      const response = await fetch(
        `${COINGECKO_API_BASE}/search?query=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error('CoinGecko API error');
      }

      const data = await response.json();
      
      // Get detailed price data for the top 10 coins
      const topCoins = data.coins.slice(0, 10);
      const priceResponse = await fetch(
        `${COINGECKO_API_BASE}/simple/price?ids=${topCoins.map(c => c.id).join(',')}&vs_currencies=usd&include_24hr_change=true`
      );
      
      if (!priceResponse.ok) {
        throw new Error('CoinGecko price API error');
      }

      const priceData = await priceResponse.json();

      // Get tickers for exchange information
      const tickersPromises = topCoins.map(coin =>
        fetch(`${COINGECKO_API_BASE}/coins/${coin.id}/tickers`)
          .then(res => res.json())
          .catch(() => ({ tickers: [] }))
      );

      const tickersData = await Promise.all(tickersPromises);

      return topCoins.map((coin, index) => {
        // Get available exchanges for this coin
        const tickers = tickersData[index].tickers || [];
        const exchanges = [...new Set(tickers.map(t => t.market.identifier))];

        return {
          id: coin.id,
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          binanceSymbol: `${coin.symbol.toUpperCase()}USDT`,
          price: priceData[coin.id]?.usd.toFixed(2) || '0.00',
          priceChange: priceData[coin.id]?.usd_24h_change?.toFixed(2) || '0.00',
          thumb: coin.thumb,
          exchanges: exchanges,
        };
      });
    } catch (error) {
      console.error('CoinGecko API error:', error);
      throw error;
    }
  };

  const searchBinanceFallback = async (query) => {
    try {
      const response = await fetch(`${BINANCE_API_BASE}/ticker/24hr`);
      
      if (!response.ok) {
        throw new Error('Binance API error');
      }

      const data = await response.json();
      
      return data
        .filter(item => 
          item.symbol.toLowerCase().includes(query.toLowerCase())
        )
        .map(item => ({
          id: item.symbol.toLowerCase(),
          symbol: item.symbol.replace(/USDT|USD|BTC|ETH$/, ''),
          name: item.symbol.replace(/USDT|USD|BTC|ETH$/, ''),
          binanceSymbol: item.symbol,
          price: parseFloat(item.lastPrice).toFixed(2),
          priceChange: parseFloat(item.priceChangePercent).toFixed(2),
          exchanges: ['binance'],
        }))
        .slice(0, 10);
    } catch (error) {
      console.error('Binance API error:', error);
      throw error;
    }
  };

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query) {
        setSearchResults([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Try CoinGecko first
        let results = await searchCoinGecko(query);
        results = filterByExchangesAndQuotes(results);
        setSearchResults(results);
      } catch (error) {
        console.error('CoinGecko search failed, trying Binance:', error);
        try {
          // Fallback to Binance
          let binanceResults = await searchBinanceFallback(query);
          binanceResults = filterByExchangesAndQuotes(binanceResults);
          setSearchResults(binanceResults);
        } catch (binanceError) {
          console.error('Both APIs failed:', binanceError);
          setError('Search unavailable. Please try again later.');
          setSearchResults([]);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [selectedExchanges, selectedQuotes]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => debouncedSearch.cancel();
  }, [searchQuery, selectedExchanges, selectedQuotes]);

  const handleSelectPair = async (pair) => {
    await saveRecentSearch(pair);
    onSelectPair(pair);
    setSearchQuery('');
    setSearchResults([]);
  };

  const renderPairItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleSelectPair(item)}
    >
      {item.thumb && (
        <Image
          source={{ uri: item.thumb }}
          style={styles.coinIcon}
        />
      )}
      <View style={styles.symbolContainer}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>${item.price}</Text>
        <Text style={[
          styles.changeText,
          { color: parseFloat(item.priceChange) >= 0 ? '#00C087' : '#FF3B30' }
        ]}>
          {item.priceChange}%
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search cryptocurrencies..."
        placeholderTextColor="#666"
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <MarketFilters
        selectedExchanges={selectedExchanges}
        selectedQuotes={selectedQuotes}
        onExchangeChange={handleExchangeChange}
        onQuoteChange={handleQuoteChange}
      />
      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <FlatList
        data={searchResults.length > 0 
          ? searchResults 
          : searchQuery 
            ? [] 
            : recentSearches.length > 0 
              ? [...recentSearches, ...popularPairs.filter(
                  pair => !recentSearches.some(
                    recent => recent.id === pair.id
                  )
                )]
              : popularPairs
        }
        renderItem={renderPairItem}
        keyExtractor={(item) => item.id}
        style={styles.resultsList}
        ListHeaderComponent={
          !searchQuery && (
            <Text style={styles.sectionHeader}>
              {recentSearches.length > 0 ? 'Recent Searches' : 'Popular Pairs'}
            </Text>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E222D',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#2A2E39',
    color: '#FFFFFF',
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: 16,
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
  resultsList: {
    flex: 1,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2E39',
  },
  coinIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
  },
  symbolContainer: {
    flex: 1,
  },
  symbolText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  nameText: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  changeText: {
    fontSize: 14,
    marginTop: 2,
  },
  sectionHeader: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#1E222D',
  },
  loadingContainer: {
    padding: 15,
    alignItems: 'center',
  },
  loadingText: {
    color: '#666',
    fontSize: 14,
  },
  errorContainer: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#FF3B3020',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
  },
});

export default MarketSearch;

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Platform } from 'react-native';
import { useLocation } from 'react-router-dom';
import TradingViewChart from './components/TradingViewChart.web.jsx';
import { useExchangePairs } from './hooks/useExchangePairs';
import BottomNav from './components/BottomNav';
import MarketOverview from './components/MarketOverview';
import MarketData from './components/MarketData';
import { 
  MagnifyingGlassIcon, 
  XMarkIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';

export default function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}

function App() {
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [inputSymbol, setInputSymbol] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const { searchResults, loading, searchSymbols } = useExchangePairs();
  const dropdownRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const location = useLocation();

  // Don't show search on login or register pages
  const hideSearch = location?.pathname === '/login' || location?.pathname === '/register';

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSymbolChange = (selectedSymbol) => {
    setSymbol(selectedSymbol);
    setInputSymbol('');
    setShowDropdown(false);
  };

  const handleInputChange = (text) => {
    setInputSymbol(text);
    setShowDropdown(true);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      searchSymbols(text);
    }, 300);

    // Auto-select first result after typing
    if (inputSymbol && searchResults.length > 0) {
      handleSymbolChange(searchResults[0].symbol);
    }
  };

  const handleSubmit = () => {
    if (inputSymbol && searchResults.length > 0) {
      handleSymbolChange(searchResults[0].symbol);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'CRYPTO':
        return <CurrencyDollarIcon width={16} height={16} color="#B2B5BE" />;
      case 'CRYPTO_INDEX':
        return <ChartBarIcon width={16} height={16} color="#B2B5BE" />;
      case 'FOREX':
        return <GlobeAltIcon width={16} height={16} color="#B2B5BE" />;
      case 'STABLECOIN':
        return <ArrowTrendingUpIcon width={16} height={16} color="#00C853" />;
      default:
        return <ChartBarIcon width={16} height={16} color="#B2B5BE" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="flex flex-col h-screen">
        <SafeAreaView className="flex-1">
          <View className="flex-1 px-4 py-2">
            {!hideSearch && (
              <div className="relative mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <TextInput
                      className="w-full h-10 px-4 rounded-lg bg-surface border border-border text-text"
                      placeholder="Search Crypto, Stablecoins, and More..."
                      value={inputSymbol}
                      onChangeText={handleInputChange}
                      onKeyPress={handleKeyPress}
                      onFocus={() => {
                        setShowDropdown(true);
                        if (inputSymbol) {
                          searchSymbols(inputSymbol);
                        }
                      }}
                    />
                    {inputSymbol && (
                      <TouchableOpacity
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onPress={() => {
                          setInputSymbol('');
                          setShowDropdown(false);
                        }}
                      >
                        <XMarkIcon className="w-5 h-5 text-gray-500" />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity 
                      className="absolute right-10 top-1/2 transform -translate-y-1/2"
                      onPress={handleSubmit}
                    >
                      <MagnifyingGlassIcon 
                        width={20}
                        height={20}
                        color="#B2B5BE"
                        className="text-text"
                      />
                    </TouchableOpacity>
                  </div>
                </div>

                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-10 w-full mt-1 bg-surface border border-border rounded-lg shadow-lg"
                  >
                    {loading ? (
                      <div className="p-4 text-center">Searching symbols...</div>
                    ) : searchResults.length === 0 ? (
                      <div className="p-4 text-center text-text-secondary">
                        No symbols found
                      </div>
                    ) : (
                      <ScrollView className="max-h-64">
                        {searchResults.map((item) => (
                          <TouchableOpacity
                            key={item.symbol}
                            className="p-3 border-b border-border hover:bg-primary/10"
                            onPress={() => handleSymbolChange(item.symbol)}
                          >
                            <View className="flex items-center">
                              <View className="w-6 h-6 rounded-full bg-gray-200 mr-2">
                                {getTypeIcon(item.type)}
                              </View>
                              <Text className="text-text">{item.symbol}</Text>
                              {item.marketCapRank && (
                                <Text className="text-text-secondary">
                                  {' '}#{item.marketCapRank}
                                </Text>
                              )}
                              {item.type === 'STABLECOIN' && (
                                <Text className="text-green-500">
                                  {' '}STABLE
                                </Text>
                              )}
                            </View>
                            <Text className="text-text-secondary">{item.description}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    )}
                  </div>
                )}
              </div>
            )}
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <div className="space-y-4">
                      <MarketOverview />
                      <View className="chart-container">
                        <TradingViewChart symbol={symbol} />
                        <MarketData />
                      </View>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/markets"
                element={
                  <ProtectedRoute>
                    <div className="space-y-4">
                      <MarketData />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </View>
        </SafeAreaView>

        <BottomNav
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

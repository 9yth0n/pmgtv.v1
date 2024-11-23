import { useState, useCallback } from 'react';

// Market Type Definitions
const MARKET_TYPES = {
  CRYPTO_INDEX: 'Crypto Index',
  CRYPTO: 'Cryptocurrency',
  FOREX: 'Forex',
  COMMODITY: 'Commodity',
  STABLECOIN: 'Stablecoin'
};

const defaultPairs = [
  // Stablecoins
  { 
    symbol: 'USDT', 
    description: 'Tether USD', 
    type: 'STABLECOIN', 
    exchange: 'BINANCE',
    aliases: ['tether', 'usdt'],
    baseSymbol: 'USDT',
    pairs: ['USD', 'EUR', 'GBP'],
    exactMatch: true,
    searchPattern: /^(usdt|tether)$/i
  },
  { 
    symbol: 'USDC', 
    description: 'USD Coin', 
    type: 'STABLECOIN', 
    exchange: 'BINANCE',
    aliases: ['usdc', 'usd coin'],
    baseSymbol: 'USDC',
    pairs: ['USDT', 'USD', 'EUR']
  },
  { 
    symbol: 'BUSD', 
    description: 'Binance USD', 
    type: 'STABLECOIN', 
    exchange: 'BINANCE',
    aliases: ['busd', 'binance usd'],
    baseSymbol: 'BUSD',
    pairs: ['USDT', 'USD']
  },
  { 
    symbol: 'DAI', 
    description: 'Dai Stablecoin', 
    type: 'STABLECOIN', 
    exchange: 'BINANCE',
    aliases: ['dai', 'dai stablecoin'],
    baseSymbol: 'DAI',
    pairs: ['USDT', 'USD']
  },
  { 
    symbol: 'TUSD', 
    description: 'TrueUSD', 
    type: 'STABLECOIN', 
    exchange: 'BINANCE',
    aliases: ['tusd', 'true usd'],
    baseSymbol: 'TUSD',
    pairs: ['USDT', 'USD']
  },
  { 
    symbol: 'USDP', 
    description: 'Pax Dollar', 
    type: 'STABLECOIN', 
    exchange: 'BINANCE',
    aliases: ['usdp', 'pax', 'paxos'],
    baseSymbol: 'USDP',
    pairs: ['USDT', 'USD']
  },
  { 
    symbol: 'USD', 
    description: 'US Dollar', 
    type: 'FOREX', 
    exchange: 'FOREX',
    aliases: ['usd', 'dollar', 'us dollar'],
    baseSymbol: 'USD',
    exactMatch: true,
    searchPattern: /^(usd|dollar|us dollar)$/i
  },

  // Bitcoin Dominance
  {
    symbol: 'BTC.D',
    description: 'Bitcoin Dominance Index',
    type: 'CRYPTO_INDEX',
    exchange: 'CRYPTOCAP',
    aliases: ['btc.d', 'btcdom', 'bitcoin dominance'],
    baseSymbol: 'BTC.D',
    exactMatch: true,
    searchPattern: /^(btc\.d|btcdom|bitcoin\sdominance)$/i
  },
  {
    symbol: 'BTCDOMINATION',
    description: 'Bitcoin Market Dominance',
    type: 'CRYPTO_INDEX',
    exchange: 'BINANCE',
    aliases: ['btcdomination', 'btc dominance'],
    baseSymbol: 'BTCDOMINATION',
    exactMatch: true,
    searchPattern: /^(btcdomination|btc\sdominance)$/i
  },

  // Crypto Market Indices
  { 
    symbol: 'TOTAL', 
    description: 'Total Crypto Market Cap', 
    type: 'CRYPTO_INDEX',
    exchange: 'CRYPTOCAP',
    aliases: ['total', 'marketcap', 'totalcap'],
    baseSymbol: 'TOTAL',
  },
  { 
    symbol: 'TOTAL2', 
    description: 'Total Crypto Market Cap (excluding Bitcoin)', 
    type: 'CRYPTO_INDEX', 
    exchange: 'CRYPTOCAP',
    aliases: ['total2', 'altcoin', 'altcoincap']
  },
  { 
    symbol: 'TOTAL3', 
    description: 'Total Crypto Market Cap (excluding Bitcoin and Ethereum)', 
    type: 'CRYPTO_INDEX', 
    exchange: 'CRYPTOCAP',
    aliases: ['total3', 'altcoin2']
  },
  { 
    symbol: 'OTHERS.D', 
    description: 'Others Dominance', 
    type: 'CRYPTO_INDEX', 
    exchange: 'CRYPTOCAP',
    aliases: ['others', 'othersdominance']
  },
  
  // Common Forex Pairs
  { 
    symbol: 'EURUSD', 
    description: 'Euro / US Dollar', 
    type: 'FOREX', 
    exchange: 'FOREX',
    aliases: ['eurusd', 'euro']
  },
  { 
    symbol: 'GBPUSD', 
    description: 'British Pound / US Dollar', 
    type: 'FOREX', 
    exchange: 'FOREX',
    aliases: ['gbpusd', 'pound']
  },
  { 
    symbol: 'USDJPY', 
    description: 'US Dollar / Japanese Yen', 
    type: 'FOREX', 
    exchange: 'FOREX',
    aliases: ['usdjpy', 'yen']
  },
  { 
    symbol: 'AUDUSD', 
    description: 'Australian Dollar / US Dollar', 
    type: 'FOREX', 
    exchange: 'FOREX',
    aliases: ['audusd', 'aussie']
  },
  { 
    symbol: 'USDCAD', 
    description: 'US Dollar / Canadian Dollar', 
    type: 'FOREX', 
    exchange: 'FOREX',
    aliases: ['usdcad', 'loonie']
  },
  { 
    symbol: 'NZDUSD', 
    description: 'New Zealand Dollar / US Dollar', 
    type: 'FOREX', 
    exchange: 'FOREX',
    aliases: ['nzdusd', 'kiwi']
  },
  { 
    symbol: 'USDCHF', 
    description: 'US Dollar / Swiss Franc', 
    type: 'FOREX', 
    exchange: 'FOREX',
    aliases: ['usdchf', 'swissy']
  },

  // Commodities
  { 
    symbol: 'XAUUSD', 
    description: 'Gold / US Dollar', 
    type: 'COMMODITY', 
    exchange: 'FOREX',
    aliases: ['gold', 'xau', 'xauusd']
  },
  { 
    symbol: 'XAGUSD', 
    description: 'Silver / US Dollar', 
    type: 'COMMODITY', 
    exchange: 'FOREX',
    aliases: ['silver', 'xag', 'xagusd']
  }
];

const COMMON_QUOTE_CURRENCIES = ['USDT', 'USD', 'BTC', 'ETH'];
const EXCHANGES = ['BINANCE', 'COINBASE', 'KUCOIN'];

const createStablecoinPairs = (stablecoin) => {
  const pairs = [];
  const exchanges = ['BINANCE', 'COINBASE', 'KUCOIN'];
  
  // Add pairs for each quote currency
  stablecoin.pairs.forEach(quote => {
    pairs.push({
      symbol: `${stablecoin.baseSymbol}${quote}`,
      description: `${stablecoin.description} / ${quote}`,
      type: 'STABLECOIN',
      exchange: 'BINANCE',
      isStablecoin: true,
      marketCapRank: 1 // To keep stablecoins at top of results
    });
  });

  // Add exchange-specific pairs
  exchanges.forEach(exchange => {
    pairs.push({
      symbol: `${exchange}:${stablecoin.baseSymbol}USDT`,
      description: `${stablecoin.description} / USDT (${exchange})`,
      type: 'STABLECOIN',
      exchange,
      isStablecoin: true,
      marketCapRank: 1
    });
  });

  return pairs;
};

export const useExchangePairs = () => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(defaultPairs);
  const [geckoCache, setGeckoCache] = useState(new Map());

  const searchCoinGecko = useCallback(async (query) => {
    try {
      // Check cache first
      if (geckoCache.has(query.toLowerCase())) {
        return geckoCache.get(query.toLowerCase());
      }

      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error('CoinGecko API rate limit or error');
      }

      const data = await response.json();
      
      // Filter for coins ranked in top 2000 only
      const coins = data.coins
        .filter(coin => coin.market_cap_rank && coin.market_cap_rank <= 2000)
        .slice(0, 5)
        .map(coin => ({
          id: coin.id,
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          marketCapRank: coin.market_cap_rank,
          type: 'CRYPTO' // Explicitly mark as crypto
        }));

      // Cache the results
      setGeckoCache(prev => new Map(prev.set(query.toLowerCase(), coins)));

      return coins;
    } catch (error) {
      console.warn('CoinGecko API error:', error);
      return [];
    }
  }, [geckoCache]);

  const searchDefaultPairs = (query) => {
    const lowerQuery = query.toLowerCase().trim();
    return defaultPairs.filter(pair => {
      // For exact match pairs (like USDT, USD), use strict pattern matching
      if (pair.exactMatch && pair.searchPattern) {
        return pair.searchPattern.test(lowerQuery);
      }
      
      // For other pairs, use includes matching
      return (
        pair.symbol.toLowerCase().includes(lowerQuery) ||
        pair.description.toLowerCase().includes(lowerQuery) ||
        (pair.aliases && pair.aliases.some(alias => alias.includes(lowerQuery)))
      );
    });
  };

  const createDynamicPairs = useCallback(async (query) => {
    const upperQuery = query.toUpperCase();
    const pairs = [];

    // Don't create pairs for very short queries
    if (upperQuery.length < 2) return pairs;

    try {
      // First check default pairs (includes indices, forex, etc.)
      const defaultMatches = searchDefaultPairs(query);
      pairs.push(...defaultMatches);

      // Check for stablecoins
      const stablecoinMatch = defaultPairs.find(pair => 
        pair.type === 'STABLECOIN' && 
        (pair.aliases?.some(alias => alias.includes(query.toLowerCase())) ||
         pair.baseSymbol.toLowerCase() === query.toLowerCase())
      );

      if (stablecoinMatch) {
        const stablecoinPairs = createStablecoinPairs(stablecoinMatch);
        pairs.push(...stablecoinPairs);
      } else {
        // Only search CoinGecko if we don't have exact matches from default pairs
        const hasExactMatch = defaultMatches.some(match => 
          match.symbol.toLowerCase() === query.toLowerCase() ||
          (match.aliases && match.aliases.includes(query.toLowerCase()))
        );

        if (!hasExactMatch) {
          const geckoResults = await searchCoinGecko(query);
          
          if (geckoResults.length > 0) {
            geckoResults.forEach(coin => {
              // Skip if it's a stablecoin (we handle those separately)
              if (coin.symbol.toLowerCase() === 'usdt' || 
                  coin.symbol.toLowerCase() === 'usdc' ||
                  coin.symbol.toLowerCase() === 'busd' ||
                  coin.symbol.toLowerCase() === 'dai') {
                return;
              }

              // Create pairs with common quote currencies
              COMMON_QUOTE_CURRENCIES.forEach(quote => {
                const symbol = `${coin.symbol}${quote}`;
                pairs.push({
                  symbol,
                  description: `${coin.name} / ${quote}`,
                  type: 'CRYPTO',
                  id: coin.id,
                  marketCapRank: coin.marketCapRank
                });
              });

              // Add exchange variations
              EXCHANGES.forEach(exchange => {
                pairs.push({
                  symbol: `${exchange}:${coin.symbol}USDT`,
                  description: `${coin.name} / USDT (${exchange})`,
                  type: 'CRYPTO',
                  id: coin.id,
                  marketCapRank: coin.marketCapRank
                });
              });
            });
          }
        }
      }
    } catch (error) {
      console.error('Error creating pairs:', error);
    }

    return pairs;
  }, [searchCoinGecko]);

  const searchSymbols = useCallback(async (query) => {
    setLoading(true);
    const lowerQuery = query.toLowerCase().trim();

    try {
      if (!query) {
        setSearchResults(defaultPairs);
      } else {
        const pairs = [];

        // First check for exact matches using patterns
        const exactMatch = defaultPairs.find(pair => 
          pair.exactMatch && 
          pair.searchPattern && 
          pair.searchPattern.test(lowerQuery)
        );

        if (exactMatch) {
          if (exactMatch.type === 'STABLECOIN') {
            const stablecoinPairs = createStablecoinPairs(exactMatch);
            pairs.push(...stablecoinPairs);
          } else {
            pairs.push(exactMatch);
          }
        } else {
          // Skip USDT/USD partial matches unless they're exact
          const defaultMatches = searchDefaultPairs(query).filter(match => 
            !match.exactMatch || match.searchPattern.test(lowerQuery)
          );
          pairs.push(...defaultMatches);

          // Only search CoinGecko if we don't have good matches
          if (pairs.length === 0) {
            const geckoResults = await searchCoinGecko(query);
            
            if (geckoResults.length > 0) {
              geckoResults.forEach(coin => {
                // Skip if it's a stablecoin (we handle those separately)
                if (defaultPairs.some(p => 
                  p.type === 'STABLECOIN' && 
                  p.baseSymbol.toLowerCase() === coin.symbol.toLowerCase()
                )) {
                  return;
                }

                // Skip if it matches our exact match patterns
                const symbol = coin.symbol.toLowerCase();
                if (defaultPairs.some(p => 
                  p.exactMatch && 
                  p.searchPattern && 
                  p.searchPattern.test(symbol)
                )) {
                  return;
                }

                // Create pairs with common quote currencies
                COMMON_QUOTE_CURRENCIES.forEach(quote => {
                  pairs.push({
                    symbol: `${coin.symbol.toUpperCase()}${quote}`,
                    description: `${coin.name} / ${quote}`,
                    type: 'CRYPTO',
                    id: coin.id,
                    marketCapRank: coin.marketCapRank
                  });
                });

                // Add exchange variations
                EXCHANGES.forEach(exchange => {
                  pairs.push({
                    symbol: `${exchange}:${coin.symbol.toUpperCase()}USDT`,
                    description: `${coin.name} / USDT (${exchange})`,
                    type: 'CRYPTO',
                    id: coin.id,
                    marketCapRank: coin.marketCapRank
                  });
                });
              });
            }
          }
        }

        // Sort results
        const sortedResults = pairs.sort((a, b) => {
          // Sort by type priority
          const typeOrder = {
            'STABLECOIN': 0,
            'CRYPTO_INDEX': 1,
            'FOREX': 2,
            'COMMODITY': 3,
            'CRYPTO': 4
          };

          if (typeOrder[a.type] !== typeOrder[b.type]) {
            return typeOrder[a.type] - typeOrder[b.type];
          }

          // Then by market cap rank for crypto
          if (a.type === 'CRYPTO' && b.type === 'CRYPTO') {
            if (a.marketCapRank && b.marketCapRank) {
              return a.marketCapRank - b.marketCapRank;
            }
            if (a.marketCapRank) return -1;
            if (b.marketCapRank) return 1;
          }
          
          return 0;
        });

        // Remove duplicates
        const uniqueResults = Array.from(
          new Map(sortedResults.map(item => [item.symbol, item])).values()
        );

        setSearchResults(uniqueResults);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults(defaultPairs);
    } finally {
      setLoading(false);
    }
  }, [searchDefaultPairs, searchCoinGecko]);

  return {
    searchResults,
    loading,
    searchSymbols
  };
};

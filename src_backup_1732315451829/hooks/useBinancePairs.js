import { useState, useEffect } from 'react';

export const useBinancePairs = () => {
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPairs = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
        const data = await response.json();
        
        // Filter for USDT pairs and format them
        const usdtPairs = data.symbols
          .filter(symbol => symbol.status === 'TRADING' && symbol.quoteAsset === 'USDT')
          .map(symbol => ({
            symbol: `BINANCE:${symbol.symbol}`,
            baseAsset: symbol.baseAsset,
            quoteAsset: symbol.quoteAsset
          }))
          .sort((a, b) => a.symbol.localeCompare(b.symbol));

        setPairs(usdtPairs);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPairs();
  }, []);

  return { pairs, loading, error };
};

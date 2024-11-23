import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

const MarketData = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      {
        "colorTheme": "dark",
        "dateRange": "12M",
        "showChart": true,
        "locale": "en",
        "largeChartUrl": "",
        "isTransparent": true,
        "showSymbolLogo": true,
        "showFloatingTooltip": false,
        "width": "100%",
        "height": "500",
        "tabs": [
          {
            "title": "Crypto",
            "symbols": [
              {
                "s": "BINANCE:BTCUSDT",
                "d": "Bitcoin"
              },
              {
                "s": "BINANCE:ETHUSDT",
                "d": "Ethereum"
              },
              {
                "s": "BINANCE:BNBUSDT",
                "d": "BNB"
              },
              {
                "s": "BINANCE:SOLUSDT",
                "d": "Solana"
              },
              {
                "s": "BINANCE:XRPUSDT",
                "d": "XRP"
              },
              {
                "s": "BINANCE:ADAUSDT",
                "d": "Cardano"
              },
              {
                "s": "BINANCE:DOGEUSDT",
                "d": "Dogecoin"
              },
              {
                "s": "BINANCE:AVAXUSDT",
                "d": "Avalanche"
              },
              {
                "s": "BINANCE:TRXUSDT",
                "d": "TRON"
              },
              {
                "s": "BINANCE:LINKUSDT",
                "d": "Chainlink"
              },
              {
                "s": "BINANCE:DOTUSDT",
                "d": "Polkadot"
              },
              {
                "s": "BINANCE:MATICUSDT",
                "d": "Polygon"
              },
              {
                "s": "BINANCE:LTCUSDT",
                "d": "Litecoin"
              },
              {
                "s": "BINANCE:ATOMUSDT",
                "d": "Cosmos"
              },
              {
                "s": "BINANCE:UNIUSDT",
                "d": "Uniswap"
              },
              {
                "s": "BINANCE:ICPUSDT",
                "d": "Internet Computer"
              },
              {
                "s": "BINANCE:FILUSDT",
                "d": "Filecoin"
              },
              {
                "s": "BINANCE:LDOUSDT",
                "d": "Lido DAO"
              },
              {
                "s": "BINANCE:IMXUSDT",
                "d": "Immutable"
              },
              {
                "s": "BINANCE:INJUSDT",
                "d": "Injective"
              },
              {
                "s": "BINANCE:APTUSDT",
                "d": "Aptos"
              },
              {
                "s": "BINANCE:NEARUSDT",
                "d": "NEAR Protocol"
              },
              {
                "s": "BINANCE:OPUSDT",
                "d": "Optimism"
              },
              {
                "s": "BINANCE:VETUSDT",
                "d": "VeChain"
              },
              {
                "s": "BINANCE:STXUSDT",
                "d": "Stacks"
              }
            ]
          }
        ],
        "plotLineColorGrowing": "rgba(186, 164, 137, 1)",
        "plotLineColorFalling": "rgba(186, 164, 137, 1)",
        "gridLineColor": "rgba(42, 46, 57, 0)",
        "scaleFontColor": "rgba(120, 123, 134, 1)",
        "belowLineFillColorGrowing": "rgba(186, 164, 137, 0.12)",
        "belowLineFillColorFalling": "rgba(186, 164, 137, 0.12)",
        "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
        "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
        "symbolActiveColor": "rgba(186, 164, 137, 0.12)"
      }`;
    
    const container = document.getElementById('marketDataContainer');
    container.appendChild(script);

    return () => {
      if (container && script) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <div 
        id="marketDataContainer" 
        style={{
          backgroundColor: 'rgba(22, 23, 29, 0.6)',
          backdropFilter: 'blur(20px)',
          borderRadius: '8px',
          padding: '16px',
          marginTop: '20px',
        }}
      >
        <div className="tradingview-widget-container">
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 16,
  },
});

export default MarketData;
